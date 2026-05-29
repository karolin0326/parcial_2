from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional

class TipoAccionBase(BaseModel):
    nombre: str

class TipoAccionResponse(TipoAccionBase):
    id_tipo_accion: int
    model_config = ConfigDict(from_attributes=True)

class AuditoriaBase(BaseModel):
    id_tipo_accion: int
    id_usuario: int
    detalles: Optional[str] = None

class AuditoriaCreate(AuditoriaBase):
    pass

class AuditoriaResponse(AuditoriaBase):
    id_auditoria: int
    fecha: datetime
    
    # Propiedades dinámicas para la visualización del log de auditoría
    tipo_accion: Optional[TipoAccionResponse] = None
    usuario_nombre: Optional[str] = None
    
    model_config = ConfigDict(from_attributes=True)
