from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta

from app.core.config import settings
from app.core.security import create_access_token
from app.core.dependencies import get_db, get_current_user
from app.services.usuario_service import UsuarioService
from app.services.auditoria_service import AuditoriaService
from app.schemas.usuario import Token, UsuarioResponse
from app.models.usuario import Usuario

router = APIRouter()

@router.post("/login", response_model=Token)
def login_access_token(
    db: Session = Depends(get_db),
    form_data: OAuth2PasswordRequestForm = Depends()
) -> Token:
    """
    Ruta para el inicio de sesión OAuth2. Devuelve un JWT y el rol del usuario.
    """
    usuario = UsuarioService.authenticate_user(
        db=db,
        correo=form_data.username,
        contrasenia=form_data.password
    )
    if not usuario:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Correo o contraseña incorrectos"
        )
    elif usuario.id_estado != 1:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Su cuenta está inactiva o suspendida"
        )

    # Crear token
    expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    token = create_access_token(subject=usuario.correo, expires_delta=expires)
    
    # Registrar auditoría de inicio de sesión exitoso
    AuditoriaService.registrar_accion(
        db=db,
        id_usuario=usuario.id_usuario,
        tipo_accion_nombre="Inicio de Sesión",
        detalles=f"Inicio de sesión exitoso mediante API REST para: {usuario.correo}"
    )

    return Token(
        access_token=token,
        token_type="bearer",
        id_usuario=usuario.id_usuario,
        rol=usuario.rol,
        nombre=usuario.nombre,
        correo=usuario.correo
    )

@router.get("/me", response_model=UsuarioResponse)
def leer_usuario_actual(current_user: Usuario = Depends(get_current_user)) -> UsuarioResponse:
    """Retorna los datos del usuario actualmente autenticado en base al header JWT."""
    return current_user
