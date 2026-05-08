# 📓 Bitácora de Proyecto

**Sistema de Monitoreo de Facturación con Inteligencia Artificial**

| Campo | Detalle |
|---|---|
| **Estudiante** | Karolin Yodith Muñoz Palomeque |
| **Materia** | Ingeniería de Software 2 |
| **Docente** | Gloria Amparo Lora |
| **Institución** | Corporación Universitaria Remington |
| **Inicio del proyecto** | Ingeniería de Software 1 — Docente: Piedad |
| **Stack** | Python · FastAPI · SQLAlchemy · MySQL · Pydantic v2 |

---

# SECCIÓN 1 — ENTRADAS DE TRABAJO

---

## ENTRADA 01
**Fecha:** Febrero 2025 — Ingeniería de Software 1
**Estado:** ✅ COMPLETADA

| Campo | Detalle |
|---|---|
| **¿Qué hice?** | Inicio del proyecto en Ingeniería de Software 1 con la docente Piedad. Se realizó toda la fase de documentación: definición del problema, pregunta problematizadora, alcance del sistema (entradas, procesos, salidas), objetivos generales y específicos, y extracción de requisitos mediante encuesta. |
| **Problema encontrado** | En esta etapa no hubo problemas de implementación técnica ya que el trabajo era exclusivamente documental. La dificultad fue delimitar bien el alcance para una empresa pequeña sin que fuera demasiado ambicioso. |
| **¿Cómo lo resolví?** | Se acotó el alcance al monitoreo de facturación con detección de anomalías. Se realizó encuesta a usuarios reales del área contable para sustentar los requisitos con evidencia. |
| **¿Usé IA?** | No se utilizó IA en esta sesión. |
| **Ajuste del resultado** | La documentación quedó aprobada por la docente Piedad y sirvió como base para continuar el proyecto en Ingeniería de Software 2. |
| **Artefactos / archivos** | Documento de requisitos · Encuesta Microsoft Forms · Tabla de alcance (entrada/proceso/salida) |

---

## ENTRADA 02
**Fecha:** 27 de Marzo 2026 — Primera entrega Ing. Software 2
**Estado:** ✅ COMPLETADA

| Campo | Detalle |
|---|---|
| **¿Qué hice?** | Primera entrega formal en Ingeniería de Software 2 con la docente Gloria Amparo Lora. Se entregaron: diagrama de casos de uso, tabla de contexto, tabla de interacciones, diagrama de contexto arquitectónico (DCA), diagrama de arquetipos, diagrama de componentes UML, diagrama de despliegue UML, diccionario de datos, MER conceptual, modelo relacional y normalización 3FN. |
| **Problema encontrado** | El MER tenía errores estructurales: la tabla FACTURA incluía un campo `total` calculado que no debería almacenarse; faltaban tablas de catálogo (TIPO_ALERTA, ESTADO_ALERTA, METODO_PAGO, TIPO_ACCION, VERSION_MODELO, ESTADO_USUARIO); las cardinalidades de algunas relaciones estaban incorrectas. |
| **¿Cómo lo resolví?** | Se entregó el documento con lo que se tenía. La docente revisó y envió correcciones detalladas indicando exactamente qué tablas faltaban y qué campos debían eliminarse o separarse. |
| **¿Usé IA?** | Sí. Se utilizó IA para generar borradores del diagrama de casos de uso y la descripción del DCA. El resultado se revisó y ajustó manualmente para que coincidiera con el contexto real del proyecto. |
| **Ajuste del resultado** | Se aceptaron todas las correcciones de la docente. Se identificó que el MER necesitaba una reestructuración completa antes de pasar a implementación. |
| **Artefactos / archivos** | `Parcial_1_Ing_Software_2.docx` · Diagrama CU · MER versión 1 (con errores) |

---

## ENTRADA 03
**Fecha:** Inicio de Abril 2026 — Correcciones del MER (Iteración 1)
**Estado:** ✅ COMPLETADA

