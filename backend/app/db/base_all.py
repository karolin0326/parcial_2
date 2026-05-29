# Importar TODOS los modelos aquí para que SQLAlchemy los registre antes de crear tablas o resolver relaciones.
# Este archivo debe importarse antes de cualquier llamada a Base.metadata.create_all()

from app.db.base import Base  # noqa: F401

# Importar todos los modelos del sistema
from app.models.usuario import EstadoUsuario, Usuario  # noqa: F401
from app.models.cliente import Cliente  # noqa: F401
from app.models.factura import Factura, DetalleFactura  # noqa: F401
from app.models.pago import MetodoPago, Pago  # noqa: F401
from app.models.alerta import TipoAlerta, EstadoAlerta, Alerta  # noqa: F401
from app.models.analisis_ia import VersionModelo, AnalisisIA  # noqa: F401
from app.models.auditoria import TipoAccion, Auditoria  # noqa: F401
