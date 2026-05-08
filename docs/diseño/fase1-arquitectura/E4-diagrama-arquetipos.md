# Diagrama de Arquetipos

## ¿Qué es un Diagrama de Arquetipos?

Un Diagrama de Arquetipos es una representación conceptual que permite identificar las entidades principales de un sistema y las relaciones existentes entre ellas antes de construir modelos técnicos como el MER o los diagramas UML.

En el proyecto del **Sistema de Monitoreo Inteligente de Facturación con IA**, este diagrama ayuda a comprender la estructura general del sistema y cómo interactúan los componentes principales relacionados con la facturación, pagos, alertas, auditoría y análisis mediante inteligencia artificial.

---

# Arquetipos Principales del Sistema

## Usuario
Representa a las personas que interactúan con el sistema, como contadores, administradores y auditores.

### Responsabilidades:
- Registrar facturas
- Gestionar pagos
- Consultar reportes
- Administrar usuarios
- Supervisar alertas

---

## Cliente
Entidad que representa a las empresas o personas asociadas a las facturas registradas en el sistema.

### Responsabilidades:
- Asociarse a facturas
- Mantener información tributaria y de contacto

---

## Factura
Entidad principal del sistema encargada de almacenar la información de facturación.

### Responsabilidades:
- Registrar información de venta
- Asociarse a clientes y usuarios
- Enviar datos para análisis IA

---

## DetalleFactura
Representa los productos o servicios asociados a una factura.

### Responsabilidades:
- Almacenar cantidades y precios
- Calcular subtotales

---

## Pago
Representa los pagos realizados sobre una factura.

### Responsabilidades:
- Registrar pagos parciales o completos
- Relacionarse con métodos de pago

---

## MetodoPago
Catálogo de métodos utilizados para realizar pagos.

### Responsabilidades:
- Clasificar pagos
- Estandarizar tipos de pago

---

## AnalisisIA
Representa el análisis inteligente realizado sobre las facturas.

### Responsabilidades:
- Detectar anomalías
- Evaluar comportamientos inusuales
- Generar resultados automáticos

---

## VersionModelo
Representa las versiones del modelo de inteligencia artificial utilizadas.

### Responsabilidades:
- Controlar versiones del modelo IA
- Registrar precisión y mejoras del algoritmo

---

## Alerta
Entidad encargada de representar las irregularidades detectadas.

### Responsabilidades:
- Notificar anomalías
- Registrar incidencias
- Gestionar estados de alerta

---

## TipoAlerta
Clasificación de alertas generadas por el sistema.

### Responsabilidades:
- Categorizar anomalías
- Organizar incidencias detectadas

---

## EstadoAlerta
Representa el estado actual de una alerta.

### Responsabilidades:
- Controlar ciclo de vida de alertas
- Administrar seguimiento de incidencias

---

## Auditoria
Entidad encargada del registro histórico de acciones dentro del sistema.

### Responsabilidades:
- Registrar actividades de usuarios
- Mantener trazabilidad

---

## TipoAccion
Catálogo de acciones auditables realizadas dentro del sistema.

### Responsabilidades:
- Clasificar eventos de auditoría
- Estandarizar acciones registradas

---

# Relaciones Conceptuales

- Un Usuario registra Facturas.
- Un Cliente puede tener múltiples Facturas.
- Una Factura contiene múltiples DetalleFactura.
- Una Factura puede tener varios Pagos.
- Un Pago utiliza un MetodoPago.
- Una Factura es analizada por AnalisisIA.
- AnalisisIA utiliza una VersionModelo.
- El sistema genera Alertas cuando detecta anomalías.
- Una Alerta pertenece a un TipoAlerta y tiene un EstadoAlerta.
- Las acciones realizadas por los usuarios se almacenan en Auditoria.
- Auditoria clasifica eventos mediante TipoAccion.

---

# Objetivo del Diagrama de Arquetipos

El objetivo principal del diagrama es:
- identificar las entidades fundamentales del sistema,
- comprender sus responsabilidades,
- definir relaciones conceptuales,
- y servir como base para el diseño del MER, UML y base de datos.

Este diagrama facilita el análisis estructural del sistema antes de pasar a fases técnicas y de implementación.