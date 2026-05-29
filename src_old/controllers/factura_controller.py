from sqlalchemy.orm import Session
from src.models.modelos import Factura, DetalleFactura
from src.schemas.factura_schema import FacturaCreate

def get_facturas(db: Session, skip: int = 0, limit: int = 100):
    """Obtiene una lista de facturas con paginación."""
    return db.query(Factura).offset(skip).limit(limit).all()

def get_factura(db: Session, factura_id: int):
    """Busca una factura específica por su ID."""
    return db.query(Factura).filter(Factura.id_factura == factura_id).first()

def create_factura(db: Session, factura: FacturaCreate):
    """Crea una nueva factura junto con sus detalles."""
    # Crear cabecera
    db_factura = Factura(
        numero_factura=factura.numero_factura,
        fecha=factura.fecha,
        estado=factura.estado,
        id_cliente=factura.id_cliente,
        id_usuario=factura.id_usuario
    )
    db.add(db_factura)
    db.commit()
    db.refresh(db_factura)

    # Crear detalles
    for detalle in factura.detalles:
        db_detalle = DetalleFactura(
            cantidad=detalle.cantidad,
            precio_unitario=detalle.precio_unitario,
            id_factura=db_factura.id_factura
        )
        db.add(db_detalle)
    
    db.commit()
    db.refresh(db_factura)
    return db_factura

def delete_factura(db: Session, factura_id: int):
    """Elimina una factura y sus detalles."""
    db_factura = get_factura(db, factura_id)
    if db_factura:
        db.query(DetalleFactura).filter(DetalleFactura.id_factura == factura_id).delete()
        db.delete(db_factura)
        db.commit()
    return db_factura
