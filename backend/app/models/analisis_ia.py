from sqlalchemy import Column, Integer, String, ForeignKey, Numeric, Boolean, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.base import Base

class VersionModelo(Base):
    __tablename__ = "version_modelo"
    
    id_modelo = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    version = Column(String(20), nullable=False, unique=True)
    fecha_entrenamiento = Column(DateTime, nullable=False, default=datetime.utcnow)
    
    analisis = relationship("AnalisisIA", back_populates="modelo", cascade="all, delete-orphan")

class AnalisisIA(Base):
    __tablename__ = "analisis_ia"
    
    id_analisis = Column(Integer, primary_key=True, index=True)
    id_modelo = Column(Integer, ForeignKey("version_modelo.id_modelo"), nullable=False)
    id_factura = Column(Integer, ForeignKey("factura.id_factura", ondelete="CASCADE"), nullable=False)
    es_anomalia = Column(Boolean, nullable=False, default=False)
    score_anomalia = Column(Numeric(5, 4), nullable=False, default=0.0000)
    precision_modelo = Column(Numeric(5, 2), nullable=True)
    
    modelo = relationship("VersionModelo", back_populates="analisis")
    factura = relationship("Factura", back_populates="analisis_ia")
