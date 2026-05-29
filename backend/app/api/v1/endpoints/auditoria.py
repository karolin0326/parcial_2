from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from typing import List, Dict, Any

from app.core.dependencies import get_db, RoleChecker
from app.services.auditoria_service import AuditoriaService
from app.models.usuario import Usuario

router = APIRouter()

# Control de acceso: Permitido para Administradores y Auditores
check_auditor_admin = RoleChecker(["Administrador", "Auditor"])

@router.get("/")
def consultar_bitacora_auditoria(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(check_auditor_admin)
) -> List[Dict[str, Any]]:
    """
    Obtiene la bitácora completa de acciones del sistema con resolución de usuario y tipo de acción.
    """
    return AuditoriaService.get_auditorias(db=db, skip=skip, limit=limit)
