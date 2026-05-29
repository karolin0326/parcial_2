from pydantic import BaseModel, ConfigDict
from typing import Optional
from decimal import Decimal
from datetime import datetime

class VersionModeloBase(BaseModel):
    nombre: str
    version: str

class VersionModeloResponse(VersionModeloBase):
    id_modelo: int
    fecha_entrenamiento: datetime
    model_config = ConfigDict(from_attributes=True)

class AnalisisIABase(BaseModel):
    id_modelo: int
    id_factura: int
    es_anomalia: bool
    score_anomalia: Decimal
    precision_modelo: Optional[Decimal] = None

class AnalisisIACreate(AnalisisIABase):
    pass

class AnalisisIAResponse(AnalisisIABase):
    id_analisis: int
    model_config = ConfigDict(from_attributes=True)
