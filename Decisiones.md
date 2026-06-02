# 📘 DECISIONES.md

# Sistema Inteligente de Monitoreo de Facturación con IA

---

# 📌 Registro de Decisiones Arquitectónicas y Técnicas

Este documento contiene las principales decisiones tomadas durante el análisis, diseño y desarrollo del proyecto **Sistema Inteligente de Monitoreo de Facturación con IA**.

---

## Decisión #01
¿Qué decidí?
Usar aprendizaje automático para detección de anomalías en facturación en lugar de reglas predefinidas.

¿Por qué?
Los sistemas tradicionales basados en reglas no detectan patrones inusuales emergentes. La encuesta mostró que el 100% de los usuarios considera útil la detección automática y que el 80% de los errores se deben a mal ingreso de datos, lo cual es detectable con ML.

¿Qué artefacto de diseño respalda esta decisión?
Pregunta problematizadora, Tabla de alcance (entrada/proceso/salida) y Análisis de encuesta.

---

## Decisión #02
¿Qué decidí?
No almacenar el campo `total` en FACTURA, ya que es un valor calculado.

¿Por qué?
Almacenar un valor derivado viola la Tercera Forma Normal (3FN). Podría generar inconsistencias si los detalles cambian pero el total no se actualiza.

¿Qué artefacto de diseño respalda esta decisión?
Normalización 3FN, Modelo Entidad Relación (MER) y Script DDL.

---

## Decisión #03
¿Qué decidí?
Usar tablas de catálogo independientes para los estados y tipos (ESTADO_USUARIO, TIPO_ALERTA, ESTADO_ALERTA, METODO_PAGO, TIPO_ACCION).

¿Por qué?
Guardar estados como strings directamente en las tablas viola la integridad referencial y dificulta cambiar los valores. Con tablas de catálogo se garantiza consistencia y se facilita la administración desde la interfaz.

¿Qué artefacto de diseño respalda esta decisión?
MER versión final, Normalización 3FN y Matriz 9.7 (Tablas → MER → PK → FK → Forma Normal).

---

## Decisión #04
¿Qué decidí?
Registrar la versión exacta del modelo de IA en cada análisis realizado por el sistema.

¿Por qué?
Sin este registro no es posible auditar ni reproducir los resultados. Si el modelo cambia de versión y los resultados varían, no habría forma de saber qué versión tomó qué decisión.

¿Qué artefacto de diseño respalda esta decisión?
MER final (relación ANALISIS_IA —USA→ VERSION_MODELO), Matriz 9.6 y Matriz 9.9.

---

## Decisión #05
¿Qué decidí?
Utilizar MySQL/MariaDB como sistema gestor de base de datos relacional.

¿Por qué?
Garantiza alta estabilidad, soporte para relaciones complejas, integridad referencial y buen rendimiento transaccional para un sistema financiero.

¿Qué artefacto de diseño respalda esta decisión?
Diagrama de Despliegue UML y Modelo Relacional de Base de Datos.

---

## Decisión #06
¿Qué decidí?
Implementar seguridad mediante autenticación basada en JWT (JSON Web Token).

¿Por qué?
JWT permite autenticación segura, manejo eficiente de sesiones, protección de endpoints de la API y una integración muy sencilla con el frontend desarrollado en React.

¿Qué artefacto de diseño respalda esta decisión?
Diagrama de Componentes UML y Requisitos No Funcionales (RNF04 - Integridad de datos).

---

## Decisión #07
¿Qué decidí?
Generar alertas automáticas e inteligentes cuando se detecten anomalías.

¿Por qué?
Las alertas en tiempo real son fundamentales para la respuesta temprana, la prevención de fraude y el monitoreo continuo sin necesidad de revisión manual constante.

¿Qué artefacto de diseño respalda esta decisión?
Diagrama de Casos de Uso y Especificación de Requisitos Funcionales (RF05 - Generar alertas).

---

## Decisión #08
¿Qué decidí?
Desarrollar la plataforma como una aplicación web responsive.

¿Por qué?
Esto permite acceso multiplataforma, compatibilidad con cualquier navegador y facilita que los administradores revisen las facturas desde cualquier dispositivo sin instalar software adicional.

¿Qué artefacto de diseño respalda esta decisión?
Wireframes, Mapa de Navegación y Diagrama de Despliegue UML.

---

## Decisión #09
¿Qué decidí?
Utilizar FastAPI (Python) como framework backend.

¿Por qué?
FastAPI genera documentación automática nativa (Swagger), tiene validación de datos integrada con Pydantic, y al ser Python, facilita enormemente la integración con la librería de Inteligencia Artificial para el motor de anomalías.

¿Qué artefacto de diseño respalda esta decisión?
Diagrama de Despliegue UML (Servidor Aplicación con protocolo REST) y Diagrama de Componentes UML.

---

## Decisión #10
¿Qué decidí?
Implementar un módulo transversal de auditoría que registre todas las acciones críticas.

¿Por qué?
La auditoría es un requerimiento vital en aplicaciones contables para asegurar la trazabilidad, seguridad y seguimiento detallado de todas las operaciones de los usuarios en el sistema.

¿Qué artefacto de diseño respalda esta decisión?
Modelo Entidad Relación (Tabla Auditoria) y Requisitos Funcionales (RF11 - Registrar auditoría).