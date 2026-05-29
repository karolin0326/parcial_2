from pydantic import BaseModel, ConfigDict
from typing import Optional

class ClienteBase(BaseModel):
    nombre: str
    nit: str
    telefono: Optional[str] = None

class ClienteCreate(ClienteBase):
    pass

class ClienteUpdate(BaseModel):
    nombre: Optional[str] = None
    nit: Optional[str] = None
    telefono: Optional[str] = None

class ClienteResponse(ClienteBase):
    id_cliente: int
    model_config = ConfigDict(from_attributes=True)
