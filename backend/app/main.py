from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app.core.config import settings
from app.api.v1.router import api_router
from app.db.session import engine, SessionLocal
from app.db.init_db import init_db

# Inicializar y crear tablas en la base de datos e insertar usuarios semilla
db = SessionLocal()
try:
    init_db(db)
finally:
    db.close()

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Configurar middleware de CORS (Cross-Origin Resource Sharing)
# Permite conectar con el servidor frontend Vite en puerto 5173
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # En producción, limitar al puerto específico
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Montar enrutador central
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
def read_root():
    return {
        "mensaje": "¡Bienvenido a la API del Sistema de Monitoreo de Facturación Contable con IA!",
        "version": settings.VERSION,
        "docs_url": "/docs"
    }

@app.get("/health", tags=["Salud"])
def health_check():
    """Endpoint simple de chequeo de conectividad."""
    return {"status": "ok", "db": "connected"}
