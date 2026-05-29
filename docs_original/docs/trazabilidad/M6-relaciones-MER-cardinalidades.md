# Matriz 6 — Relaciones MER → Cardinalidades → Reglas de Negocio

**Proyecto:** Monitoreo de Facturación con IA  
**Estudiante:** Karolin Yodith Muñoz Palomeque  
**Materia:** Ingeniería de Software 2  

---

| Relación (MER) | Entidad A | Entidad B | Cardinalidad | Regla de Negocio |
|---|---|---|---|---|
| TIENE | ESTADO_USUARIO | USUARIO | 1:N | Un estado puede aplicar a muchos usuarios; cada usuario tiene un solo estado |
| REGISTRA | USUARIO | FACTURA | 1:N | Un usuario puede registrar muchas facturas; cada factura pertenece a un solo usuario |
| PERTENECE | CLIENTE | FACTURA | 1:N | Un cliente puede tener muchas facturas; cada factura pertenece a un solo cliente |
| TIENE | FACTURA | DETALLE_FACTURA | 1:N | Una factura contiene uno o varios ítems; cada ítem pertenece a una sola factura |
| TIENE | FACTURA | PAGO | 1:N | Una factura puede tener varios pagos parciales o totales |
| UTILIZA | PAGO | METODO_PAGO | N:1 | Muchos pagos pueden usar el mismo método de pago |
| USA | ANALISIS_IA | VERSION_MODELO | N:1 | Varios análisis pueden ejecutarse con la misma versión del modelo |
| ES_DE | ALERTA | TIPO_ALERTA | N:1 | Una alerta pertenece a un tipo de alerta del catálogo |
| ES_DE | ALERTA | ESTADO_ALERTA | N:1 | Una alerta tiene un estado dentro de su ciclo de vida |
| ES_DE | AUDITORIA | TIPO_ACCION | N:1 | Un registro de auditoría referencia el tipo de acción realizada |
| — | AUDITORIA | USUARIO | N:1 | Un usuario puede generar muchos registros de auditoría |

---

### Notas
- La relación entre `FACTURA` y `ANALISIS_IA` es implícita a través del proceso del motor de IA; no hay FK directa en el MER actual entre estas dos tablas.
- La cardinalidad `1:N` entre `FACTURA` y `PAGO` permite registrar pagos parciales hasta completar el total de la factura.

---
*Fuente: elaboración propia*