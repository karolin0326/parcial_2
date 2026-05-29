# Sistema de Monitoreo Inteligente de Facturación con IA

## Descripción del Proyecto

El Sistema de Monitoreo Inteligente de Facturación con Inteligencia Artificial es una solución de software desarrollada para supervisar, analizar y detectar anomalías dentro de los procesos de facturación de pequeñas empresas.

El sistema utiliza técnicas de inteligencia artificial y aprendizaje automático para identificar irregularidades, errores contables y posibles fraudes en tiempo real, mejorando la eficiencia y el control dentro del área contable.

Este proyecto fue desarrollado como parte del área de Ingeniería de Software, integrando análisis, modelado UML, diseño de base de datos y automatización inteligente.

---

# Problemática

Los sistemas tradicionales de monitoreo financiero suelen depender de reglas predefinidas que no siempre permiten detectar comportamientos anómalos o inconsistencias inesperadas en los procesos de facturación.

Esto puede generar:
- errores contables,
- pérdidas financieras,
- inconsistencias tributarias,
- fraudes,
- y retrasos en auditorías.

Ante esta problemática surge la necesidad de implementar un sistema inteligente capaz de monitorear y analizar automáticamente grandes volúmenes de información financiera.

---

# Objetivo General

Desarrollar un sistema de software que utilice técnicas de inteligencia artificial para detectar irregularidades o errores inusuales en tiempo real dentro de los datos de facturación, mejorando el monitoreo y la identificación temprana de posibles problemas en pequeñas empresas.

---

# Objetivos Específicos

- Identificar irregularidades comunes en procesos de facturación.
- Analizar técnicas de aprendizaje automático aplicadas al monitoreo financiero.
- Diseñar un sistema inteligente de detección de anomalías.
- Automatizar el análisis de datos de facturación.
- Generar alertas automáticas.
- Integrar módulos de auditoría y reportes.
- Garantizar integridad y trazabilidad de la información.

---

# Características Principales

## Gestión de Facturación
- Registro de facturas.
- Consulta de facturas.
- Validación de información.

## Gestión de Clientes
- Administración de clientes.
- Validación de NIT.
- Asociación de clientes con facturas.

## Gestión de Pagos
- Registro de pagos.
- Métodos de pago.
- Validación de pagos parciales y totales.

## Inteligencia Artificial
- Detección automática de anomalías.
- Monitoreo inteligente.
- Evaluación de patrones inusuales.
- Generación de alertas.

## Auditoría
- Registro de actividades.
- Seguimiento de acciones.
- Historial de eventos del sistema.

## Reportes
- Reportes de facturación.
- Reportes de anomalías.
- Reportes de auditoría.

---

# Arquitectura del Sistema

El sistema está compuesto por los siguientes módulos:

```text
Frontend Web
    |
    v
Backend API REST
    |
    +-------------------+
    |                   |
    v                   v
Motor IA           Base de Datos
    |
    v
Sistema de Alertas
```

---

# Tecnologías Utilizadas

| Tecnología | Uso |
|---|---|
| MySQL / MariaDB | Base de datos |
| SQL | Gestión de datos |
| UML | Modelado del sistema |
| Mermaid | Diagramas en Markdown |
| IA / Machine Learning | Detección de anomalías |
| REST API | Comunicación entre módulos |

---

# Estructura de Base de Datos

El sistema utiliza una base de datos relacional normalizada en Tercera Forma Normal (3FN).

## Principales entidades

- Usuario
- Cliente
- Factura
- DetalleFactura
- Pago
- MetodoPago
- AnalisisIA
- VersionModelo
- Alerta
- Auditoria

---

# Módulos del Sistema

| Módulo | Función |
|---|---|
| Usuarios | Gestión de acceso y autenticación |
| Facturación | Registro y administración de facturas |
| Clientes | Administración de clientes |
| Pagos | Gestión de pagos |
| IA | Análisis inteligente de facturación |
| Alertas | Gestión de anomalías detectadas |
| Auditoría | Registro de acciones |
| Reportes | Generación de informes |

---

# Requisitos Funcionales

| Código | Requisito |
|---|---|
| RF01 | Registrar facturas |
| RF02 | Gestionar usuarios |
| RF03 | Analizar facturas con IA |
| RF04 | Generar reportes |
| RF05 | Generar alertas |
| RF06 | Registrar pagos |
| RF10 | Gestionar clientes |
| RF11 | Registrar auditoría |

---

# Requisitos No Funcionales

| Código | Requisito |
|---|---|
| RNF01 | Disponibilidad del sistema |
| RNF02 | Escalabilidad |
| RNF03 | Rendimiento del motor IA |
| RNF04 | Integridad de datos |
| RNF05 | Optimización mediante caché |
| RNF06 | Cumplimiento normativo DIAN |

---

# Inteligencia Artificial

El sistema incorpora un módulo de inteligencia artificial encargado de:

- Analizar datos históricos.
- Detectar comportamientos anómalos.
- Evaluar patrones sospechosos.
- Generar alertas automáticas.
- Mejorar el monitoreo financiero.

---

# Integraciones

## Sistema ERP
Permite sincronizar información financiera y contable.

## DIAN
Valida facturación electrónica y cumplimiento tributario.

---

# Seguridad

El sistema implementa:
- autenticación de usuarios,
- validación de accesos,
- auditoría de acciones,
- integridad referencial,
- y control de estados.

---

# Beneficios del Sistema

- Automatización de procesos.
- Reducción de errores humanos.
- Detección temprana de irregularidades.
- Mejor control financiero.
- Mayor trazabilidad.
- Optimización de auditorías.
- Cumplimiento tributario.

---

# Diagramas del Proyecto

El proyecto incluye:

- Diagrama de Casos de Uso
- Diagrama de Componentes UML
- Diagrama de Despliegue UML
- Modelo Entidad Relación (MER)
- Modelo Relacional
- Diagramas de Secuencia
- Diagrama de Estados
- Wireframes
- Mapa de Navegación

---

# Estado del Proyecto

Actualmente el proyecto se encuentra en fase de:
- análisis,
- modelado,
- diseño de arquitectura,
- y estructuración de base de datos.

---

# Autores

Proyecto académico desarrollado para Ingeniería de Software.

---

# Licencia

Uso académico y educativo.

---

# ¿Cómo correr este proyecto?

Para levantar la API (FastAPI) y acceder a las vistas y al panel de documentación, sigue estos pasos:

## 1. Prerrequisitos
1. Tener instalado **[Python](https://www.python.org/downloads/)**.
   > **Importante:** Asegúrate de marcar la opción "Add Python to PATH" al instalar.
2. Tener instalado y corriendo **XAMPP** (o un servidor MySQL local).
3. Asegúrate de que el servicio **MySQL** esté iniciado en el panel de XAMPP.
4. Crear una base de datos vacía en MySQL (usando phpMyAdmin) llamada `sistema_facturacion`.

## 2. Ejecución Automática (Windows)
En la carpeta principal del proyecto hay un archivo llamado `run.bat`.
1. Dale **doble clic a `run.bat`**.
2. Este script se encargará automáticamente de:
   - Crear un entorno virtual.
   - Instalar las dependencias necesarias (`fastapi`, `sqlalchemy`, etc.).
   - Encender el servidor en tu máquina.

## 3. Acceso al Sistema
Una vez que veas en la consola que el servidor está encendido, abre tu navegador web:
- 📊 **Dashboard Visual:** [http://localhost:8000/dashboard](http://localhost:8000/dashboard)
- ⚙️ **Documentación API (Swagger):** [http://localhost:8000/docs](http://localhost:8000/docs)