from pydantic import BaseModel, ConfigDict, Field
from typing import List, Optional
from datetime import date
from decimal import Decimal

class DetalleFacturaBase(BaseModel):
    cantidad: Decimal
    precio_unitario: Decimal

class DetalleFacturaCreate(DetalleFacturaBase):
    pass

class DetalleFacturaResponse(DetalleFacturaBase):
    id_detalle: int
    id_factura: int

    model_config = ConfigDict(from_attributes=True)

class FacturaBase(BaseModel):
    numero_factura: str
    fecha: date
    estado: str
    id_cliente: int
    id_usuario: int

class FacturaCreate(FacturaBase):
    detalles: List[DetalleFacturaCreate]

class FacturaResponse(FacturaBase):
    id_factura: int
    detalles: List[DetalleFacturaResponse] = []

    model_config = ConfigDict(from_attributes=True)

    @property
    def total(self) -> Decimal:
        """Calcula el total de la factura sumando cantidad * precio_unitario de cada detalle."""
        return sum((detalle.cantidad * detalle.precio_unitario for detalle in self.detalles), Decimal('0.0'))
