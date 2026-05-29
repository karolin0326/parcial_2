# Diagrama de Despliegue UML

## ¿Qué es un Diagrama de Despliegue UML?

Un Diagrama de Despliegue UML es un diagrama que representa la distribución física de los componentes de software dentro de la infraestructura tecnológica del sistema.

Este tipo de diagrama permite visualizar:
- servidores,
- dispositivos,
- conexiones de red,
- protocolos de comunicación,
- y los componentes que se ejecutan en cada nodo.

En el proyecto del **Sistema de Monitoreo Inteligente de Facturación con IA**, el diagrama de despliegue muestra cómo interactúan el servidor web, la base de datos, el motor de inteligencia artificial y los usuarios dentro de la arquitectura del sistema.

---

# Nodos del Sistema

## 1. Cliente Web / Navegador

### Descripción:
Dispositivo utilizado por los usuarios para acceder al sistema mediante internet.

### Funciones:
- Acceso al dashboard
- Registro de facturas
- Consulta de alertas y reportes
- Gestión de usuarios

### Tecnologías:
- Navegador Web
- HTML
- CSS
- JavaScript

---

## 2. Servidor de Aplicaciones

### Descripción:
Servidor principal encargado de ejecutar la lógica del sistema.

### Funciones:
- Procesamiento de solicitudes
- Validación de datos
- Gestión de módulos
- Comunicación con IA y base de datos

### Componentes alojados:
- Módulo Facturación
- Módulo Usuarios
- Módulo Pagos
- Módulo Reportes
- API REST

### Protocolos:
- HTTPS
- REST/JSON

---

## 3. Servidor Motor IA

### Descripción:
Servidor encargado del análisis inteligente de facturas.

### Funciones:
- Detección de anomalías
- Evaluación de patrones
- Procesamiento automático de datos

### Componentes alojados:
- AnalisisIA
- VersionModelo

### Protocolos:
- API REST
- gRPC

---

## 4. Servidor Base de Datos

### Descripción:
Servidor encargado del almacenamiento centralizado de información.

### Funciones:
- Gestión de datos
- Relaciones entre tablas
- Integridad de información

### Tecnologías:
- MySQL
- MariaDB

### Protocolos:
- TCP/IP

---

## 5. Servidor de Caché

### Descripción:
Servidor utilizado para optimizar el rendimiento del sistema.

### Funciones:
- Almacenamiento temporal de sesiones
- Reducción de consultas repetitivas
- Mejora del rendimiento

### Tecnologías:
- Redis

---

## 6. Integración DIAN

### Descripción:
Servicio externo encargado de validar facturación electrónica.

### Funciones:
- Validación tributaria
- Verificación legal
- Recepción de facturas electrónicas

### Protocolos:
- HTTPS
- SOAP

---

# Diagrama de Despliegue (Representación Textual)

```text
+----------------------+
| Cliente Web          |
| Navegador / Usuario  |
+----------+-----------+
           |
        HTTPS
           |
           v
+----------------------+
| Servidor Aplicación  |
| API REST / Backend   |
+----------+-----------+
           |
    ----------------
    |              |
REST/gRPC       TCP/IP
    |              |
    v              v
+-----------+   +------------------+
| Motor IA  |   | Base de Datos    |
| Analisis  |   | MySQL/MariaDB    |
+-----------+   +------------------+
       |
       |
       v
+----------------------+
| Sistema de Alertas   |
+----------------------+

           |
           v
+----------------------+
| Integración DIAN     |
| Facturación Legal    |
+----------------------+

           |
           v
+----------------------+
| Servidor Caché Redis |
+----------------------+