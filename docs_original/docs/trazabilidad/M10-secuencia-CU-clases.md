# 📘 M10 - Secuencia - CU - Clases

# Sistema Inteligente de Monitoreo de Facturación con IA

---

# 📌 M10 — Diagramas de Secuencia y Relación con Clases

El módulo M10 representa el flujo secuencial de interacción entre los actores, interfaces, clases y procesos internos del sistema durante la ejecución de las funcionalidades principales.

Este módulo permite visualizar cómo se comunican los componentes del software en tiempo real, mostrando el orden de ejecución de métodos y operaciones.

---

# 🔄 Diagrama de Secuencia Principal

## 📊 Flujo de Registro y Análisis de Facturación

```mermaid
sequenceDiagram

actor Usuario
participant UI as 🖥️ UI Facturación
participant Factura as 🧾 Clase Factura
participant Cliente as 👥 Clase Cliente
participant Pago as 💳 Clase Pago
participant IA as 🤖 Clase AnalisisIA
participant Alerta as 🚨 Clase Alerta
participant DB as 🗄️ Base de Datos
participant DIAN as 🏛️ API DIAN

%% ===================================================
%% LOGIN
%% ===================================================

Usuario->>UI: Ingresar datos de factura

%% ===================================================
%% VALIDACIÓN CLIENTE
%% ===================================================

UI->>Cliente: validarCliente()
Cliente->>DB: consultarCliente()
DB-->>Cliente: datosCliente()
Cliente-->>UI: clienteValidado()

%% ===================================================
%% CREACIÓN FACTURA
%% ===================================================

UI->>Factura: crearFactura()
Factura->>Factura: calcularTotal()
Factura->>DB: guardarFactura()

DB-->>Factura: facturaRegistrada()

%% ===================================================
%% VALIDACIÓN DIAN
%% ===================================================

Factura->>DIAN: validarFacturaElectronica()
DIAN-->>Factura: facturaValidada()

%% ===================================================
%% REGISTRO PAGO
%% ===================================================

UI->>Pago: registrarPago()
Pago->>DB: guardarPago()

DB-->>Pago: pagoRegistrado()

%% ===================================================
%% ANÁLISIS IA
%% ===================================================

Factura->>IA: analizarFactura()
IA->>IA: detectarAnomalias()

alt Anomalía Detectada

IA->>Alerta: generarAlerta()
Alerta->>DB: guardarAlerta()
DB-->>Alerta: alertaRegistrada()

Alerta-->>Usuario: notificaciónAlerta()

else Factura Correcta

IA-->>Factura: análisisCorrecto()

end

%% ===================================================
%% FINALIZACIÓN
%% ===================================================

Factura-->>UI: facturaProcesada()
UI-->>Usuario: ✅ Factura registrada correctamente
```

---

# 👥 CU — Casos de Uso Relacionados

| Código | Caso de Uso |
|---|---|
| CU01 | Iniciar sesión |
| CU02 | Registrar factura |
| CU03 | Gestionar clientes |
| CU04 | Registrar pagos |
| CU05 | Analizar facturación |
| CU06 | Detectar anomalías |
| CU07 | Generar alertas |
| CU08 | Consultar reportes |
| CU09 | Validar factura electrónica |

---

# 🧩 Clases Participantes

| Clase | Responsabilidad |
|---|---|
| Factura | Gestionar información de facturación |
| Cliente | Validar y administrar clientes |
| Pago | Registrar pagos |
| AnalisisIA | Analizar datos y detectar anomalías |
| Alerta | Gestionar alertas automáticas |
| Usuario | Interactuar con el sistema |
| Reporte | Generar reportes financieros |

---

# 🏛️ Relación entre Clases y Flujo

## 📊 Diagrama Simplificado de Interacción

```mermaid
graph LR

USUARIO["👨‍💼 Usuario"]

UI["🖥️ UI Facturación"]

FACT["🧾 Factura"]

CLIENTE["👥 Cliente"]

PAGO["💳 Pago"]

IA["🤖 AnalisisIA"]

ALERTA["🚨 Alerta"]

DB[(🗄️ Base de Datos)]

DIAN["🏛️ API DIAN"]

USUARIO --> UI

UI --> CLIENTE
UI --> FACT
UI --> PAGO

FACT --> DIAN
FACT --> IA

IA --> ALERTA

CLIENTE --> DB
FACT --> DB
PAGO --> DB
ALERTA --> DB

%% ===================================================
%% ESTILOS
%% ===================================================

style USUARIO fill:#C8E6C9,stroke:#2E7D32,color:#000000
style UI fill:#BBDEFB,stroke:#1565C0,color:#000000
style FACT fill:#FFF59D,stroke:#F9A825,color:#000000
style CLIENTE fill:#DCEDC8,stroke:#558B2F,color:#000000
style PAGO fill:#B2EBF2,stroke:#00838F,color:#000000
style IA fill:#E1BEE7,stroke:#8E24AA,color:#000000
style ALERTA fill:#FFCDD2,stroke:#C62828,color:#000000
style DB fill:#CFD8DC,stroke:#455A64,color:#000000
style DIAN fill:#B3E5FC,stroke:#0288D1,color:#000000
```

---

# 📋 Flujo General del Proceso

| Paso | Acción |
|---|---|
| 1 | Usuario registra factura |
| 2 | Sistema valida cliente |
| 3 | Factura es almacenada |
| 4 | Se valida electrónicamente con la DIAN |
| 5 | Se registra el pago |
| 6 | Motor IA analiza la factura |
| 7 | Se detectan posibles anomalías |
| 8 | Sistema genera alertas automáticas |
| 9 | Información queda almacenada |

---

# 🎯 Objetivo del Módulo M10

El módulo M10 tiene como objetivo:

- Representar el flujo dinámico del sistema.
- Mostrar la interacción entre clases.
- Definir el orden de ejecución de procesos.
- Visualizar llamadas a métodos y respuestas.
- Facilitar el análisis del comportamiento del software.
- Mejorar la comprensión de la lógica interna del sistema.