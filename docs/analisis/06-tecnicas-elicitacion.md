# 🛠️ Técnicas de Elicitación de Requisitos

# Sistema Inteligente de Monitoreo de Facturación con IA ("Fisgón")

Este documento describe las técnicas de elicitación de requisitos utilizadas para comprender el dominio del problema, identificar las necesidades de los usuarios (Contadores, Analistas y Administradores) y definir las funcionalidades del sistema **Fisgón** para pequeñas empresas en Colombia.

---

## 1. Entrevistas Semi-estructuradas 🗣️

Se realizaron entrevistas con los principales actores involucrados en el proceso contable para entender sus dolores diarios, flujos de trabajo y expectativas respecto a la automatización con Inteligencia Artificial.

### **Público Objetivo:**
- Contadores Públicos.
- Analistas Financieros.
- Administradores de Pequeñas Empresas.

### **Resultados Obtenidos:**
- **Identificación de cuellos de botella:** Se detectó que la revisión manual de facturas para encontrar duplicidades o montos atípicos consume gran parte del tiempo operativo.
- **Necesidades de Alertas:** Los contadores expresaron la necesidad de recibir notificaciones inmediatas en lugar de tener que buscar los errores al final del mes.
- **Roles y Accesos:** Se definió la necesidad estricta de separar los permisos entre quien registra una factura (Analista) y quien configura las reglas de la IA (Administrador).

---

## 2. Análisis de Documentación 📄

Se estudiaron los documentos normativos e internos que rigen la facturación en Colombia para asegurar el cumplimiento legal y la correcta estructuración de los datos.

### **Documentos Analizados:**
- Anexos técnicos de la **DIAN** sobre Facturación Electrónica.
- Formatos actuales (plantillas en Excel) utilizados por las pymes para llevar el registro de ingresos y egresos.
- Historial de reportes de auditoría contable donde se evidenciaban las "anomalías" típicas (ej. facturas duplicadas, NITs inválidos, montos exorbitantes).

### **Resultados Obtenidos:**
- Se estructuró el modelo de datos (`CLIENTES`, `FACTURAS`, `DETALLE_FACTURA`).
- Se definieron las validaciones necesarias para el cumplimiento normativo (**RF-015 Integración con la DIAN**).
- Se establecieron los parámetros y variables iniciales de lo que el Motor de IA debe considerar como "anomalía".

---

## 3. Observación Directa (Shadowing) 👀

El equipo de desarrollo acompañó durante jornadas laborales a los analistas contables para observar cómo interactúan con sus sistemas actuales y cómo detectan errores manualmente.

### **Resultados Obtenidos:**
- **Usabilidad:** Se evidenció que las interfaces recargadas generan fatiga. Esto derivó en el requisito de crear un **Dashboard** (Panel de Control) limpio, interactivo y con resúmenes gráficos (**RF-009**).
- **Flujo de Trabajo:** Se comprendió que las facturas a menudo llegan en lotes al final de la semana, lo que justificó la inclusión de un módulo de importación masiva (**RF-016 Carga Masiva de Facturas**).

---

## 4. Prototipado (Mockups) 🎨

Se crearon interfaces gráficas preliminares (Wireframes) del sistema "Fisgón" para validar con los usuarios finales si el diseño propuesto resolvía sus problemas de manera intuitiva.

### **Resultados Obtenidos:**
- Los usuarios validaron el flujo de navegación entre módulos.
- Se refinó la forma en la que se presentan las alertas (código de colores visual y notificaciones).
- Se confirmó la utilidad del módulo de **Retroalimentación de la IA (RF-018)**, donde el experto aprueba o descarta la anomalía para entrenar el algoritmo.

---

## 🎯 Conclusión de la Elicitación

La combinación de estas cuatro técnicas (Entrevistas, Análisis Documental, Observación y Prototipado) permitió aterrizar una idea general en un listado sólido de **18 Requisitos Funcionales**, asegurando que el sistema "Fisgón" resuelva los dolores reales de las Pymes colombianas y aporte verdadero valor como un asistente de auditoría inteligente en tiempo real.