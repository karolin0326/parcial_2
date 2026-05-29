# 👥 Diagrama de Casos de Uso

# Sistema Inteligente de Monitoreo de Facturación con IA

## 📋 Vista General del Sistema

```mermaid
flowchart LR

%% ===================================================
%% ACTORES
%% ===================================================

UC["👨‍💼 Usuario Contable"]
ADM["🛠️ Administrador"]
AUD["📊 Auditor"]
IA["🤖 Motor IA"]
DIAN["🏛️ DIAN"]

%% ===================================================
%% SISTEMA
%% ===================================================

subgraph SISTEMA["💻 Sistema Inteligente de Monitoreo de Facturación"]

LOGIN([🔐 Iniciar Sesión])

FACT([🧾 Registrar Factura])
CLIENTE([👥 Gestionar Clientes])
PAGO([💳 Registrar Pago])

MONITOREO([📡 Monitorear Facturación])
ANALISIS([🤖 Analizar Facturas con IA])
ANOMALIA([⚠️ Detectar Anomalías])
ALERTA([🚨 Generar Alertas])

REPORTE([📑 Consultar Reportes])
AUDITORIA([📝 Registrar Auditoría])

USUARIOS([⚙️ Gestionar Usuarios])
CONFIG([🧠 Configurar Parámetros IA])

VALIDAR([🏛️ Validar Factura Electrónica])

end

%% ===================================================
%% RELACIONES ACTORES
%% ===================================================

UC --> LOGIN
UC --> FACT
UC --> CLIENTE
UC --> PAGO
UC --> MONITOREO
UC --> REPORTE

ADM --> USUARIOS
ADM --> CONFIG
ADM --> AUDITORIA
ADM --> REPORTE

AUD --> REPORTE
AUD --> ALERTA
AUD --> AUDITORIA

IA --> ANALISIS
IA --> ANOMALIA
IA --> ALERTA

DIAN --> VALIDAR

%% ===================================================
%% FLUJO INTERNO
%% ===================================================

FACT --> VALIDAR
FACT --> ANALISIS
ANALISIS --> ANOMALIA
ANOMALIA --> ALERTA
PAGO --> MONITOREO
MONITOREO --> REPORTE
ALERTA --> AUDITORIA

%% ===================================================
%% ESTILOS GENERALES
%% ===================================================

style SISTEMA fill:#F5F5F5,stroke:#1565C0,stroke-width:4px,color:#000000

%% ===================================================
%% ACTORES
%% ===================================================

style UC fill:#C8E6C9,stroke:#2E7D32,stroke-width:2px,color:#000000
style ADM fill:#FFE082,stroke:#F57F17,stroke-width:2px,color:#000000
style AUD fill:#BBDEFB,stroke:#1565C0,stroke-width:2px,color:#000000
style IA fill:#E1BEE7,stroke:#6A1B9A,stroke-width:2px,color:#000000
style DIAN fill:#B2EBF2,stroke:#00838F,stroke-width:2px,color:#000000

%% ===================================================
%% PROCESOS OPERATIVOS
%% ===================================================

style LOGIN fill:#D1C4E9,stroke:#512DA8,stroke-width:2px,color:#000000
style FACT fill:#C5E1A5,stroke:#558B2F,stroke-width:2px,color:#000000
style CLIENTE fill:#C5E1A5,stroke:#558B2F,stroke-width:2px,color:#000000
style PAGO fill:#C5E1A5,stroke:#558B2F,stroke-width:2px,color:#000000
style MONITOREO fill:#FFF59D,stroke:#F9A825,stroke-width:2px,color:#000000

%% ===================================================
%% IA
%% ===================================================

style ANALISIS fill:#E1BEE7,stroke:#8E24AA,stroke-width:2px,color:#000000
style ANOMALIA fill:#F8BBD0,stroke:#C2185B,stroke-width:2px,color:#000000
style ALERTA fill:#FFCDD2,stroke:#D32F2F,stroke-width:2px,color:#000000

%% ===================================================
%% REPORTES Y AUDITORÍA
%% ===================================================

style REPORTE fill:#BBDEFB,stroke:#1976D2,stroke-width:2px,color:#000000
style AUDITORIA fill:#FFE0B2,stroke:#EF6C00,stroke-width:2px,color:#000000

%% ===================================================
%% ADMINISTRACIÓN
%% ===================================================

style USUARIOS fill:#CFD8DC,stroke:#455A64,stroke-width:2px,color:#000000
style CONFIG fill:#CFD8DC,stroke:#455A64,stroke-width:2px,color:#000000

%% ===================================================
%% DIAN
%% ===================================================

style VALIDAR fill:#B2EBF2,stroke:#00838F,stroke-width:2px,color:#000000
```

---

# 📌 Descripción del Diagrama

El diagrama representa gráficamente el funcionamiento general del **Sistema Inteligente de Monitoreo de Facturación con Inteligencia Artificial**, mostrando la interacción entre los usuarios, los módulos administrativos y el motor inteligente encargado del análisis de anomalías en facturación.

---

# 👨‍💼 Actores del Sistema

| Actor | Función |
|---|---|
| Usuario Contable | Gestiona facturas, clientes y pagos |
| Administrador | Configura y administra el sistema |
| Auditor | Supervisa reportes y alertas |
| Motor IA | Analiza datos y detecta anomalías |
| DIAN | Valida las facturas electrónicas |

---

# ⚙️ Funcionalidades Principales

- Registro de facturas.
- Gestión de clientes.
- Registro de pagos.
- Monitoreo de facturación.
- Detección de anomalías mediante IA.
- Generación de alertas automáticas.
- Gestión de auditorías.
- Administración del sistema.
- Validación de facturación electrónica.

---

# 🎯 Objetivo del Diagrama

Visualizar de manera clara:

- La interacción entre actores y sistema.
- Los procesos automáticos realizados por IA.
- El flujo principal del monitoreo contable.
- Los módulos administrativos y de auditoría.
- El funcionamiento general del software.