from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import Base

class EstadoUsuario(Base):
    __tablename__ = "estado_usuario"
    
    id_estado = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(50), nullable=False, unique=True)
    
    usuarios = relationship("Usuario", back_populates="estado")

class Usuario(Base):
    __tablename__ = "usuario"
    
    id_usuario = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    correo = Column(String(150), nullable=False, unique=True)
    contrasenia_hash = Column(String(255), nullable=False)
    rol = Column(String(50), nullable=False, default="Contador") # Administrador, Contador, Auditor
    id_estado = Column(Integer, ForeignKey("estado_usuario.id_estado"), nullable=False)
    
    estado = relationship("EstadoUsuario", back_populates="usuarios")
    auditorias = relationship("Auditoria", back_populates="usuario")
    facturas = relationship("Factura", back_populates="usuario")
