from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import date
from decimal import Decimal

class MetodoPagoBase(BaseModel):
    nombre: str

class MetodoPagoResponse(MetodoPagoBase):
    id_metodo: int
    model_config = ConfigDict(from_attributes=True)

class PagoBase(BaseModel):
    valor: Decimal
    fecha: date
    id_metodo: int
    id_factura: int

class PagoCreate(PagoBase):
    pass

class PagoResponse(PagoBase):
    id_pago: int
    model_config = ConfigDict(from_attributes=True)
