# Matriz 5 — Entidades → Arquetipos → RF → Reglas de Negocio

**Proyecto:** Monitoreo de Facturación con IA  
**Estudiante:** Karolin Yodith Muñoz Palomeque  
**Materia:** Ingeniería de Software 2  

---

| Entidad (tabla MER) | Arquetipo | RF | Regla de Negocio |
|---|---|---|---|
| estado_usuario | EstadoUsuario | RF02 | El estado controla si el usuario puede acceder al sistema |
| usuario | Usuario | RF02 | El correo del usuario debe ser único (UNIQUE) |
| cliente | Cliente | RF10 | El NIT del cliente debe ser único (UNIQUE) |
| factura | Factura | RF01 | El número de factura debe ser único por cliente |
| detalle_factura | DetalleFactura | RF01 | El subtotal = cantidad × precio_unitario (calculado, no almacenado) |
| metodo_pago | MetodoPago | RF06 | Solo se permiten métodos de pago registrados en el catálogo |
| pago | Pago | RF06 | Un pago debe referenciar una factura existente en el sistema |
| tipo_alerta | TipoAlerta | RF05 | Las alertas solo pueden clasificarse con tipos del catálogo |
| estado_alerta | EstadoAlerta | RF05 | Ciclo de vida de alerta: Pendiente → Revisada → Cerrada |
| alerta | Alerta | RF05 | Se genera automáticamente cuando el motor de IA detecta una anomalía |
| version_modelo | VersionModelo | RF03 | Toda versión del modelo de IA debe quedar registrada antes de usarse |
| analisis_ia | AnalisisIA | RF03 | Cada análisis debe referenciar la versión del modelo que lo ejecutó |
| tipo_accion | TipoAccion | RF11 | Las acciones auditables deben estar registradas en el catálogo |
| auditoria | Auditoria | RF11 | Toda acción de un usuario queda registrada con fecha y tipo de acción |

---

### Notas
- `total` **no es una entidad** del MER. Se calcula como `SUM(cantidad × precio_unitario)` desde `detalle_factura`.
- Las tablas de catálogo (`estado_usuario`, `tipo_alerta`, `estado_alerta`, `metodo_pago`, `tipo_accion`) garantizan integridad referencial y evitan strings libres en las tablas principales.

---
*Fuente: elaboración propia*