| Campo | Detalle |
|---|---|
| **¿Qué hice?** | Recepción de correcciones por parte de la docente. Primera iteración de corrección del MER: se eliminó el campo `total` de FACTURA (se estableció que el total se calcula como `SUM(cantidad × precio_unitario)` desde DETALLE_FACTURA), se ajustaron relaciones entre USUARIO y FACTURA. |
| **Problema encontrado** | Al corregir el MER por primera vez aún faltaban las tablas de catálogo. La relación entre ALERTA y FACTURA no estaba bien definida. El MER fue rechazado nuevamente. |
| **¿Cómo lo resolví?** | Se revisó la corrección con más detalle y se identificaron las tablas de catálogo faltantes: TIPO_ALERTA, ESTADO_ALERTA, ESTADO_USUARIO. |
| **¿Usé IA?** | No se utilizó IA en esta sesión. |
| **Ajuste del resultado** | Se preparó una segunda versión del MER incorporando las tablas de catálogo identificadas. Pendiente de revisión. |
| **Artefactos / archivos** | MER versión 2 · Notas de correcciones docente |

---

## ENTRADA 04
**Fecha:** Abril 2026 — Correcciones del MER (Iteración 2)
**Estado:** ✅ COMPLETADA

| Campo | Detalle |
|---|---|
| **¿Qué hice?** | Segunda iteración de corrección del MER. Se agregaron: TIPO_ALERTA, ESTADO_ALERTA, ESTADO_USUARIO. Se revisaron todas las cardinalidades. El MER fue enviado nuevamente a la docente. |
| **Problema encontrado** | La tabla ANALISIS_IA no tenía referencia a qué versión del modelo de IA ejecutó el análisis. Faltaba la tabla VERSION_MODELO. Además, AUDITORIA y TIPO_ACCION no estaban en el modelo. |
| **¿Cómo lo resolví?** | Se identificó que el sistema necesita rastrear qué versión del modelo de IA generó cada análisis para efectos de trazabilidad. Se agregaron VERSION_MODELO, AUDITORIA y TIPO_ACCION. |
| **¿Usé IA?** | Sí. Se consultó IA para validar si la estructura de ANALISIS_IA con referencia a VERSION_MODELO era coherente con buenas prácticas de sistemas de ML en producción. La IA confirmó el enfoque y sugirió incluir el campo `precision` en ANALISIS_IA. |
| **Ajuste del resultado** | Se incluyó el campo `precision DECIMAL(5,2)` en ANALISIS_IA para registrar la métrica de confianza del modelo en cada análisis. |
| **Artefactos / archivos** | MER versión 3 · VERSION_MODELO agregada · AUDITORIA y TIPO_ACCION agregadas |

---

## ENTRADA 05
**Fecha:** 12 de Abril 2026 — MER final aprobado (Iteración 3)
**Estado:** ✅ COMPLETADA

| Campo | Detalle |
|---|---|
| **¿Qué hice?** | Tercera y última corrección del MER, completada en la primera semana después de Semana Santa. Se entregó el MER con las 14 tablas completas y todas las relaciones correctas. La docente aprobó el modelo. |
| **Problema encontrado** | Las matrices de trazabilidad del documento original solo referenciaban 5 tablas cuando el MER final tenía 14. Las FK en las matrices estaban incompletas. Faltaban RF para Pagos (RF06), Clientes (RF10) y Auditoría (RF11). |
| **¿Cómo lo resolví?** | Se corrigieron las 14 matrices de trazabilidad para incluir todas las tablas del MER final, con sus FK correctas extraídas del DDL y los RF faltantes. |
| **¿Usé IA?** | Sí. Se utilizó IA para revisar el documento y detectar inconsistencias entre el MER, el DDL y las matrices. La IA generó las matrices corregidas en formato `.docx`. |
| **Ajuste del resultado** | Se validó cada corrección contra el MER y el script DDL. Se añadió nota explicativa en el documento indicando qué cambió respecto a la versión anterior. |
| **Artefactos / archivos** | `MER_corregido_final.png` · `Matrices_Trazabilidad_Corregidas.docx` · Script DDL completo |

---

## ENTRADA 06
**Fecha:** Mayo 2026 — Inicio de implementación (FastAPI)
**Estado:** 🔄 EN PROGRESO

