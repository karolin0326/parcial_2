from pydantic import BaseModel, ConfigDict

class UsuarioBase(BaseModel):
    nombre: str
    correo: str
    id_estado: int

class UsuarioCreate(UsuarioBase):
    pass

class UsuarioResponse(UsuarioBase):
    id_usuario: int

    model_config = ConfigDict(from_attributes=True)
