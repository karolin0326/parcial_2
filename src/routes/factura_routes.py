from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.config.database import get_db
from src.schemas.factura_schema import FacturaCreate, FacturaResponse
from src.controllers import factura_controller

router = APIRouter(
    prefix="/facturas",
    tags=["Facturas"]
)

@router.post("/", response_model=FacturaResponse)
def crear_factura(factura: FacturaCreate, db: Session = Depends(get_db)):
    """Crea una factura con sus detalles."""
    return factura_controller.create_factura(db=db, factura=factura)

@router.get("/", response_model=list[FacturaResponse])
def listar_facturas(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Obtiene una lista de todas las facturas."""
    # Para incluir la propiedad dinámica total, iteramos y calculamos (ya que @property se maneja en Pydantic pero el objeto ORM no lo tiene en la BD)
    facturas_orm = factura_controller.get_facturas(db=db, skip=skip, limit=limit)
    # Convertimos los objetos ORM a esquemas Pydantic para calcular el total antes de devolver
    return [FacturaResponse.model_validate(f) for f in facturas_orm]

@router.get("/{factura_id}", response_model=FacturaResponse)
def obtener_factura(factura_id: int, db: Session = Depends(get_db)):
    """Busca una factura por su ID."""
    db_factura = factura_controller.get_factura(db=db, factura_id=factura_id)
    if db_factura is None:
        raise HTTPException(status_code=404, detail="Factura no encontrada")
    return FacturaResponse.model_validate(db_factura)

@router.delete("/{factura_id}", response_model=FacturaResponse)
def eliminar_factura(factura_id: int, db: Session = Depends(get_db)):
    """Elimina una factura del sistema."""
    db_factura = factura_controller.delete_factura(db=db, factura_id=factura_id)
    if db_factura is None:
        raise HTTPException(status_code=404, detail="Factura no encontrada")
    return FacturaResponse.model_validate(db_factura)
