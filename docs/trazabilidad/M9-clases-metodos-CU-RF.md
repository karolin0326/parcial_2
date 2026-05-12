# 📘 M9 - Clases - Métodos - CU - RF

# Sistema Inteligente de Monitoreo de Facturación con IA

---

# 📌 M9 — Modelo de Clases y Métodos del Sistema

El módulo M9 representa la estructura orientada a objetos del sistema, mostrando las principales clases, atributos, métodos y relaciones que conforman el funcionamiento interno del software.

Este modelo permite organizar la lógica del sistema bajo principios de encapsulamiento, modularidad y reutilización de código.

---

# 🧩 Diagrama de Clases

```mermaid
classDiagram

%% ===================================================
%% CLASE USUARIO
%% ===================================================

class Usuario {
    +int idUsuario
    +String nombre
    +String correo
    +String password
    +String rol

    +iniciarSesion()
    +cerrarSesion()
    +registrarUsuario()
    +actualizarUsuario()
}

%% ===================================================
%% CLASE CLIENTE
%% ===================================================

class Cliente {
    +int idCliente
    +String nombreEmpresa
    +String nit
    +String direccion
    +String telefono

    +registrarCliente()
    +actualizarCliente()
    +eliminarCliente()
}

%% ===================================================
%% CLASE FACTURA
%% ===================================================

class Factura {
    +int idFactura
    +String numeroFactura
    +Date fechaEmision
    +double total
    +String estado

    +crearFactura()
    +calcularTotal()
    +validarFactura()
    +generarFacturaPDF()
}

%% ===================================================
%% CLASE DETALLE FACTURA
%% ===================================================

class DetalleFactura {
    +int idDetalle
    +String descripcion
    +int cantidad
    +double precioUnitario
    +double subtotal

    +calcularSubtotal()
}

%% ===================================================
%% CLASE PAGO
%% ===================================================

class Pago {
    +int idPago
    +double monto
    +Date fechaPago
    +String metodoPago

    +registrarPago()
    +validarPago()
}

%% ===================================================
%% CLASE IA ANALISIS
%% ===================================================

class AnalisisIA {
    +int idAnalisis
    +String tipoAnalisis
    +double porcentajeRiesgo

    +analizarFactura()
    +detectarAnomalias()
    +generarResultado()
}

%% ===================================================
%% CLASE ALERTA
%% ===================================================

class Alerta {
    +int idAlerta
    +String tipoAlerta
    +String nivelRiesgo
    +String estado

    +generarAlerta()
    +enviarNotificacion()
}

%% ===================================================
%% CLASE AUDITORIA
%% ===================================================

class Auditoria {
    +int idAuditoria
    +String accion
    +Date fechaEvento

    +registrarEvento()
    +consultarAuditoria()
}

%% ===================================================
%% CLASE REPORTE
%% ===================================================

class Reporte {
    +int idReporte
    +String tipoReporte
    +Date fechaGeneracion

    +generarReporte()
    +exportarPDF()
}

%% ===================================================
%% RELACIONES
%% ===================================================

Usuario "1" --> "*" Factura : registra
Cliente "1" --> "*" Factura : posee
Factura "1" --> "*" DetalleFactura : contiene
Factura "1" --> "*" Pago : recibe
Factura "1" --> "1" AnalisisIA : analiza
AnalisisIA "1" --> "*" Alerta : genera
Usuario "1" --> "*" Auditoria : realiza
Factura "1" --> "*" Reporte : genera
```

---

# 🏛️ Descripción de Clases

| Clase | Descripción |
|---|---|
| Usuario | Gestiona acceso y administración del sistema |
| Cliente | Almacena información de clientes |
| Factura | Controla la gestión de facturación |
| DetalleFactura | Registra productos o servicios facturados |
| Pago | Gestiona pagos realizados |
| AnalisisIA | Ejecuta análisis inteligentes |
| Alerta | Gestiona anomalías y alertas |
| Auditoria | Registra eventos y acciones |
| Reporte | Genera reportes administrativos |

---

# ⚙️ Métodos Principales

| Clase | Método | Función |
|---|---|---|
| Usuario | iniciarSesion() | Autenticar usuario |
| Factura | crearFactura() | Registrar nueva factura |
| Factura | calcularTotal() | Calcular total facturado |
| Pago | registrarPago() | Registrar pagos |
| AnalisisIA | detectarAnomalias() | Detectar irregularidades |
| Alerta | generarAlerta() | Generar alertas automáticas |
| Auditoria | registrarEvento() | Registrar acciones del sistema |
| Reporte | exportarPDF() | Exportar reportes |

---

# 👥 CU — Casos de Uso Asociados

## 📊 Diagrama de Casos de Uso

```mermaid
flowchart LR

USUARIO["👨‍💼 Usuario"]
ADMIN["🛠️ Administrador"]
IA["🤖 Motor IA"]

subgraph SISTEMA["💻 Sistema Inteligente"]

LOGIN([🔐 Iniciar Sesión])
FACT([🧾 Crear Factura])
PAGO([💳 Registrar Pago])
ANALISIS([🧠 Analizar Factura])
ALERTA([🚨 Generar Alertas])
REPORTE([📑 Generar Reportes])

end

USUARIO --> LOGIN
USUARIO --> FACT
USUARIO --> PAGO
USUARIO --> REPORTE

ADMIN --> REPORTE
ADMIN --> ALERTA

IA --> ANALISIS
ANALISIS --> ALERTA

FACT --> ANALISIS

style SISTEMA fill:#F5F5F5,stroke:#1565C0,stroke-width:4px,color:#000000
```

---

# 📋 RF — Requerimientos Funcionales Relacionados

| Código | Requerimiento Funcional |
|---|---|
| RF01 | Registrar facturas electrónicas |
| RF02 | Gestionar usuarios y autenticación |
| RF03 | Analizar facturas mediante IA |
| RF04 | Generar reportes financieros |
| RF05 | Detectar anomalías automáticamente |
| RF06 | Registrar pagos |
| RF07 | Gestionar detalle de facturas |
| RF08 | Generar alertas inteligentes |
| RF09 | Registrar auditorías |
| RF10 | Gestionar clientes |

---

# 🎯 Objetivo del Módulo M9

El módulo M9 tiene como finalidad representar la estructura orientada a objetos del sistema, permitiendo:

- Organizar la lógica de negocio.
- Definir responsabilidades de clases.
- Facilitar mantenimiento y escalabilidad.
- Implementar principios de programación orientada a objetos.
- Integrar procesos inteligentes mediante IA.
- Mejorar la reutilización y modularidad del código.