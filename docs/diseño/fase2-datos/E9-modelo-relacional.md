# 🗄️ Modelo Relacional  
# Sistema Inteligente de Monitoreo de Facturación con IA

---

# 📌 Esquema Relacional

```text
USUARIOS (
    id_usuario PK,
    nombre,
    apellido,
    correo UNIQUE,
    password,
    rol,
    estado,
    fecha_registro
)

CLIENTES (
    id_cliente PK,
    nombre_empresa,
    nit UNIQUE,
    direccion,
    telefono,
    correo,
    estado
)

FACTURAS (
    id_factura PK,
    numero_factura UNIQUE,
    fecha_emision,
    total,
    estado,
    id_cliente FK,
    id_usuario FK
)

DETALLE_FACTURA (
    id_detalle PK,
    descripcion,
    cantidad,
    precio_unitario,
    subtotal,
    id_factura FK
)

PAGOS (
    id_pago PK,
    fecha_pago,
    monto,
    metodo_pago,
    estado,
    id_factura FK
)

ALERTAS (
    id_alerta PK,
    tipo_alerta,
    descripcion,
    nivel_riesgo,
    fecha_generacion,
    estado,
    id_factura FK
)

IA_ANALISIS (
    id_analisis PK,
    tipo_analisis,
    porcentaje_riesgo,
    observaciones,
    fecha_analisis,
    id_factura FK
)

AUDITORIA (
    id_auditoria PK,
    accion,
    descripcion,
    fecha_evento,
    id_usuario FK
)
```

---

# 🔗 Relaciones del Modelo

```mermaid
flowchart LR

CLIENTES -->|1:N| FACTURAS
USUARIOS -->|1:N| FACTURAS
FACTURAS -->|1:N| DETALLE_FACTURA
FACTURAS -->|1:N| PAGOS
FACTURAS -->|1:N| ALERTAS
FACTURAS -->|1:N| IA_ANALISIS
USUARIOS -->|1:N| AUDITORIA

style CLIENTES fill:#C8E6C9,stroke:#2E7D32,color:#000000
style USUARIOS fill:#BBDEFB,stroke:#1565C0,color:#000000
style FACTURAS fill:#FFE082,stroke:#F9A825,color:#000000
style DETALLE_FACTURA fill:#D1C4E9,stroke:#7B1FA2,color:#000000
style PAGOS fill:#B2EBF2,stroke:#00838F,color:#000000
style ALERTAS fill:#FFCDD2,stroke:#C62828,color:#000000
style IA_ANALISIS fill:#E1BEE7,stroke:#8E24AA,color:#000000
style AUDITORIA fill:#FFE0B2,stroke:#EF6C00,color:#000000
```

---

# 📊 Cardinalidades

| Tabla Principal | Relación | Tabla Relacionada |
|---|---|---|
| CLIENTES | 1:N | FACTURAS |
| USUARIOS | 1:N | FACTURAS |
| FACTURAS | 1:N | DETALLE_FACTURA |
| FACTURAS | 1:N | PAGOS |
| FACTURAS | 1:N | ALERTAS |
| FACTURAS | 1:N | IA_ANALISIS |
| USUARIOS | 1:N | AUDITORIA |

---

# 🎯 Objetivo del Modelo Relacional

El modelo relacional permite estructurar la información del sistema de manera organizada y normalizada, garantizando:

- Integridad referencial.
- Seguridad de los datos.
- Escalabilidad del sistema.
- Control eficiente de facturación.
- Monitoreo inteligente mediante IA.
- Generación de reportes y auditorías.
- Detección automática de anomalías.