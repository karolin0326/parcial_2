# Modelo Relacional
## Sistema de Monitoreo Inteligente de Facturación con IA

---

# ¿Qué es un Modelo Relacional?

El modelo relacional es la representación lógica de la base de datos basada en tablas, atributos, claves primarias (PK) y claves foráneas (FK).

Este modelo se deriva del Modelo Entidad Relación (MER) y permite estructurar la información de manera organizada para su implementación en sistemas gestores de bases de datos como MySQL o MariaDB.

En el proyecto del Sistema de Monitoreo Inteligente de Facturación con IA, el modelo relacional permite almacenar la información relacionada con:
- usuarios,
- clientes,
- facturas,
- pagos,
- alertas,
- auditoría,
- y análisis inteligentes realizados por IA.

---

# Modelo Relacional del Sistema

```text
ESTADO_USUARIO(
    id_estado PK,
    nombre
)

USUARIO(
    id_usuario PK,
    nombre,
    correo,
    id_estado FK
)

CLIENTE(
    id_cliente PK,
    nombre,
    nit,
    telefono
)

FACTURA(
    id_factura PK,
    numero_factura,
    fecha,
    estado,
    id_cliente FK,
    id_usuario FK
)

DETALLE_FACTURA(
    id_detalle PK,
    cantidad,
    precio_unitario,
    id_factura FK
)

METODO_PAGO(
    id_metodo PK,
    nombre
)

PAGO(
    id_pago PK,
    valor,
    fecha,
    id_metodo FK,
    id_factura FK
)

VERSION_MODELO(
    id_modelo PK,
    nombre,
    version
)

ANALISIS_IA(
    id_analisis PK,
    precision_modelo,
    id_modelo FK
)

TIPO_ALERTA(
    id_tipo PK,
    nombre
)

ESTADO_ALERTA(
    id_estado PK,
    nombre
)

ALERTA(
    id_alerta PK,
    descripcion,
    id_tipo FK,
    id_estado FK
)

TIPO_ACCION(
    id_tipo_accion PK,
    nombre
)

AUDITORIA(
    id_auditoria PK,
    fecha,
    id_tipo_accion FK,
    id_usuario FK
)