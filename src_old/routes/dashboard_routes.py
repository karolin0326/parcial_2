from fastapi import APIRouter, Depends, Request
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session
from src.config.database import get_db
from src.controllers import dashboard_controller

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard y Métricas"]
)

templates = Jinja2Templates(directory="src/templates")

@router.get("/")
def obtener_metricas_resumen(request: Request, db: Session = Depends(get_db)):
    """Obtiene el resumen de métricas para el dashboard de Monitoreo de Facturación con IA y devuelve una vista HTML."""
    metricas = dashboard_controller.get_dashboard_metrics(db=db)
    return templates.TemplateResponse("dashboard.html", {"request": request, "metricas": metricas})
