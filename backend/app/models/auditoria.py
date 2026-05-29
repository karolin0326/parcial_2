from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.base import Base

class TipoAccion(Base):
    __tablename__ = "tipo_accion"
    
    id_tipo_accion = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False, unique=True)
    
    auditorias = relationship("Auditoria", back_populates="tipo_accion")

class Auditoria(Base):
    __tablename__ = "auditoria"
    
    id_auditoria = Column(Integer, primary_key=True, index=True)
    id_tipo_accion = Column(Integer, ForeignKey("tipo_accion.id_tipo_accion"), nullable=False)
    fecha = Column(DateTime, nullable=False, default=datetime.utcnow)
    id_usuario = Column(Integer, ForeignKey("usuario.id_usuario"), nullable=False)
    detalles = Column(Text, nullable=True)
    
    tipo_accion = relationship("TipoAccion", back_populates="auditorias")
    usuario = relationship("Usuario", back_populates="auditorias")
