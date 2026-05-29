from fastapi import APIRouter

from app.api.v1.endpoints import (
    auth,
    facturas,
    clientes,
    alertas,
    reportes,
    usuarios,
    auditoria,
    dashboard
)

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Autenticación"])
api_router.include_router(facturas.router, prefix="/facturas", tags=["Facturación"])
api_router.include_router(clientes.router, prefix="/clientes", tags=["Clientes"])
api_router.include_router(alertas.router, prefix="/alertas", tags=["Alertas"])
api_router.include_router(reportes.router, prefix="/reportes", tags=["Reportes"])
api_router.include_router(usuarios.router, prefix="/usuarios", tags=["Usuarios"])
api_router.include_router(auditoria.router, prefix="/auditoria", tags=["Auditoría"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["Dashboard"])
