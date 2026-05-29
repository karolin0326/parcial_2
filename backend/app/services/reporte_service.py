from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import date, datetime
from typing import Dict, Any

from app.models.factura import Factura, DetalleFactura
from app.models.analisis_ia import AnalisisIA
from app.services.auditoria_service import AuditoriaService

class ReporteService:
    
    @staticmethod
    def generar_reporte_diario(db: Session, dia: date, id_usuario_audit: int) -> Dict[str, Any]:
        """
        RF04: Genera reportes resumidos de facturación y anomalías para un día específico.
        """
        # Contar facturas del día
        total_facturas = db.query(Factura).filter(Factura.fecha == dia).count()
        
        # Calcular total facturado en el día
        total_facturado = db.query(
            func.sum(DetalleFactura.cantidad * DetalleFactura.precio_unitario)
        ).join(
            Factura, Factura.id_factura == DetalleFactura.id_factura
        ).filter(
            Factura.fecha == dia
        ).scalar() or 0.0

        # Contar anomalías detectadas en el día
        anomalias_detectadas = db.query(AnalisisIA).join(
            Factura, Factura.id_factura == AnalisisIA.id_factura
        ).filter(
            Factura.fecha == dia,
            AnalisisIA.es_anomalia == True
        ).count()
        
        # Consultar lista detallada de facturas del día
        facturas_dia = db.query(Factura).filter(Factura.fecha == dia).all()
        lista_facturas = []
        for f in facturas_dia:
            analisis = db.query(AnalisisIA).filter(AnalisisIA.id_factura == f.id_factura).first()
            es_anomalia = analisis.es_anomalia if analisis else False
            score = float(analisis.score_anomalia) if analisis else 0.0
            
            total_f = sum((d.cantidad * d.precio_unitario for d in f.detalles), 0.0)
            
            lista_facturas.append({
                "id_factura": f.id_factura,
                "numero_factura": f.numero_factura,
                "cliente": f.cliente.nombre,
                "estado": f.estado,
                "total": float(total_f),
                "es_anomalia": es_anomalia,
                "score_anomalia": score
            })

        reporte = {
            "fecha": dia.strftime("%Y-%m-%d"),
            "total_facturas_emitidas": total_facturas,
            "valor_total_facturado": float(total_facturado),
            "anomalias_detectadas_ia": anomalias_detectadas,
            "facturas": lista_facturas,
            "tasa_anomalia_diaria": float(anomalias_detectadas / total_facturas * 100) if total_facturas > 0 else 0.0
        }

        # Registrar la acción en auditoría
        AuditoriaService.registrar_accion(
            db=db,
            id_usuario=id_usuario_audit,
            tipo_accion_nombre="Generación de Reporte",
            detalles=f"Reporte diario compilado para el día: {dia}. Total facturas: {total_facturas}"
        )

        return reporte
