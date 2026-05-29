from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime

class TipoAlertaBase(BaseModel):
    nombre: str

class TipoAlertaResponse(TipoAlertaBase):
    id_tipo: int
    model_config = ConfigDict(from_attributes=True)

class EstadoAlertaBase(BaseModel):
    nombre: str

class EstadoAlertaResponse(EstadoAlertaBase):
    id_estado: int
    model_config = ConfigDict(from_attributes=True)

class AlertaBase(BaseModel):
    descripcion: str
    id_tipo: int
    id_estado: int
    id_factura: Optional[int] = None

class AlertaCreate(AlertaBase):
    pass

class AlertaUpdate(BaseModel):
    id_estado: int # Sirve para actualizar el estado (ej. de Pendiente a Resuelta)
    descripcion: Optional[str] = None

class AlertaResponse(AlertaBase):
    id_alerta: int
    fecha_creacion: datetime
    
    # Detalle adicional para la interfaz
    tipo: Optional[TipoAlertaResponse] = None
    estado: Optional[EstadoAlertaResponse] = None
    
    model_config = ConfigDict(from_attributes=True)
