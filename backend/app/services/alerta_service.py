from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from datetime import datetime

from app.models.alerta import Alerta, TipoAlerta, EstadoAlerta
from app.schemas.alerta import AlertaUpdate
from app.services.auditoria_service import AuditoriaService

class AlertaService:
    
    @staticmethod
    def get_alertas(db: Session, skip: int = 0, limit: int = 100):
        """Obtiene la lista de todas las alertas del sistema."""
        return db.query(Alerta).order_by(Alerta.fecha_creacion.desc()).offset(skip).limit(limit).all()

    @staticmethod
    def get_alerta(db: Session, alerta_id: int):
        """Busca una alerta específica por su ID."""
        return db.query(Alerta).filter(Alerta.id_alerta == alerta_id).first()

    @staticmethod
    def generar_alerta_ia(db: Session, factura_id: int, numero_factura: str, score: float) -> Alerta:
        """
        RF05: Genera una alerta automática en el sistema a partir del motor de IA.
        """
        descripcion = f"Anomalía detectada por IA en la Factura {numero_factura}. Puntuación de sospecha: {score:.4f}"
        
        db_alerta = Alerta(
            descripcion=descripcion,
            id_tipo=4,      # Tipo: Anomalía Detectada por IA
            id_estado=1,    # Estado: Pendiente
            id_factura=factura_id
        )
        db.add(db_alerta)
        db.commit()
        db.refresh(db_alerta)
        
        return db_alerta

    @staticmethod
    def actualizar_estado_alerta(db: Session, alerta_id: int, alerta_in: AlertaUpdate, id_usuario_audit: int) -> Alerta:
        """Permite a un Auditor o Administrador resolver/cambiar el estado de una alerta."""
        db_alerta = db.query(Alerta).filter(Alerta.id_alerta == alerta_id).first()
        if not db_alerta:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Alerta no encontrada"
            )
            
        estado_nuevo = db.query(EstadoAlerta).filter(EstadoAlerta.id_estado == alerta_in.id_estado).first()
        if not estado_nuevo:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="El estado especificado no es válido."
            )
            
        db_alerta.id_estado = alerta_in.id_estado
        if alerta_in.descripcion:
            db_alerta.descripcion = alerta_in.descripcion
            
        db.commit()
        db.refresh(db_alerta)
        
        # Registrar en auditoría
        AuditoriaService.registrar_accion(
            db=db,
            id_usuario=id_usuario_audit,
            tipo_accion_nombre="Resolución de Alerta",
            detalles=f"Alerta ID {alerta_id} actualizada al estado: {estado_nuevo.nombre}"
        )
        
        return db_alerta
