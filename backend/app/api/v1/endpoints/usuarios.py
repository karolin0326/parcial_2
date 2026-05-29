from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.core.dependencies import get_db, RoleChecker
from app.schemas.usuario import UsuarioCreate, UsuarioUpdate, UsuarioResponse
from app.services.usuario_service import UsuarioService
from app.models.usuario import Usuario

router = APIRouter()

# Restricción estricta de Administrador
check_admin = RoleChecker(["Administrador"])

@router.post("/", response_model=UsuarioResponse, status_code=status.HTTP_201_CREATED)
def registrar_usuario(
    usuario_in: UsuarioCreate,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(check_admin)
) -> UsuarioResponse:
    """Registra un nuevo usuario en el sistema. Encripta contraseñas por defecto y audita el evento."""
    return UsuarioService.create_usuario(
        db=db,
        usuario_in=usuario_in,
        id_usuario_audit=current_user.id_usuario
    )

@router.get("/", response_model=List[UsuarioResponse])
def listar_usuarios(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(check_admin)
) -> List[UsuarioResponse]:
    """Obtiene una lista paginada de todos los usuarios registrados."""
    return UsuarioService.get_usuarios(db=db, skip=skip, limit=limit)

@router.get("/{usuario_id}", response_model=UsuarioResponse)
def consultar_usuario(
    usuario_id: int,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(check_admin)
) -> UsuarioResponse:
    """Consulta un usuario específico por su ID."""
    db_usuario = UsuarioService.get_usuario(db=db, usuario_id=usuario_id)
    if not db_usuario:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuario no encontrado"
        )
    return db_usuario

@router.put("/{usuario_id}", response_model=UsuarioResponse)
def modificar_usuario(
    usuario_id: int,
    usuario_in: UsuarioUpdate,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(check_admin)
) -> UsuarioResponse:
    """Actualiza campos de un usuario (rol, estado, nombre o correo) e inyecta auditoría."""
    return UsuarioService.update_usuario(
        db=db,
        usuario_id=usuario_id,
        usuario_in=usuario_in,
        id_usuario_audit=current_user.id_usuario
    )

@router.delete("/{usuario_id}", response_model=UsuarioResponse)
def eliminar_usuario(
    usuario_id: int,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(check_admin)
) -> UsuarioResponse:
    """Elimina de manera física a un usuario (Sólo Administradores)."""
    return UsuarioService.delete_usuario(
        db=db,
        usuario_id=usuario_id,
        id_usuario_audit=current_user.id_usuario
    )
