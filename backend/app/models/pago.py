from sqlalchemy import Column, Integer, Date, ForeignKey, Numeric, String
from sqlalchemy.orm import relationship
from app.db.base import Base

class MetodoPago(Base):
    __tablename__ = "metodo_pago"
    
    id_metodo = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(50), nullable=False, unique=True)
    
    pagos = relationship("Pago", back_populates="metodo_pago")

class Pago(Base):
    __tablename__ = "pago"
    
    id_pago = Column(Integer, primary_key=True, index=True)
    valor = Column(Numeric(10, 2), nullable=False)
    fecha = Column(Date, nullable=False)
    id_metodo = Column(Integer, ForeignKey("metodo_pago.id_metodo"), nullable=False)
    id_factura = Column(Integer, ForeignKey("factura.id_factura", ondelete="CASCADE"), nullable=False)
    
    metodo_pago = relationship("MetodoPago", back_populates="pagos")
    factura = relationship("Factura", back_populates="pagos")
