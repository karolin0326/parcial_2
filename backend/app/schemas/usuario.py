from pydantic import BaseModel, ConfigDict, EmailStr
from typing import Optional

class EstadoUsuarioBase(BaseModel):
    nombre: str

class EstadoUsuarioResponse(EstadoUsuarioBase):
    id_estado: int
    model_config = ConfigDict(from_attributes=True)

class UsuarioBase(BaseModel):
    nombre: str
    correo: EmailStr
    rol: str = "Contador" # Administrador, Contador, Auditor
    id_estado: int = 1

class UsuarioCreate(UsuarioBase):
    contrasenia: str

class UsuarioUpdate(BaseModel):
    nombre: Optional[str] = None
    correo: Optional[EmailStr] = None
    rol: Optional[str] = None
    id_estado: Optional[int] = None
    contrasenia: Optional[str] = None

class UsuarioResponse(UsuarioBase):
    id_usuario: int
    model_config = ConfigDict(from_attributes=True)

# Esquemas de Token para JWT
class Token(BaseModel):
    access_token: str
    token_type: str
    rol: str
    nombre: str
    correo: str

class TokenPayload(BaseModel):
    sub: Optional[str] = None
