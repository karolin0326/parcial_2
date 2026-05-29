from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.core.dependencies import get_db, RoleChecker
from app.schemas.cliente import ClienteCreate, ClienteUpdate, ClienteResponse
from app.services.cliente_service import ClienteService
from app.models.usuario import Usuario

router = APIRouter()

# Control de acceso
check_escritura = RoleChecker(["Administrador", "Contador"])
check_lectura = RoleChecker(["Administrador", "Contador", "Auditor"])

@router.post("/", response_model=ClienteResponse, status_code=status.HTTP_201_CREATED)
def registrar_cliente(
    cliente_in: ClienteCreate,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(check_escritura)
) -> ClienteResponse:
    """Registra un nuevo cliente en el sistema."""
    return ClienteService.create_cliente(
        db=db,
        cliente_in=cliente_in,
        id_usuario_audit=current_user.id_usuario
    )

@router.get("/", response_model=List[ClienteResponse])
def listar_clientes(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(check_lectura)
) -> List[ClienteResponse]:
    """Obtiene la lista de clientes registrados."""
    return ClienteService.get_clientes(db=db, skip=skip, limit=limit)

@router.get("/{cliente_id}", response_model=ClienteResponse)
def consultar_cliente(
    cliente_id: int,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(check_lectura)
) -> ClienteResponse:
    """Busca un cliente por su ID."""
    db_cliente = ClienteService.get_cliente(db=db, cliente_id=cliente_id)
    if not db_cliente:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Cliente no encontrado"
        )
    return db_cliente

@router.put("/{cliente_id}", response_model=ClienteResponse)
def modificar_cliente(
    cliente_id: int,
    cliente_in: ClienteUpdate,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(check_escritura)
) -> ClienteResponse:
    """Modifica la información de un cliente existente."""
    return ClienteService.update_cliente(
        db=db,
        cliente_id=cliente_id,
        cliente_in=cliente_in,
        id_usuario_audit=current_user.id_usuario
    )

@router.delete("/{cliente_id}", response_model=ClienteResponse)
def eliminar_cliente(
    cliente_id: int,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(check_escritura)
) -> ClienteResponse:
    """Elimina físicamente a un cliente de la base de datos."""
    return ClienteService.delete_cliente(
        db=db,
        cliente_id=cliente_id,
        id_usuario_audit=current_user.id_usuario
    )
