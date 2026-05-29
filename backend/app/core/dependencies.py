from typing import Generator, List
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from sqlalchemy.orm import Session

from app.core.config import settings
from app.db.session import SessionLocal
from app.models.usuario import Usuario

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl=f"{settings.API_V1_STR}/auth/login"
)

def get_db() -> Generator[Session, None, None]:
    """Inyección de dependencia para obtener la sesión de la base de datos."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)) -> Usuario:
    """Extrae el usuario autenticado a partir del JWT proporcionado en los headers."""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="No se pudieron validar las credenciales",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        correo: str = payload.get("sub")
        if correo is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
        
    usuario = db.query(Usuario).filter(Usuario.correo == correo).first()
    if usuario is None:
        raise credentials_exception
        
    # Verificar si el usuario está activo (id_estado = 1 es Activo)
    if usuario.id_estado != 1:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Usuario inactivo o suspendido en el sistema"
        )
        
    return usuario

class RoleChecker:
    """Clase para verificar permisos basados en el rol del usuario."""
    def __init__(self, allowed_roles: List[str]):
        self.allowed_roles = allowed_roles

    def __call__(self, current_user: Usuario = Depends(get_current_user)) -> Usuario:
        if current_user.rol not in self.allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Operación no permitida para el rol '{current_user.rol}'. Roles requeridos: {self.allowed_roles}"
            )
        return current_user
