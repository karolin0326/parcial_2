from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from typing import Optional

from app.models.usuario import Usuario, EstadoUsuario
from app.schemas.usuario import UsuarioCreate, UsuarioUpdate
from app.core.security import verify_password, get_password_hash
from app.services.auditoria_service import AuditoriaService

class UsuarioService:
    
    # CU-01 | RF-02 | E12 - get_usuarios()
    @staticmethod
    def get_usuarios(db: Session, skip: int = 0, limit: int = 100):
        return db.query(Usuario).offset(skip).limit(limit).all()

    # CU-01 | RF-02 | E12 - get_usuario()
    @staticmethod
    def get_usuario(db: Session, usuario_id: int):
        return db.query(Usuario).filter(Usuario.id_usuario == usuario_id).first()

    # CU-01 | RF-02 | E12 - authenticate_user()
    @staticmethod
    def authenticate_user(db: Session, correo: str, contrasenia: str) -> Optional[Usuario]:
        """
        RF02: Autentica un usuario y verifica si tiene credenciales correctas.
        """
        usuario = db.query(Usuario).filter(Usuario.correo == correo).first()
        if not usuario:
            return None
        
        # Verificar contraseñas
        if not verify_password(contrasenia, usuario.contrasenia_hash):
            return None
            
        return usuario

    # CU-01 | RF-02 | E12 - create_usuario()
    @staticmethod
    def create_usuario(db: Session, usuario_in: UsuarioCreate, id_usuario_audit: Optional[int] = None) -> Usuario:
        """Crea un usuario nuevo con contraseña encriptada por hash."""
        # Verificar duplicidad de correo
        user_exist = db.query(Usuario).filter(Usuario.correo == usuario_in.correo).first()
        if user_exist:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"El correo electrónico '{usuario_in.correo}' ya está en uso."
            )
            
        hashed_pass = get_password_hash(usuario_in.contrasenia)
        
        db_usuario = Usuario(
            nombre=usuario_in.nombre,
            correo=usuario_in.correo,
            contrasenia_hash=hashed_pass,
            rol=usuario_in.rol,
            id_estado=usuario_in.id_estado
        )
        db.add(db_usuario)
        db.commit()
        db.refresh(db_usuario)
        
        # Auditoría si hay un administrador iniciándolo
        if id_usuario_audit:
            AuditoriaService.registrar_accion(
                db=db,
                id_usuario=id_usuario_audit,
                tipo_accion_nombre="Creación de Usuario",
                detalles=f"Nuevo usuario creado: {db_usuario.correo} ({db_usuario.rol})"
            )
            
        return db_usuario

    # CU-01 | RF-02 | E12 - update_usuario()
    @staticmethod
    def update_usuario(db: Session, usuario_id: int, usuario_in: UsuarioUpdate, id_usuario_audit: int) -> Usuario:
        """Modifica un usuario del sistema (solo permitido a Administradores)."""
        db_usuario = db.query(Usuario).filter(Usuario.id_usuario == usuario_id).first()
        if not db_usuario:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Usuario no encontrado"
            )
            
        data = usuario_in.model_dump(exclude_unset=True)
        if "contrasenia" in data and data["contrasenia"]:
            db_usuario.contrasenia_hash = get_password_hash(data.pop("contrasenia"))
            
        for key, val in data.items():
            setattr(db_usuario, key, val)
            
        db.commit()
        db.refresh(db_usuario)
        
        # Registrar en auditoría
        AuditoriaService.registrar_accion(
            db=db,
            id_usuario=id_usuario_audit,
            tipo_accion_nombre="Actualización de Usuario",
            detalles=f"Usuario modificado: {db_usuario.correo}"
        )
        
        return db_usuario

    # CU-01 | RF-02 | E12 - delete_usuario()
    @staticmethod
    def delete_usuario(db: Session, usuario_id: int, id_usuario_audit: int) -> Usuario:
        db_usuario = db.query(Usuario).filter(Usuario.id_usuario == usuario_id).first()
        if not db_usuario:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Usuario no encontrado"
            )
            
        correo = db_usuario.correo
        db.delete(db_usuario)
        db.commit()
        
        # Registrar en auditoría
        AuditoriaService.registrar_accion(
            db=db,
            id_usuario=id_usuario_audit,
            tipo_accion_nombre="Actualización de Usuario",
            detalles=f"Usuario eliminado físicamente: {correo}"
        )
        
        return db_usuario
