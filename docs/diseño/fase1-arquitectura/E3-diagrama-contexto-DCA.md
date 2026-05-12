# 🌐 Diagrama de Contexto (DCA)

# Sistema Inteligente de Monitoreo de Facturación con IA

## 📋 Vista General del Contexto

```mermaid
flowchart TB

%% =====================================================
%% ENTIDADES EXTERNAS
%% =====================================================

USUARIO["👨‍💼 Usuario Contable"]
ADMIN["🛠️ Administrador"]
AUDITOR["📊 Auditor"]
DIAN["🏛️ DIAN"]
IA["🤖 Motor de IA"]
CLIENTE["👥 Cliente"]
BANCO["🏦 Entidad Bancaria"]

%% =====================================================
%% SISTEMA CENTRAL
%% =====================================================

SISTEMA["💻 Sistema Inteligente de Monitoreo de Facturación"]

%% =====================================================
%% RELACIONES PRINCIPALES
%% =====================================================

USUARIO -->|"Registrar facturas\nConsultar información\nRegistrar pagos"| SISTEMA

ADMIN -->|"Gestionar usuarios\nConfigurar sistema\nAdministrar parámetros"| SISTEMA

AUDITOR -->|"Consultar auditorías\nRevisar alertas\nGenerar reportes"| SISTEMA

CLIENTE -->|"Datos del cliente\nInformación de facturación"| SISTEMA

BANCO -->|"Confirmación de pagos\nEstados financieros"| SISTEMA

SISTEMA -->|"Facturas electrónicas\nValidación tributaria"| DIAN

SISTEMA -->|"Datos de facturación\nHistorial contable"| IA

IA -->|"Anomalías detectadas\nAlertas inteligentes"| SISTEMA

%% =====================================================
%% ESTILOS
%% =====================================================

style SISTEMA fill:#E3F2FD,stroke:#1565C0,stroke-width:5px,color:#000000

style USUARIO fill:#C8E6C9,stroke:#2E7D32,stroke-width:2px,color:#000000
style ADMIN fill:#FFE082,stroke:#F57F17,stroke-width:2px,color:#000000
style AUDITOR fill:#BBDEFB,stroke:#1565C0,stroke-width:2px,color:#000000
style DIAN fill:#B2EBF2,stroke:#00838F,stroke-width:2px,color:#000000
style IA fill:#E1BEE7,stroke:#8E24AA,stroke-width:2px,color:#000000
style CLIENTE fill:#DCEDC8,stroke:#558B2F,stroke-width:2px,color:#000000
style BANCO fill:#FFCCBC,stroke:#D84315,stroke-width:2px,color:#000000
```

---

# 📌 Descripción del Diagrama de Contexto

El Diagrama de Contexto (DCA) representa la interacción del **Sistema Inteligente de Monitoreo de Facturación con IA** con las entidades externas que participan directa o indirectamente en el funcionamiento del sistema.

Este diagrama permite identificar:

- Los actores externos que interactúan con el sistema.
- El flujo principal de información.
- Las entradas y salidas del sistema.
- Las conexiones con servicios externos como la DIAN y entidades bancarias.
- La integración del motor de Inteligencia Artificial.

---

# 👥 Entidades Externas

| Entidad | Función |
|---|---|
| Usuario Contable | Registra facturas, pagos y consultas |
| Administrador | Configura y administra el sistema |
| Auditor | Supervisa reportes y auditorías |
| Cliente | Proporciona información de facturación |
| Entidad Bancaria | Confirma pagos y movimientos financieros |
| DIAN | Valida facturación electrónica |
| Motor IA | Analiza datos y detecta anomalías |

---

# 🔄 Flujo Principal de Información

## Entradas al Sistema

- Datos de clientes.
- Facturas registradas.
- Información de pagos.
- Parámetros administrativos.
- Historial financiero.

## Salidas del Sistema

- Alertas automáticas.
- Reportes financieros.
- Auditorías.
- Facturas electrónicas validadas.
- Detección de anomalías.

---

# 🎯 Objetivo del DCA

El objetivo del Diagrama de Contexto es mostrar de manera general cómo interactúa el sistema con su entorno, identificando las entidades externas y el intercambio de información necesario para el correcto funcionamiento del software.