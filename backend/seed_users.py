import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import settings
from app.core.security import get_password_hash
from app.db.base import Base
# Import all models to ensure they are registered
import app.db.base_all  # noqa: F401
from app.models.usuario import Usuario, EstadoUsuario
from app.models.factura import Factura
from app.models.cliente import Cliente
from app.models.alerta import Alerta

def seed():
    engine = create_engine(settings.DATABASE_URL, pool_pre_ping=True)
    Base.metadata.create_all(bind=engine)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    db = SessionLocal()

    # Crear estados de usuario si no existen
    if db.query(EstadoUsuario).count() == 0:
        estados = [
            EstadoUsuario(id_estado=1, nombre="Activo"),
            EstadoUsuario(id_estado=2, nombre="Inactivo"),
            EstadoUsuario(id_estado=3, nombre="Suspendido"),
        ]
        db.add_all(estados)
        db.commit()
        print("Estados de usuario creados.")

    # Check if users already exist
    if db.query(Usuario).count() == 0:
        usuarios = [
            Usuario(nombre="Admin Test", correo="admin@test.com", contrasenia_hash=get_password_hash("admin123"), rol="Administrador", id_estado=1),
            Usuario(nombre="Contador Test", correo="contador@test.com", contrasenia_hash=get_password_hash("contador123"), rol="Contador", id_estado=1),
            Usuario(nombre="Auditor Test", correo="auditor@test.com", contrasenia_hash=get_password_hash("auditor123"), rol="Auditor", id_estado=1),
        ]
        db.add_all(usuarios)
        db.commit()
        print("Test users created successfully.")
    else:
        print("Users already exist.")
    db.close()

if __name__ == "__main__":
    seed()
