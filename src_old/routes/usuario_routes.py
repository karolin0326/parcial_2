from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.config.database import get_db
from src.schemas.usuario_schema import UsuarioCreate, UsuarioResponse
from src.controllers import usuario_controller

router = APIRouter(
    prefix="/usuarios",
    tags=["Usuarios"]
)

@router.post("/", response_model=UsuarioResponse)
def crear_usuario(usuario: UsuarioCreate, db: Session = Depends(get_db)):
    return usuario_controller.create_usuario(db=db, usuario=usuario)

@router.get("/", response_model=list[UsuarioResponse])
def listar_usuarios(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return usuario_controller.get_usuarios(db=db, skip=skip, limit=limit)

@router.get("/{usuario_id}", response_model=UsuarioResponse)
def obtener_usuario(usuario_id: int, db: Session = Depends(get_db)):
    db_usuario = usuario_controller.get_usuario(db=db, usuario_id=usuario_id)
    if db_usuario is None:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return db_usuario
