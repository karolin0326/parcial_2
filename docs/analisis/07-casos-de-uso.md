# 👥 Diagrama de Casos de Uso

## Sistema Inteligente de Monitoreo de Facturación con IA

### Vista General del Sistema

```mermaid
graph TB

%% =========================
%% ACTORES
%% =========================

UC[👨‍💼 Usuario Contable]
ADM[🛠️ Administrador]
AUD[📊 Auditor]
IA[🤖 Motor IA]
DIAN[🏛️ DIAN]

%% =========================
%% SISTEMA
%% =========================

subgraph SISTEMA["💻 Sistema Inteligente de Monitoreo de Facturación"]

LOGIN([🔐 Iniciar Sesión])

FACT([🧾 Registrar Factura])
CLI([👥 Gestionar Clientes])
PAGO([💳 Registrar Pago])

MON([📡 Monitorear Facturación])
ANALISIS([🤖 Analizar Facturas con IA])
ALERTA([🚨 Generar Alertas])

REP([📑 Consultar Reportes])
AUDIT([📝 Registrar Auditoría])

USER([⚙️ Gestionar Usuarios])
CONFIG([🧠 Configurar IA])

VALIDAR([🏛️ Validar Factura Electrónica])

end

%% =========================
%% RELACIONES ACTORES
%% =========================

UC --> LOGIN
UC --> FACT
UC --> CLI
UC --> PAGO
UC --> MON
UC --> REP

ADM --> USER
ADM --> CONFIG
ADM --> AUDIT
ADM --> REP

AUD --> REP
AUD --> AUDIT
AUD --> ALERTA

IA --> ANALISIS
IA --> ALERTA

DIAN --> VALIDAR

%% =========================
%% FLUJO INTERNO
%% =========================

FACT --> ANALISIS
ANALISIS --> ALERTA
PAGO --> MON
MON --> REP
FACT --> VALIDAR

%% =========================
%% ESTILOS
%% =========================

style SISTEMA fill:#E3F2FD,stroke:#1565C0,stroke-width:3px
style UC fill:#C8E6C9
style ADM fill:#FFE082
style AUD fill:#FFCCBC
style IA fill:#D1C4E9
style DIAN fill:#B3E5FC

style FACT fill:#BBDEFB
style CLI fill:#BBDEFB
style PAGO fill:#BBDEFB
style MON fill:#C8E6C9
style ANALISIS fill:#D1C4E9
style ALERTA fill:#FFCDD2
style REP fill:#FFF9C4
style AUDIT fill:#FFE0B2
style USER fill:#CFD8DC
style CONFIG fill:#CFD8DC
style VALIDAR fill:#B3E5FC
style LOGIN fill:#E1BEE7
```

---

# 📌 Descripción del Diagrama

El siguiente diagrama representa gráficamente las interacciones entre los actores principales y las funcionalidades del **Sistema Inteligente de Monitoreo de Facturación con Inteligencia Artificial**.

## 👨‍💼 Actores Principales

| Actor | Descripción |
|---|---|
| Usuario Contable | Gestiona facturas, clientes y pagos |
| Administrador | Configura y administra el sistema |
| Auditor | Supervisa alertas, auditorías y reportes |
| Motor IA | Analiza automáticamente las facturas |
| DIAN | Valida las facturas electrónicas |

---

# ⚙️ Funcionalidades Principales

- Registro y monitoreo de facturas.
- Gestión de clientes y pagos.
- Análisis automático mediante IA.
- Detección de anomalías.
- Generación de alertas automáticas.
- Auditoría y reportes.
- Gestión de usuarios.
- Validación de facturación electrónica.

---

# 🎯 Objetivo del Diagrama

Este diagrama permite visualizar:

- La interacción entre usuarios y sistema.
- Los procesos automatizados con IA.
- El flujo principal de monitoreo contable.
- La organización funcional del software.
- Las responsabilidades de cada actor dentro del sistema.