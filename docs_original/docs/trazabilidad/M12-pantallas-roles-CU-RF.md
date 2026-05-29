# Matriz 12 — Pantallas → Roles → CU → RF

**Proyecto:** Monitoreo de Facturación con IA  
**Estudiante:** Karolin Yodith Muñoz Palomeque  
**Materia:** Ingeniería de Software 2  

---

| Pantalla / Módulo | Rol que accede | CU | RF |
|---|---|---|---|
| Login | Todos los roles | CU00 — Autenticar usuario | RF02 |
| Dashboard | Contador, Auditor | CU01, CU05 | RF01, RF05 |
| Listado de Facturas | Contador | CU01 — Registrar Factura | RF01 |
| Formulario Nueva Factura | Contador | CU01 — Registrar Factura | RF01 |
| Detalle de Factura | Contador, Auditor | CU01 — Ver Factura | RF01 |
| Detalle de Ítem / Factura | Contador | CU01 — Registrar Detalle | RF01 |
| Registro de Pago | Contador | CU06 — Registrar Pago | RF06 |
| Listado de Clientes | Contador | CU10 — Gestionar Clientes | RF10 |
| Formulario Nuevo Cliente | Contador | CU10 — Registrar Cliente | RF10 |
| Análisis IA | Contador, Auditor | CU03 — Analizar Factura | RF03 |
| Resultado de Análisis | Contador, Auditor | CU03 — Ver Resultado | RF03 |
| Listado de Alertas | Auditor | CU05 — Ver Alertas | RF05 |
| Detalle de Alerta | Auditor | CU05 — Gestionar Alerta | RF05 |
| Reportes | Auditor | CU02 — Consultar Reportes | RF04 |
| Auditoría | Administrador | CU11 — Consultar Auditoría | RF11 |
| Gestión de Usuarios | Administrador | CU04 — Gestionar Usuarios | RF02 |
| Configuración | Administrador | CU04, CU03 | RF02, RF03 |

---

## Permisos por rol

| Módulo | Administrador | Auditor | Contador |
|---|---|---|---|
| Dashboard | ✅ | ✅ | ✅ |
| Facturas (ver) | ✅ | ✅ | ✅ |
| Facturas (crear/editar) | ✅ | ❌ | ✅ |
| Pagos | ✅ | ❌ | ✅ |
| Clientes | ✅ | ❌ | ✅ |
| Análisis IA | ✅ | ✅ | ✅ |
| Alertas | ✅ | ✅ | ❌ |
| Reportes | ✅ | ✅ | ❌ |
| Auditoría | ✅ | ❌ | ❌ |
| Usuarios | ✅ | ❌ | ❌ |
| Configuración | ✅ | ❌ | ❌ |

---

### Notas
- El rol **Administrador** tiene acceso total al sistema.
- El rol **Auditor** tiene acceso de solo lectura a facturas y acceso completo a alertas y reportes.
- El rol **Contador** es el usuario operativo principal; registra facturas, clientes y pagos.
- La pantalla de **Login** no requiere rol; es el punto de entrada para todos.

---
*Fuente: elaboración propia*