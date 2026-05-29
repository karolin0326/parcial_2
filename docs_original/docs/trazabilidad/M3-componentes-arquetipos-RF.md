# 📘 M3 - Componentes - Arquetipos - RF

# Sistema Inteligente de Monitoreo de Facturación con IA

---

# 📌 M3 — Componentes del Sistema

El módulo M3 representa la estructura de componentes principales del sistema, mostrando la relación entre los módulos funcionales, sus arquetipos asociados, los requerimientos funcionales y las interfaces que interactúan dentro de la plataforma.

Este modelo permite visualizar la organización lógica del software y cómo cada componente participa en el proceso inteligente de monitoreo de facturación.

---

# 🧩 Tabla de Componentes y Arquetipos

| Componente/Módulo | Arquetipo Principal | RF Asociados | Interfaz |
|---|---|---|---|
| 🧾 Módulo Facturación | Factura, DetalleFactura | RF01, RF07 | UI Facturación / UI Detalle |
| 💳 Módulo Pagos | Pago, MetodoPago | RF06 | UI Pagos |
| 👥 Módulo Clientes | Cliente | RF10 | UI Clientes |
| 👤 Módulo Usuarios | Usuario, EstadoUsuario | RF02 | UI Usuarios |
| 🤖 Módulo IA | AnalisisIA, VersionModelo | RF03 | API Motor IA |
| 🚨 Módulo Alertas | Alerta, TipoAlerta, EstadoAlerta | RF05 | UI Alertas / Notificaciones |
| 📝 Módulo Auditoría | Auditoria, TipoAccion | RF11 | UI Auditoría |
| 📑 Módulo Reportes | ReporteGenerado | RF04 | UI Reportes / PDF |

---

# 🏛️ Diagrama de Componentes

```mermaid
graph TB

%% ===================================================
%% FRONTEND
%% ===================================================

subgraph FRONT["🖥️ Capa de Presentación"]

UIF["🧾 UI Facturación"]
UIP["💳 UI Pagos"]
UIC["👥 UI Clientes"]
UIU["👤 UI Usuarios"]
UIA["🚨 UI Alertas"]
UIR["📑 UI Reportes"]
UIAUD["📝 UI Auditoría"]

end

%% ===================================================
%% BACKEND
%% ===================================================

subgraph BACK["⚙️ Capa de Negocio"]

FACT["🧾 Módulo Facturación"]
PAGOS["💳 Módulo Pagos"]
CLIENTES["👥 Módulo Clientes"]
USUARIOS["👤 Módulo Usuarios"]
IA["🤖 Módulo IA"]
ALERTAS["🚨 Módulo Alertas"]
AUDITORIA["📝 Módulo Auditoría"]
REPORTES["📑 Módulo Reportes"]

end

%% ===================================================
%% BASE DE DATOS
%% ===================================================

subgraph DATA["🗄️ Persistencia"]

DB[(💾 Base de Datos)]

end

%% ===================================================
%% SERVICIOS EXTERNOS
%% ===================================================

subgraph EXTERNOS["🌐 Servicios Externos"]

DIAN["🏛️ DIAN"]
APIIA["🤖 API IA"]

end

%% ===================================================
%% RELACIONES FRONTEND
%% ===================================================

UIF --> FACT
UIP --> PAGOS
UIC --> CLIENTES
UIU --> USUARIOS
UIA --> ALERTAS
UIR --> REPORTES
UIAUD --> AUDITORIA

%% ===================================================
%% RELACIONES BACKEND
%% ===================================================

FACT --> DB
PAGOS --> DB
CLIENTES --> DB
USUARIOS --> DB
ALERTAS --> DB
AUDITORIA --> DB
REPORTES --> DB

FACT --> IA
IA --> APIIA

FACT --> DIAN

IA --> ALERTAS
ALERTAS --> REPORTES

%% ===================================================
%% ESTILOS
%% ===================================================

style FRONT fill:#E3F2FD,stroke:#1565C0,stroke-width:3px,color:#000000
style BACK fill:#E8F5E9,stroke:#2E7D32,stroke-width:3px,color:#000000
style DATA fill:#FFF3E0,stroke:#EF6C00,stroke-width:3px,color:#000000
style EXTERNOS fill:#ECEFF1,stroke:#455A64,stroke-width:3px,color:#000000

style FACT fill:#C5E1A5,stroke:#558B2F,color:#000000
style PAGOS fill:#B2EBF2,stroke:#00838F,color:#000000
style CLIENTES fill:#DCEDC8,stroke:#558B2F,color:#000000
style USUARIOS fill:#BBDEFB,stroke:#1565C0,color:#000000
style IA fill:#E1BEE7,stroke:#8E24AA,color:#000000
style ALERTAS fill:#FFCDD2,stroke:#C62828,color:#000000
style AUDITORIA fill:#FFE0B2,stroke:#EF6C00,color:#000000
style REPORTES fill:#FFF59D,stroke:#F9A825,color:#000000

style DB fill:#CFD8DC,stroke:#455A64,color:#000000

style DIAN fill:#B3E5FC,stroke:#0288D1,color:#000000
style APIIA fill:#D1C4E9,stroke:#6A1B9A,color:#000000
```

---

# 📋 RF — Requerimientos Funcionales Asociados

| Código | Descripción |
|---|---|
| RF01 | Registrar facturas electrónicas |
| RF02 | Gestionar usuarios y permisos |
| RF03 | Analizar facturación mediante IA |
| RF04 | Generar reportes financieros |
| RF05 | Detectar anomalías y generar alertas |
| RF06 | Registrar y validar pagos |
| RF07 | Gestionar detalles de facturación |
| RF10 | Administrar clientes |
| RF11 | Registrar auditorías del sistema |

---

# 🧠 Arquetipos Principales

| Arquetipo | Descripción |
|---|---|
| Factura | Representa la información principal de facturación |
| DetalleFactura | Contiene productos o servicios facturados |
| Pago | Registra pagos asociados |
| MetodoPago | Define los tipos de pago |
| Cliente | Gestiona información de clientes |
| Usuario | Controla acceso y autenticación |
| EstadoUsuario | Define el estado del usuario |
| AnalisisIA | Procesa análisis inteligentes |
| VersionModelo | Controla versiones del modelo IA |
| Alerta | Registra anomalías detectadas |
| TipoAlerta | Clasifica alertas |
| EstadoAlerta | Estado de atención de alertas |
| Auditoria | Registra acciones del sistema |
| TipoAccion | Clasifica eventos auditados |
| ReporteGenerado | Genera reportes administrativos |

---

# 🎯 Objetivo del Módulo M3

El módulo M3 permite visualizar la estructura de componentes del sistema y la interacción entre:

- Interfaces gráficas.
- Módulos funcionales.
- Servicios inteligentes.
- Persistencia de datos.
- Integraciones externas.

Facilitando así:

- Escalabilidad.
- Modularidad.
- Mantenimiento del sistema.
- Integración con IA.
- Organización arquitectónica.