from sqlalchemy.orm import Session
import app.db.base_all  # noqa: F401 — Registra todos los modelos antes de create_all
from app.db.base import Base
from app.db.session import engine
from app.models.usuario import EstadoUsuario, Usuario
from app.core.security import get_password_hash

def init_db(db: Session) -> None:
    """Crea las tablas de la base de datos e inyecta los datos semilla iniciales si no existen."""
    # Crea tablas en la base de datos si no existen
    # (Para Docker esto ya se ejecuta mediante docker-entrypoint-initdb.d)
    Base.metadata.create_all(bind=engine)

    # Verificar si ya existen estados
    if db.query(EstadoUsuario).count() == 0:
        activo = EstadoUsuario(id_estado=1, nombre="Activo")
        inactivo = EstadoUsuario(id_estado=2, nombre="Inactivo")
        suspendido = EstadoUsuario(id_estado=3, nombre="Suspendido")
        db.add_all([activo, inactivo, suspendido])
        db.commit()

    # Verificar si existe el usuario Administrador por defecto
    admin = db.query(Usuario).filter(Usuario.correo == "admin@empresa.com").first()
    if not admin:
        new_admin = Usuario(
            nombre="Administrador del Sistema",
            correo="admin@empresa.com",
            contrasenia_hash=get_password_hash("admin123"),
            rol="Administrador",
            id_estado=1
        )
        db.add(new_admin)
        db.commit()

    # Contador por defecto
    contador = db.query(Usuario).filter(Usuario.correo == "contador@empresa.com").first()
    if not contador:
        new_contador = Usuario(
            nombre="Carlos Contador",
            correo="contador@empresa.com",
            contrasenia_hash=get_password_hash("admin123"),
            rol="Contador",
            id_estado=1
        )
        db.add(new_contador)
        db.commit()

    # Auditor por defecto
    auditor = db.query(Usuario).filter(Usuario.correo == "auditor@empresa.com").first()
    if not auditor:
        new_auditor = Usuario(
            nombre="Ana Auditora",
            correo="auditor@empresa.com",
            contrasenia_hash=get_password_hash("admin123"),
            rol="Auditor",
            id_estado=1
        )
        db.add(new_auditor)
        db.commit()
