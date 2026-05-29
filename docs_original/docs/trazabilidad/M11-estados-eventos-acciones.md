# Matriz 11 — Estados → Eventos → Acciones → RF

**Proyecto:** Monitoreo de Facturación con IA  
**Estudiante:** Karolin Yodith Muñoz Palomeque  
**Materia:** Ingeniería de Software 2  

---

## Estados de la Factura

| Estado | Evento que lo genera | Acción del sistema | RF |
|---|---|---|---|
| Pendiente | Factura creada por el usuario contable | Guardar en BD; asignar número de factura; registrar en auditoría | RF01 |
| En Análisis | Motor de IA inicia proceso de revisión | Llamar `AnalisisIA.analizar()`; asociar versión del modelo activo | RF03 |
| Con Anomalía | IA detecta irregularidad o patrón inusual | Generar alerta automática; cambiar estado; notificar al usuario | RF05 |
| Validada | Usuario contable confirma que la factura es correcta | Finalizar proceso de análisis; registrar confirmación en auditoría | RF04, RF11 |
| Pagada | Se registra un pago que cubre el total de la factura | Actualizar estado; generar comprobante de pago | RF06 |
| Anulada | Usuario o sistema anula la factura | Registrar nota de crédito; registrar acción en auditoría | RF01, RF11 |

---

## Estados de la Alerta

| Estado | Evento que lo genera | Acción del sistema | RF |
|---|---|---|---|
| Pendiente | Alerta creada automáticamente por el motor de IA | Guardar alerta en BD; notificar al usuario contable | RF05 |
| Revisada | Usuario contable abre y revisa la alerta | Registrar fecha de revisión; cambiar estado | RF05 |
| Cerrada | Usuario confirma que la alerta fue atendida | Cerrar alerta; registrar cierre en auditoría | RF05, RF11 |

---

## Estados del Usuario

| Estado | Evento que lo genera | Acción del sistema | RF |
|---|---|---|---|
| Activo | Usuario creado o reactivado por el administrador | Permitir acceso al sistema | RF02 |
| Inactivo | Administrador desactiva el usuario | Bloquear acceso; mantener historial | RF02 |

---

### Notas
- Los estados de `factura` siguen el flujo definido en el Diagrama de Estados (Entregable 14).
- Una factura en estado `Anulada` no puede volver a estados anteriores.
- Una alerta en estado `Cerrada` no puede reabrirse; se debe generar una nueva alerta si el problema persiste.

---
*Fuente: elaboración propia*