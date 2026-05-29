# 📘 M4 - Nodos - Protocolos - RNF

# Sistema Inteligente de Monitoreo de Facturación con IA

---

# 📌 M4 — Infraestructura de Despliegue y Comunicación

El módulo M4 representa la arquitectura física y lógica del sistema, identificando los nodos principales, protocolos de comunicación y requerimientos no funcionales (RNF) necesarios para garantizar el correcto funcionamiento del sistema de monitoreo inteligente de facturación.

Este módulo define cómo interactúan los componentes tecnológicos dentro de la infraestructura del sistema.

---

# 🌐 Nodos del Sistema

| Nodo | Descripción | Tecnología |
|---|---|---|
| 🖥️ Cliente Web | Interfaz utilizada por usuarios y administradores | React / HTML5 |
| 🌐 Servidor Web | Gestiona peticiones HTTP y autenticación | Spring Boot |
| 🤖 Motor IA | Procesa análisis inteligentes y detección de anomalías | Python IA API |
| 🗄️ Servidor Base de Datos | Almacena información del sistema | MySQL / MariaDB |
| 🏛️ Servicio DIAN | Validación de facturación electrónica | API Externa |
| 🏦 Servicio Bancario | Validación de pagos electrónicos | API REST |
| 📦 Servidor de Reportes | Generación de reportes PDF y auditorías | JasperReports |
| ☁️ Servidor Backup | Respaldo y recuperación de información | Cloud Storage |

---

# 🔗 Protocolos de Comunicación

| Protocolo | Uso Principal |
|---|---|
| HTTP/HTTPS | Comunicación cliente-servidor |
| REST API | Integración entre servicios |
| JSON | Intercambio de datos |
| JDBC | Comunicación con base de datos |
| TLS/SSL | Seguridad y cifrado |
| TCP/IP | Comunicación de red |
| OAuth/JWT | Autenticación y autorización |
| SMTP | Envío de alertas y notificaciones |

---

# 🏛️ Diagrama de Nodos

```mermaid
graph TB

%% ===================================================
%% CLIENTE
%% ===================================================

CLIENTE["🖥️ Cliente Web<br>React / HTML5"]

%% ===================================================
%% SERVIDOR PRINCIPAL
%% ===================================================

SERVER["🌐 Servidor Aplicación<br>Spring Boot API"]

%% ===================================================
%% IA
%% ===================================================

IA["🤖 Motor IA<br>Python API"]

%% ===================================================
%% BASE DE DATOS
%% ===================================================

DB[(🗄️ MySQL / MariaDB)]

%% ===================================================
%% SERVICIOS EXTERNOS
%% ===================================================

DIAN["🏛️ API DIAN"]
BANCO["🏦 API Bancaria"]

%% ===================================================
%% REPORTES
%% ===================================================

REPORT["📑 Servidor Reportes<br>PDF / Auditorías"]

%% ===================================================
%% BACKUP
%% ===================================================

BACKUP["☁️ Servidor Backup"]

%% ===================================================
%% CONEXIONES
%% ===================================================

CLIENTE -->|HTTPS / JSON| SERVER

SERVER -->|REST API| IA

SERVER -->|JDBC| DB

SERVER -->|REST HTTPS| DIAN

SERVER -->|REST HTTPS| BANCO

SERVER -->|REST API| REPORT

DB -->|Backup Seguro| BACKUP

IA -->|Alertas Inteligentes| SERVER

%% ===================================================
%% ESTILOS
%% ===================================================

style CLIENTE fill:#BBDEFB,stroke:#1565C0,stroke-width:2px,color:#000000

style SERVER fill:#C8E6C9,stroke:#2E7D32,stroke-width:3px,color:#000000

style IA fill:#E1BEE7,stroke:#8E24AA,stroke-width:2px,color:#000000

style DB fill:#FFF59D,stroke:#F9A825,stroke-width:2px,color:#000000

style DIAN fill:#B3E5FC,stroke:#0288D1,stroke-width:2px,color:#000000

style BANCO fill:#FFCCBC,stroke:#D84315,stroke-width:2px,color:#000000

style REPORT fill:#FFE0B2,stroke:#EF6C00,stroke-width:2px,color:#000000

style BACKUP fill:#CFD8DC,stroke:#455A64,stroke-width:2px,color:#000000
```

---

# 📋 RNF — Requerimientos No Funcionales

| Código | Requerimiento No Funcional |
|---|---|
| RNF01 | El sistema debe garantizar disponibilidad 24/7. |
| RNF02 | El sistema debe utilizar conexiones seguras HTTPS. |
| RNF03 | El tiempo de respuesta no debe superar 3 segundos. |
| RNF04 | El sistema debe soportar múltiples usuarios concurrentes. |
| RNF05 | La información debe almacenarse de forma segura y respaldada. |
| RNF06 | El sistema debe implementar autenticación mediante JWT. |
| RNF07 | El sistema debe registrar auditorías de acceso y acciones. |
| RNF08 | El sistema debe ser escalable y modular. |
| RNF09 | El sistema debe contar con recuperación ante fallos. |
| RNF10 | El sistema debe integrarse con APIs externas mediante REST. |
| RNF11 | El sistema debe garantizar integridad de los datos. |
| RNF12 | El sistema debe permitir monitoreo y generación de reportes. |

---

# 🔒 Seguridad Implementada

## Medidas de Seguridad

- ✅ Autenticación mediante JWT.
- ✅ Comunicación cifrada HTTPS/TLS.
- ✅ Control de acceso por roles.
- ✅ Validación de sesiones.
- ✅ Respaldo automático de información.
- ✅ Auditoría de eventos críticos.
- ✅ Protección de credenciales cifradas.

---

# 🎯 Objetivo del Módulo M4

El módulo M4 tiene como finalidad definir:

- La infraestructura tecnológica del sistema.
- Los nodos físicos y lógicos.
- Los protocolos de comunicación.
- Los requerimientos no funcionales.
- La seguridad e interoperabilidad del software.

Garantizando así un sistema:

- Seguro.
- Escalable.
- Modular.
- Disponible.
- Eficiente.
- Preparado para integración inteligente mediante IA.