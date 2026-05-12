# 📘 M1 - Entidades - RF - CU - DCA

# Sistema Inteligente de Monitoreo de Facturación con IA

---

# 📌 M1 — Módulo de Gestión de Facturación Inteligente

El módulo M1 corresponde al núcleo principal del sistema, encargado del registro, monitoreo y análisis inteligente de las facturas dentro de la plataforma.

Este módulo permite automatizar procesos contables, detectar anomalías y generar alertas mediante técnicas de Inteligencia Artificial.

---

# 🗂️ Entidades Relacionadas

## 📊 Diagrama de Entidades

```mermaid
erDiagram

USUARIOS {
    INT id_usuario PK
    VARCHAR nombre
    VARCHAR correo
    VARCHAR rol
}

CLIENTES {
    INT id_cliente PK
    VARCHAR nombre_empresa
    VARCHAR nit
}

FACTURAS {
    INT id_factura PK
    VARCHAR numero_factura
    DATE fecha_emision
    DECIMAL total
    VARCHAR estado
    INT id_cliente FK
    INT id_usuario FK
}

DETALLE_FACTURA {
    INT id_detalle PK
    VARCHAR descripcion
    INT cantidad
    DECIMAL precio_unitario
    DECIMAL subtotal
    INT id_factura FK
}

PAGOS {
    INT id_pago PK
    DECIMAL monto
    DATE fecha_pago
    VARCHAR metodo_pago
    INT id_factura FK
}

ALERTAS {
    INT id_alerta PK
    VARCHAR tipo_alerta
    VARCHAR nivel_riesgo
    INT id_factura FK
}

IA_ANALISIS {
    INT id_analisis PK
    VARCHAR tipo_analisis
    DECIMAL porcentaje_riesgo
    INT id_factura FK
}

CLIENTES ||--o{ FACTURAS : posee
USUARIOS ||--o{ FACTURAS : registra
FACTURAS ||--o{ DETALLE_FACTURA : contiene
FACTURAS ||--o{ PAGOS : recibe
FACTURAS ||--o{ ALERTAS : genera
FACTURAS ||--o{ IA_ANALISIS : analiza
```

---

# 📋 RF — Requerimientos Funcionales

| Código | Requerimiento Funcional |
|---|---|
| RF-01 | El sistema debe permitir registrar facturas electrónicas. |
| RF-02 | El sistema debe gestionar clientes asociados a las facturas. |
| RF-03 | El sistema debe registrar pagos relacionados con cada factura. |
| RF-04 | El sistema debe analizar automáticamente las facturas mediante IA. |
| RF-05 | El sistema debe detectar anomalías en tiempo real. |
| RF-06 | El sistema debe generar alertas automáticas ante irregularidades. |
| RF-07 | El sistema debe permitir consultar reportes financieros. |
| RF-08 | El sistema debe validar facturas electrónicas con la DIAN. |
| RF-09 | El sistema debe registrar auditorías de acciones realizadas. |
| RF-10 | El sistema debe permitir gestionar usuarios y roles. |

---

# 👥 CU — Casos de Uso

## 📊 Diagrama de Casos de Uso

```mermaid
flowchart LR

UC["👨‍💼 Usuario"]
ADM["🛠️ Administrador"]
IA["🤖 Motor IA"]
DIAN["🏛️ DIAN"]

subgraph SISTEMA["💻 Sistema Inteligente de Facturación"]

LOGIN([🔐 Iniciar Sesión])
FACTURA([🧾 Registrar Factura])
CLIENTE([👥 Gestionar Clientes])
PAGO([💳 Registrar Pago])
ANALISIS([🤖 Analizar Factura])
ALERTA([🚨 Generar Alertas])
REPORTE([📑 Consultar Reportes])
VALIDAR([🏛️ Validar Factura])

end

UC --> LOGIN
UC --> FACTURA
UC --> CLIENTE
UC --> PAGO
UC --> REPORTE

ADM --> REPORTE
ADM --> ALERTA

IA --> ANALISIS
IA --> ALERTA

DIAN --> VALIDAR

FACTURA --> ANALISIS
ANALISIS --> ALERTA
FACTURA --> VALIDAR

style SISTEMA fill:#F5F5F5,stroke:#1565C0,stroke-width:4px,color:#000000

style UC fill:#C8E6C9,stroke:#2E7D32,color:#000000
style ADM fill:#FFE082,stroke:#F57F17,color:#000000
style IA fill:#E1BEE7,stroke:#8E24AA,color:#000000
style DIAN fill:#B2EBF2,stroke:#00838F,color:#000000

style FACTURA fill:#C5E1A5,stroke:#558B2F,color:#000000
style CLIENTE fill:#C5E1A5,stroke:#558B2F,color:#000000
style PAGO fill:#C5E1A5,stroke:#558B2F,color:#000000
style ANALISIS fill:#E1BEE7,stroke:#8E24AA,color:#000000
style ALERTA fill:#FFCDD2,stroke:#C62828,color:#000000
style REPORTE fill:#BBDEFB,stroke:#1565C0,color:#000000
style VALIDAR fill:#B2EBF2,stroke:#00838F,color:#000000
```

---

# 🌐 DCA — Diagrama de Contexto

## 📊 Contexto General del Sistema

```mermaid
flowchart TB

USUARIO["👨‍💼 Usuario Contable"]
ADMIN["🛠️ Administrador"]
AUDITOR["📊 Auditor"]
DIAN["🏛️ DIAN"]
IA["🤖 Motor IA"]
BANCO["🏦 Entidad Bancaria"]

SISTEMA["💻 Sistema Inteligente de Monitoreo de Facturación"]

USUARIO -->|"Registro de facturas\nPagos y consultas"| SISTEMA

ADMIN -->|"Administración\nConfiguración"| SISTEMA

AUDITOR -->|"Auditorías\nSupervisión"| SISTEMA

BANCO -->|"Validación de pagos"| SISTEMA

SISTEMA -->|"Facturación electrónica"| DIAN

SISTEMA -->|"Datos de análisis"| IA

IA -->|"Alertas y anomalías"| SISTEMA

style SISTEMA fill:#E3F2FD,stroke:#1565C0,stroke-width:5px,color:#000000

style USUARIO fill:#C8E6C9,stroke:#2E7D32,color:#000000
style ADMIN fill:#FFE082,stroke:#F57F17,color:#000000
style AUDITOR fill:#BBDEFB,stroke:#1565C0,color:#000000
style DIAN fill:#B2EBF2,stroke:#00838F,color:#000000
style IA fill:#E1BEE7,stroke:#8E24AA,color:#000000
style BANCO fill:#FFCCBC,stroke:#D84315,color:#000000
```

---

# 🎯 Objetivo del Módulo M1

El módulo M1 tiene como objetivo centralizar y optimizar el proceso de facturación inteligente mediante:

- Registro automatizado de facturas.
- Monitoreo financiero en tiempo real.
- Detección automática de anomalías.
- Generación de alertas inteligentes.
- Integración con procesos de auditoría.
- Validación de facturación electrónica.
- Mejora del control contable y financiero.