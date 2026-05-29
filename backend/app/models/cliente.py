from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.db.base import Base

class Cliente(Base):
    __tablename__ = "cliente"
    
    id_cliente = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    nit = Column(String(20), nullable=False, unique=True)
    telefono = Column(String(20), nullable=True)
    
    facturas = relationship("Factura", back_populates="cliente", cascade="all, delete-orphan")