| Campo | Detalle |
|---|---|
| **¿Qué hice?** | Con el MER aprobado se inició la fase de implementación. Se configuró el entorno de desarrollo: Python, FastAPI, SQLAlchemy, MySQL, Pydantic v2. Se creó la estructura base del proyecto con carpetas: `routers/`, `models.py`, `schemas.py`, `database.py`, `main.py`. |
| **Problema encontrado** | Al instalar dependencias surgió conflicto de versiones entre Pydantic v1 y v2 — SQLAlchemy usaba validadores con la sintaxis antigua (`class Config`). También se tuvo que configurar la cadena de conexión MySQL correctamente con `pymysql`. |
| **¿Cómo lo resolví?** | Se actualizó a Pydantic v2 usando `model_config = ConfigDict(...)` en lugar de `class Config`. Se instaló `pymysql` como driver y se verificó la conexión con un endpoint de prueba `GET /`. |
| **¿Usé IA?** | Sí. Se consultó IA para resolver el error de migración Pydantic v1 → v2 y para generar el código base del proyecto (`database.py`, `models.py` con las primeras tablas, endpoint del dashboard con métricas). |
| **Ajuste del resultado** | Se ajustaron los modelos SQLAlchemy para que los `relationships` estuvieran correctamente configurados con `back_populates`. Se validó que el endpoint `/dashboard` retornara las 4 métricas esperadas. |
| **Artefactos / archivos** | `main.py` · `database.py` · `models.py` · `routers/dashboard.py` · `requirements.txt` |

---

## ENTRADA 07 *(por completar)*
**Fecha:** ___________________
**Estado:** ⬜ PENDIENTE

| Campo | Detalle |
|---|---|
| **¿Qué hice?** | |
| **Problema encontrado** | |
| **¿Cómo lo resolví?** | |
| **¿Usé IA?** | |
| **Ajuste del resultado** | |
| **Artefactos / archivos** | |

---

# SECCIÓN 2 — DECISIONES TÉCNICAS

---

## DEC-01
**Fecha:** Febrero 2025
**Decisión:** Usar aprendizaje automático para detección de anomalías en facturación

| Campo | Detalle |
|---|---|
| **¿Qué se decidió?** | El núcleo del sistema sería un motor de inteligencia artificial (machine learning) para detectar anomalías en tiempo real, en lugar de usar solo reglas predefinidas. |
| **¿Por qué?** | Los sistemas tradicionales basados en reglas no detectan patrones inusuales emergentes. La encuesta mostró que el 100% de los usuarios considera útil la detección automática y que el 80% de los errores se deben a mal ingreso de datos, lo cual es detectable con ML. |
| **Alternativas descartadas** | Reglas de negocio manuales predefinidas (inflexible, no aprende de nuevos patrones). Auditoría manual periódica (reactivo, no en tiempo real). |
| **Artefacto que respalda** | Pregunta problematizadora · Tabla de alcance (entrada/proceso/salida) · Análisis de encuesta |
| **Impacto en el sistema** | Requirió incluir en el MER las tablas ANALISIS_IA y VERSION_MODELO para registrar los resultados y la versión del modelo usado en cada análisis. |

---

## DEC-02
**Fecha:** Marzo 2026
**Decisión:** No almacenar el campo `total` en FACTURA — es un valor calculado

| Campo | Detalle |
|---|---|
| **¿Qué se decidió?** | El campo `total` no se almacena en la tabla FACTURA. El total se calcula dinámicamente como `SUM(cantidad × precio_unitario)` desde DETALLE_FACTURA. |
| **¿Por qué?** | Almacenar un valor derivado viola la 3FN (dependencia transitiva). Podría generar inconsistencias si los detalles cambian pero el total no se actualiza. Es una regla de negocio, no un dato a persistir. |
| **Alternativas descartadas** | Campo total almacenado con trigger de actualización (complejo de mantener y propenso a inconsistencias). Vista calculada en la BD (viable pero innecesaria con ORM). |
| **Artefacto que respalda** | Normalización 3FN · MER corregido · Reglas de negocio del MER · DDL (no existe columna `total` en `CREATE TABLE factura`) |
| **Impacto en el sistema** | El endpoint `/dashboard` y todos los reportes calculan el total con `SUM(DetalleFactura.cantidad * DetalleFactura.precio_unitario)` en tiempo de consulta. |

