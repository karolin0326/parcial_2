# Matriz 7 — Tablas → MER → PK → FK → Forma Normal

**Proyecto:** Monitoreo de Facturación con IA  
**Estudiante:** Karolin Yodith Muñoz Palomeque  
**Materia:** Ingeniería de Software 2  

---

| Tabla (DDL) | Entidad MER | PK | FK(s) | Forma Normal |
|---|---|---|---|---|
| estado_usuario | EstadoUsuario | id_estado | — | 3FN |
| usuario | Usuario | id_usuario | id_estado → estado_usuario | 3FN |
| cliente | Cliente | id_cliente | — | 3FN |
| factura | Factura | id_factura | id_cliente → cliente, id_usuario → usuario | 3FN |
| detalle_factura | DetalleFactura | id_detalle | id_factura → factura | 3FN |
| metodo_pago | MetodoPago | id_metodo | — | 3FN |
| pago | Pago | id_pago | id_metodo → metodo_pago, id_factura → factura | 3FN |
| tipo_alerta | TipoAlerta | id_tipo | — | 3FN |
| estado_alerta | EstadoAlerta | id_estado | — | 3FN |
| alerta | Alerta | id_alerta | id_tipo → tipo_alerta, id_estado → estado_alerta | 3FN |
| version_modelo | VersionModelo | id_modelo | — | 3FN |
| analisis_ia | AnalisisIA | id_analisis | id_modelo → version_modelo | 3FN |
| tipo_accion | TipoAccion | id_tipo_accion | — | 3FN |
| auditoria | Auditoria | id_auditoria | id_tipo_accion → tipo_accion, id_usuario → usuario | 3FN |

---

### Justificación de la 3FN por tabla

| Tabla | 1FN | 2FN | 3FN | Justificación |
|---|---|---|---|---|
| estado_usuario | ✅ | ✅ | ✅ | Solo tiene PK y nombre; sin dependencias transitivas |
| usuario | ✅ | ✅ | ✅ | correo y nombre dependen únicamente de id_usuario |
| cliente | ✅ | ✅ | ✅ | nit, nombre y telefono dependen solo de id_cliente |
| factura | ✅ | ✅ | ✅ | Todos los atributos dependen de id_factura; `total` fue eliminado por ser calculado |
| detalle_factura | ✅ | ✅ | ✅ | cantidad y precio_unitario dependen de id_detalle |
| metodo_pago | ✅ | ✅ | ✅ | Solo PK y nombre |
| pago | ✅ | ✅ | ✅ | valor y fecha dependen únicamente de id_pago |
| tipo_alerta | ✅ | ✅ | ✅ | Solo PK y nombre |
| estado_alerta | ✅ | ✅ | ✅ | Solo PK y nombre |
| alerta | ✅ | ✅ | ✅ | descripcion depende de id_alerta; tipos y estados en catálogos separados |
| version_modelo | ✅ | ✅ | ✅ | nombre y version dependen de id_modelo |
| analisis_ia | ✅ | ✅ | ✅ | precision depende de id_analisis; versión referenciada por FK |
| tipo_accion | ✅ | ✅ | ✅ | Solo PK y nombre |
| auditoria | ✅ | ✅ | ✅ | fecha depende de id_auditoria; usuario y acción referenciados por FK |

---

### Notas
- El campo `total` fue eliminado de `factura` porque viola la 3FN al ser un valor derivado de `detalle_factura`.
- Todas las tablas de catálogo (`estado_usuario`, `tipo_alerta`, `estado_alerta`, `metodo_pago`, `tipo_accion`) están en 3FN por diseño: solo contienen PK y nombre.

---
*Fuente: elaboración propia*