from sqlalchemy.orm import Session
from sqlalchemy import func
from src.models.modelos import Factura, Cliente, Alerta, DetalleFactura

def get_dashboard_metrics(db: Session):
    """Calcula métricas resumen para el dashboard de facturación y detección de anomalías."""
    total_facturas = db.query(Factura).count()
    total_clientes = db.query(Cliente).count()
    total_alertas_anomalias = db.query(Alerta).count()

    # Cálculo del valor total facturado usando SQLAlchemy sum
    # SUM(detalle.cantidad * detalle.precio_unitario)
    total_facturado = db.query(
        func.sum(DetalleFactura.cantidad * DetalleFactura.precio_unitario)
    ).scalar() or 0.0

    return {
        "total_facturas_emitidas": total_facturas,
        "total_clientes_activos": total_clientes,
        "total_alertas_generadas_ia": total_alertas_anomalias,
        "valor_total_facturado": float(total_facturado)
    }