---

## DEC-03
**Fecha:** Marzo 2026
**Decisión:** Usar tablas de catálogo para estados y tipos

| Campo | Detalle |
|---|---|
| **¿Qué se decidió?** | Separar todos los estados y tipos en tablas de catálogo independientes: ESTADO_USUARIO, TIPO_ALERTA, ESTADO_ALERTA, METODO_PAGO, TIPO_ACCION. |
| **¿Por qué?** | Guardar estados como strings directamente en las tablas viola la integridad referencial y dificulta cambiar los valores del catálogo. Con tablas de catálogo se garantiza consistencia y se facilita la administración desde la interfaz. |
| **Alternativas descartadas** | ENUM en MySQL (requiere `ALTER TABLE` para agregar valores; inflexible). Strings libres en las tablas (sin integridad, duplicación de datos). |
| **Artefacto que respalda** | MER corregido versión final · Normalización 3FN · DDL con FOREIGN KEY hacia catálogos · Matriz 9.7 (Tablas → MER → PK → FK → Forma Normal) |
| **Impacto en el sistema** | El DDL tiene 14 tablas en lugar de las 5 originales. Los endpoints de creación deben validar que los IDs de catálogo existan antes de insertar. |

---

## DEC-04
**Fecha:** Abril 2026
**Decisión:** Registrar la versión del modelo de IA en cada análisis

| Campo | Detalle |
|---|---|
| **¿Qué se decidió?** | Cada registro en ANALISIS_IA debe referenciar la versión exacta del modelo de ML que generó el análisis, mediante FK a VERSION_MODELO. |
| **¿Por qué?** | Sin este registro no es posible auditar ni reproducir los resultados. Si el modelo cambia de versión y los resultados varían, no habría forma de saber qué versión tomó qué decisión. |
| **Alternativas descartadas** | Guardar el nombre del modelo como string en ANALISIS_IA (no normalizado, dificulta trazabilidad). No registrar la versión (inaceptable para auditoría). |
| **Artefacto que respalda** | MER corregido final (relación `ANALISIS_IA —USA→ VERSION_MODELO`, cardinalidad N:1) · Matriz 9.6 (Relaciones MER) · Matriz 9.9 (Clases → Métodos) |
| **Impacto en el sistema** | Antes de ejecutar un análisis con IA, el sistema debe obtener el `id_modelo` activo desde VERSION_MODELO y asociarlo al registro de ANALISIS_IA. |

---

## DEC-05
**Fecha:** Mayo 2026
**Decisión:** FastAPI + SQLAlchemy + MySQL como stack de implementación

| Campo | Detalle |
|---|---|
| **¿Qué se decidió?** | Usar FastAPI como framework backend, SQLAlchemy como ORM y MySQL como motor de base de datos. |
| **¿Por qué?** | FastAPI genera documentación Swagger automática (útil como evidencia académica), tiene validación con Pydantic v2 integrada, y SQLAlchemy permite mapear directamente el MER sin escribir SQL crudo. MySQL es compatible con el DDL ya definido. |
| **Alternativas descartadas** | Django REST Framework (más pesado, mayor curva de aprendizaje para el tiempo disponible). Flask + SQLAlchemy (FastAPI tiene mejor DX y documentación automática). MongoDB (el MER ya estaba definido en relacional). |
| **Artefacto que respalda** | Diagrama de despliegue UML (Servidor Aplicación con protocolo REST) · Matriz 9.4 (Nodos → Protocolos → RNF → Componentes) · DDL MySQL |
| **Impacto en el sistema** | Toda la lógica se implementa en `routers/` separados por módulo, con schemas Pydantic v2 para validación y modelos SQLAlchemy para persistencia. |

---

## DEC-06 *(por completar)*
**Fecha:** ___________________
**Decisión:** ___________________

| Campo | Detalle |
|---|---|
| **¿Qué se decidió?** | |
| **¿Por qué?** | |
| **Alternativas descartadas** | |
| **Artefacto que respalda** | |
| **Impacto en el sistema** | |

---

*Proyecto académico — Corporación Universitaria Remington · 2025-2026*