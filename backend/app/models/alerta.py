from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.base import Base

class TipoAlerta(Base):
    __tablename__ = "tipo_alerta"
    
    id_tipo = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False, unique=True)
    
    alertas = relationship("Alerta", back_populates="tipo_alerta")

class EstadoAlerta(Base):
    __tablename__ = "estado_alerta"
    
    id_estado = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(50), nullable=False, unique=True)
    
    alertas = relationship("Alerta", back_populates="estado_alerta")

class Alerta(Base):
    __tablename__ = "alerta"
    
    id_alerta = Column(Integer, primary_key=True, index=True)
    descripcion = Column(String(255), nullable=False)
    id_tipo = Column(Integer, ForeignKey("tipo_alerta.id_tipo"), nullable=False)
    id_estado = Column(Integer, ForeignKey("estado_alerta.id_estado"), nullable=False)
    id_factura = Column(Integer, ForeignKey("factura.id_factura", ondelete="SET NULL"), nullable=True)
    fecha_creacion = Column(DateTime, nullable=False, default=datetime.utcnow)
    
    tipo_alerta = relationship("TipoAlerta", back_populates="alertas")
    estado_alerta = relationship("EstadoAlerta", back_populates="alertas")
    factura = relationship("Factura", back_populates="alertas")
