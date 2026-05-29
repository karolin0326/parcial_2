from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.core.dependencies import get_db, RoleChecker
from app.schemas.alerta import AlertaResponse, AlertaUpdate
from app.services.alerta_service import AlertaService
from app.models.usuario import Usuario

router = APIRouter()

# Control de acceso: Sólo Auditores y Administradores gestionan alertas
check_auditor_admin = RoleChecker(["Administrador", "Auditor"])

@router.get("/", response_model=List[AlertaResponse])
def listar_alertas(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(check_auditor_admin)
) -> List[AlertaResponse]:
    """Obtiene una lista paginada de todas las alertas e irregularidades detectadas por IA."""
    return AlertaService.get_alertas(db=db, skip=skip, limit=limit)

@router.get("/{alerta_id}", response_model=AlertaResponse)
def consultar_alerta(
    alerta_id: int,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(check_auditor_admin)
) -> AlertaResponse:
    """Busca una alerta específica por su ID."""
    db_alerta = AlertaService.get_alerta(db=db, alerta_id=alerta_id)
    if not db_alerta:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Alerta no encontrada"
        )
    return db_alerta

@router.put("/{alerta_id}", response_model=AlertaResponse)
def actualizar_estado_alerta(
    alerta_id: int,
    alerta_in: AlertaUpdate,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(check_auditor_admin)
) -> AlertaResponse:
    """
    Permite cambiar el estado de una alerta (ej: de Pendiente a 'Resuelta - Fraude' o 'Falso Positivo').
    Registra automáticamente el cambio y la auditoría.
    """
    return AlertaService.actualizar_estado_alerta(
        db=db,
        alerta_id=alerta_id,
        alerta_in=alerta_in,
        id_usuario_audit=current_user.id_usuario
    )
