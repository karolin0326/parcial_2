from sqlalchemy import Column, Integer, String, Date, DateTime, Numeric, ForeignKey
from sqlalchemy.orm import relationship
from src.config.database import Base

class EstadoUsuario(Base):
    __tablename__ = "estado_usuario"
    id_estado = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(50))
    
    usuarios = relationship("Usuario", back_populates="estado")

class Usuario(Base):
    __tablename__ = "usuario"
    id_usuario = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100))
    correo = Column(String(150))
    id_estado = Column(Integer, ForeignKey("estado_usuario.id_estado"))
    
    estado = relationship("EstadoUsuario", back_populates="usuarios")
    auditorias = relationship("Auditoria", back_populates="usuario")
    facturas = relationship("Factura", back_populates="usuario")

class Cliente(Base):
    __tablename__ = "cliente"
    id_cliente = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100))
    nit = Column(String(20))
    telefono = Column(String(20))
    
    facturas = relationship("Factura", back_populates="cliente")

class TipoAccion(Base):
    __tablename__ = "tipo_accion"
    id_tipo_accion = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100))
    
    auditorias = relationship("Auditoria", back_populates="tipo_accion")

class Auditoria(Base):
    __tablename__ = "auditoria"
    id_auditoria = Column(Integer, primary_key=True, index=True)
    fecha = Column(DateTime)
    id_usuario = Column(Integer, ForeignKey("usuario.id_usuario"))
    id_tipo_accion = Column(Integer, ForeignKey("tipo_accion.id_tipo_accion"))
    
    usuario = relationship("Usuario", back_populates="auditorias")
    tipo_accion = relationship("TipoAccion", back_populates="auditorias")

class Factura(Base):
    __tablename__ = "factura"
    id_factura = Column(Integer, primary_key=True, index=True)
    numero_factura = Column(String(50))
    fecha = Column(Date)
    estado = Column(String(30))
    id_cliente = Column(Integer, ForeignKey("cliente.id_cliente"))
    id_usuario = Column(Integer, ForeignKey("usuario.id_usuario"))
    
    cliente = relationship("Cliente", back_populates="facturas")
    usuario = relationship("Usuario", back_populates="facturas")
    detalles = relationship("DetalleFactura", back_populates="factura")
    pagos = relationship("Pago", back_populates="factura")

class DetalleFactura(Base):
    __tablename__ = "detalle_factura"
    id_detalle = Column(Integer, primary_key=True, index=True)
    cantidad = Column(Numeric(10, 2))
    precio_unitario = Column(Numeric(10, 2))
    id_factura = Column(Integer, ForeignKey("factura.id_factura"))
    
    factura = relationship("Factura", back_populates="detalles")

class MetodoPago(Base):
    __tablename__ = "metodo_pago"
    id_metodo = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(50))
    
    pagos = relationship("Pago", back_populates="metodo_pago")

class Pago(Base):
    __tablename__ = "pago"
    id_pago = Column(Integer, primary_key=True, index=True)
    valor = Column(Numeric(10, 2))
    fecha = Column(Date)
    id_metodo = Column(Integer, ForeignKey("metodo_pago.id_metodo"))
    id_factura = Column(Integer, ForeignKey("factura.id_factura"))
    
    metodo_pago = relationship("MetodoPago", back_populates="pagos")
    factura = relationship("Factura", back_populates="pagos")

class TipoAlerta(Base):
    __tablename__ = "tipo_alerta"
    id_tipo = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100))
    
    alertas = relationship("Alerta", back_populates="tipo_alerta")

class EstadoAlerta(Base):
    __tablename__ = "estado_alerta"
    id_estado = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(50))
    
    alertas = relationship("Alerta", back_populates="estado_alerta")

class Alerta(Base):
    __tablename__ = "alerta"
    id_alerta = Column(Integer, primary_key=True, index=True)
    descripcion = Column(String(255))
    id_tipo = Column(Integer, ForeignKey("tipo_alerta.id_tipo"))
    id_estado = Column(Integer, ForeignKey("estado_alerta.id_estado"))
    
    tipo_alerta = relationship("TipoAlerta", back_populates="alertas")
    estado_alerta = relationship("EstadoAlerta", back_populates="alertas")

class VersionModelo(Base):
    __tablename__ = "version_modelo"
    id_modelo = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100))
    version = Column(String(20))
    
    analisis = relationship("AnalisisIA", back_populates="modelo")

class AnalisisIA(Base):
    __tablename__ = "analisis_ia"
    id_analisis = Column(Integer, primary_key=True, index=True)
    precision_modelo = Column(Numeric(5, 2))
    id_modelo = Column(Integer, ForeignKey("version_modelo.id_modelo"))
    
    modelo = relationship("VersionModelo", back_populates="analisis")
