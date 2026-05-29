from fastapi import FastAPI
from src.routes import usuario_routes, factura_routes, dashboard_routes
from src.config.database import engine, Base

# (Opcional) Crea las tablas en la BD si no existen
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Sistema de Facturación API", version="1.0.0")

# Registrar las rutas (controllers)
app.include_router(dashboard_routes.router)
app.include_router(usuario_routes.router)
app.include_router(factura_routes.router)

@app.get("/")
def read_root():
    return {"mensaje": "¡Bienvenido a la API del Sistema de Facturación!"}

@app.get("/health")
def health_check():
    return {"status": "ok"}
