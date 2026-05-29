from sqlalchemy import Column, Integer, String, Date, ForeignKey, Numeric
from sqlalchemy.orm import relationship
from app.db.base import Base

class Factura(Base):
    __tablename__ = "factura"
    
    id_factura = Column(Integer, primary_key=True, index=True)
    numero_factura = Column(String(50), nullable=False, unique=True)
    fecha = Column(Date, nullable=False)
    estado = Column(String(30), nullable=False) # Emitida, Pagada, Anulada
    id_cliente = Column(Integer, ForeignKey("cliente.id_cliente"), nullable=False)
    id_usuario = Column(Integer, ForeignKey("usuario.id_usuario"), nullable=False)
    
    cliente = relationship("Cliente", back_populates="facturas")
    usuario = relationship("Usuario", back_populates="facturas")
    detalles = relationship("DetalleFactura", back_populates="factura", cascade="all, delete-orphan")
    pagos = relationship("Pago", back_populates="factura", cascade="all, delete-orphan")
    analisis_ia = relationship("AnalisisIA", back_populates="factura", cascade="all, delete-orphan")
    alertas = relationship("Alerta", back_populates="factura")

class DetalleFactura(Base):
    __tablename__ = "detalle_factura"
    
    id_detalle = Column(Integer, primary_key=True, index=True)
    cantidad = Column(Numeric(10, 2), nullable=False)
    precio_unitario = Column(Numeric(10, 2), nullable=False)
    id_factura = Column(Integer, ForeignKey("factura.id_factura", ondelete="CASCADE"), nullable=False)
    
    factura = relationship("Factura", back_populates="detalles")
