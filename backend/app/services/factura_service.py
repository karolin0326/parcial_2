from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from datetime import datetime

from app.models.factura import Factura, DetalleFactura
from app.models.analisis_ia import AnalisisIA, VersionModelo
from app.schemas.factura import FacturaCreate, FacturaUpdate
from app.ia.anomaly_detector import AnomalyDetector
from app.services.alerta_service import AlertaService
from app.services.auditoria_service import AuditoriaService

class FacturaService:
    
    @staticmethod
    def get_facturas(db: Session, skip: int = 0, limit: int = 100):
        """Obtiene la lista de todas las facturas."""
        return db.query(Factura).offset(skip).limit(limit).all()

    @staticmethod
    def get_factura(db: Session, factura_id: int):
        """Busca una factura específica por su ID."""
        return db.query(Factura).filter(Factura.id_factura == factura_id).first()

    @staticmethod
    def create_factura(db: Session, factura_in: FacturaCreate, id_usuario_audit: int) -> Factura:
        """
        Crea una factura con sus detalles, aplicando validaciones de negocio e IA.
        RF01: No duplicidad de facturas.
        RF03: Análisis automático de IA.
        """
        # RF01: Validar no duplicar número de factura
        factura_existente = db.query(Factura).filter(
            Factura.numero_factura == factura_in.numero_factura
        ).first()
        if factura_existente:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"La factura con número '{factura_in.numero_factura}' ya está registrada en el sistema."
            )

        # Crear cabecera de la factura
        db_factura = Factura(
            numero_factura=factura_in.numero_factura,
            fecha=factura_in.fecha,
            estado=factura_in.estado,
            id_cliente=factura_in.id_cliente,
            id_usuario=factura_in.id_usuario
        )
        db.add(db_factura)
        db.commit()
        db.refresh(db_factura)

        # Crear los detalles asociados
        total_cantidad = 0.0
        precio_promedio = 0.0
        for det in factura_in.detalles:
            db_detalle = DetalleFactura(
                cantidad=det.cantidad,
                precio_unitario=det.precio_unitario,
                id_factura=db_factura.id_factura
            )
            db.add(db_detalle)
            total_cantidad += float(det.cantidad)
            precio_promedio = max(precio_promedio, float(det.precio_unitario))
            
        db.commit()
        db.refresh(db_factura)

        # RF03: Ejecutar motor de análisis de IA de forma automática al registrarse
        try:
            detector = AnomalyDetector()
            # El valor del pago por defecto se emula como el total para el análisis inicial
            total_factura = float(db_factura.detalles[0].cantidad * db_factura.detalles[0].precio_unitario) if db_factura.detalles else 0.0
            
            es_anomalia, score = detector.predict(
                cantidad=total_cantidad,
                precio_unitario=precio_promedio,
                valor_pago=total_factura
            )
            
            # Obtener el modelo IA activo
            modelo_activo = db.query(VersionModelo).order_by(VersionModelo.id_modelo.desc()).first()
            id_modelo = modelo_activo.id_modelo if modelo_activo else 1
            
            # Guardar resultado del análisis
            analisis = AnalisisIA(
                id_modelo=id_modelo,
                id_factura=db_factura.id_factura,
                es_anomalia=es_anomalia,
                score_anomalia=score,
                precision_modelo=95.00
            )
            db.add(analisis)
            db.commit()
            
            # RF05: Generación automática de alertas con notificación
            if es_anomalia:
                AlertaService.generar_alerta_ia(
                    db=db,
                    factura_id=db_factura.id_factura,
                    numero_factura=db_factura.numero_factura,
                    score=score
                )
        except Exception as e:
            # Tolerancia a fallos: La factura debe crearse incluso si la predicción de IA falla
            db.rollback()

        # Registrar la acción en el módulo de auditoría
        AuditoriaService.registrar_accion(
            db=db,
            id_usuario=id_usuario_audit,
            tipo_accion_nombre="Registro de Factura",
            detalles=f"Factura registrada: {db_factura.numero_factura}. Total detalles: {len(factura_in.detalles)}"
        )

        return db_factura

    @staticmethod
    def anular_factura(db: Session, factura_id: int, id_usuario_audit: int) -> Factura:
        """Anula una factura del sistema."""
        db_factura = db.query(Factura).filter(Factura.id_factura == factura_id).first()
        if not db_factura:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Factura no encontrada"
            )
        
        db_factura.estado = "Anulada"
        db.commit()
        db.refresh(db_factura)
        
        # Registrar en auditoría
        AuditoriaService.registrar_accion(
            db=db,
            id_usuario=id_usuario_audit,
            tipo_accion_nombre="Anulación de Factura",
            detalles=f"Factura anulada: {db_factura.numero_factura}"
        )
        
        return db_factura

    @staticmethod
    def delete_factura(db: Session, factura_id: int, id_usuario_audit: int) -> Factura:
        """Elimina una factura y sus detalles."""
        db_factura = db.query(Factura).filter(Factura.id_factura == factura_id).first()
        if not db_factura:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Factura no encontrada"
            )
        
        numero = db_factura.numero_factura
        db.delete(db_factura)
        db.commit()
        
        # Registrar en auditoría
        AuditoriaService.registrar_accion(
            db=db,
            id_usuario=id_usuario_audit,
            tipo_accion_nombre="Anulación de Factura",
            detalles=f"Factura eliminada físicamente: {numero}"
        )
        
        return db_factura
