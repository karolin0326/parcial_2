from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.core.dependencies import get_db, RoleChecker, get_current_user
from app.schemas.factura import FacturaCreate, FacturaResponse
from app.services.factura_service import FacturaService
from app.models.usuario import Usuario

router = APIRouter()

# Restricciones de Rol
check_contador_admin = RoleChecker(["Administrador", "Contador"])
check_lectura_roles = RoleChecker(["Administrador", "Contador", "Auditor"])

@router.post("/", response_model=FacturaResponse, status_code=status.HTTP_201_CREATED)
def registrar_factura(
    factura_in: FacturaCreate,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(check_contador_admin)
) -> FacturaResponse:
    """
    Registra una nueva factura. 
    RF01: Evita duplicados.
    RF03: Ejecuta predicción del Isolation Forest para anomalías y crea alertas si corresponde.
    """
    db_factura = FacturaService.create_factura(
        db=db,
        factura_in=factura_in,
        id_usuario_audit=current_user.id_usuario
    )
    return db_factura

@router.get("/", response_model=List[FacturaResponse])
def listar_facturas(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(check_lectura_roles)
) -> List[FacturaResponse]:
    """Obtiene una lista paginada de todas las facturas en el sistema."""
    facturas = FacturaService.get_facturas(db=db, skip=skip, limit=limit)
    return facturas

@router.get("/{factura_id}", response_model=FacturaResponse)
def consultar_factura(
    factura_id: int,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(check_lectura_roles)
) -> FacturaResponse:
    """Busca y retorna los detalles de una factura por su ID."""
    db_factura = FacturaService.get_factura(db=db, factura_id=factura_id)
    if not db_factura:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Factura no encontrada"
        )
    return db_factura

@router.put("/{factura_id}/anular", response_model=FacturaResponse)
def anular_factura(
    factura_id: int,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(check_contador_admin)
) -> FacturaResponse:
    """Cambia el estado de una factura a 'Anulada' y registra el evento en auditoría."""
    return FacturaService.anular_factura(
        db=db,
        factura_id=factura_id,
        id_usuario_audit=current_user.id_usuario
    )

@router.delete("/{factura_id}", response_model=FacturaResponse)
def eliminar_factura(
    factura_id: int,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(RoleChecker(["Administrador"]))
) -> FacturaResponse:
    """Elimina físicamente una factura y todos sus detalles (Sólo permitido a Administradores)."""
    return FacturaService.delete_factura(
        db=db,
        factura_id=factura_id,
        id_usuario_audit=current_user.id_usuario
    )
