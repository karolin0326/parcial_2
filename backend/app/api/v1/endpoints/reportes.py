from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from datetime import date

from app.core.dependencies import get_db, RoleChecker
from app.services.reporte_service import ReporteService
from app.models.usuario import Usuario

router = APIRouter()

# Control de acceso: Permitido para todos los roles authenticated
check_lectura = RoleChecker(["Administrador", "Contador", "Auditor"])

@router.get("/diario")
def consultar_reporte_diario(
    dia: date = Query(default=date.today, description="Fecha para la que se compila el reporte"),
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(check_lectura)
):
    """
    RF04: Obtiene el reporte compilado de facturación, totales y anomalías IA del día especificado.
    """
    return ReporteService.generar_reporte_diario(
        db=db,
        dia=dia,
        id_usuario_audit=current_user.id_usuario
    )
