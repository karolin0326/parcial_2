# Diccionario de Datos
## Sistema de Monitoreo Inteligente de Facturación con IA

---

El siguiente diccionario describe la estructura física de la base de datos `sistema_facturacion`, detallando cada tabla, sus campos, tipos de datos, llaves (PK/FK) y restricciones.

### TABLAS PRINCIPALES

| Tabla | Campo | Tipo de Dato | PK | FK | Restricciones / Descripción |
|---|---|---|---|---|---|
| **ESTADO_USUARIO** | id_estado | INT | PK | | AUTO_INCREMENT |
| | nombre | VARCHAR(50) | | | UNIQUE, Estado del usuario (ej: Activo, Inactivo) |
| **USUARIO** | id_usuario | INT | PK | | AUTO_INCREMENT |
| | nombre | VARCHAR(100) | | | NOT NULL |
| | correo | VARCHAR(150) | | | NOT NULL, UNIQUE |
| | id_estado | INT | | FK | NOT NULL, Referencia a ESTADO_USUARIO |
| **CLIENTE** | id_cliente | INT | PK | | AUTO_INCREMENT |
| | nombre | VARCHAR(100) | | | NOT NULL |
| | nit | VARCHAR(20) | | | NOT NULL, UNIQUE |
| | telefono | VARCHAR(20) | | | NULL |
| **FACTURA** | id_factura | INT | PK | | AUTO_INCREMENT |
| | numero_factura | VARCHAR(50) | | | NOT NULL |
| | fecha | DATE | | | NOT NULL |
| | estado | VARCHAR(30) | | | NOT NULL |
| | id_cliente | INT | | FK | NOT NULL, Referencia a CLIENTE |
| | id_usuario | INT | | FK | NOT NULL, Referencia a USUARIO |
| **DETALLE_FACTURA** | id_detalle | INT | PK | | AUTO_INCREMENT |
| | cantidad | DECIMAL(15,2) | | | NOT NULL |
| | precio_unitario | DECIMAL(15,2) | | | NOT NULL |
| | id_factura | INT | | FK | NOT NULL, Referencia a FACTURA |
| **PAGO** | id_pago | INT | PK | | AUTO_INCREMENT |
| | valor | DECIMAL(15,2) | | | NOT NULL |
| | fecha | DATE | | | NOT NULL |
| | id_metodo | INT | | FK | NOT NULL, Referencia a METODO_PAGO |
| | id_factura | INT | | FK | NOT NULL, Referencia a FACTURA |
| **METODO_PAGO** | id_metodo | INT | PK | | AUTO_INCREMENT |
| | nombre | VARCHAR(50) | | | NOT NULL |
| **ANALISIS_IA** | id_analisis | INT | PK | | AUTO_INCREMENT |
| | id_modelo | INT | | FK | NOT NULL, Referencia a VERSION_MODELO |
| | precision | DECIMAL(5,2) | | | NOT NULL, Ej: 95.50 |
| **VERSION_MODELO** | id_modelo | INT | PK | | AUTO_INCREMENT |
| | nombre | VARCHAR(100) | | | NOT NULL |
| | version | VARCHAR(20) | | | NOT NULL |
| **TIPO_ALERTA** | id_tipo | INT | PK | | AUTO_INCREMENT |
| | nombre | VARCHAR(100) | | | NOT NULL |
| **ESTADO_ALERTA** | id_estado | INT | PK | | AUTO_INCREMENT |
| | nombre | VARCHAR(50) | | | NOT NULL |
| **ALERTA** | id_alerta | INT | PK | | AUTO_INCREMENT |
| | descripcion | VARCHAR(255) | | | NOT NULL |
| | id_tipo | INT | | FK | NOT NULL, Referencia a TIPO_ALERTA |
| | id_estado | INT | | FK | NOT NULL, Referencia a ESTADO_ALERTA |
| **AUDITORIA** | id_auditoria | INT | PK | | AUTO_INCREMENT |
| | id_tipo_accion | INT | | FK | NOT NULL, Referencia a TIPO_ACCION |
| | fecha | DATETIME | | | NOT NULL |
| | id_usuario | INT | | FK | NOT NULL, Referencia a USUARIO |
| **TIPO_ACCION** | id_tipo_accion | INT | PK | | AUTO_INCREMENT |
| | nombre | VARCHAR(100) | | | NOT NULL |
| **TALLER** | id_taller | INT | PK | | AUTO_INCREMENT |
| | nombre | VARCHAR(100) | | | NOT NULL |
| | direccion | VARCHAR(150) | | | NULL |


|