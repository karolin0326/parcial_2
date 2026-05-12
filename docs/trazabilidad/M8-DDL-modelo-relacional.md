# Matriz 8 — DDL → Modelo Relacional → PK → FK → Restricciones

**Proyecto:** Monitoreo de Facturación con IA  
**Estudiante:** Karolin Yodith Muñoz Palomeque  
**Materia:** Ingeniería de Software 2  

---

| Tabla DDL | PK | FK(s) | Restricciones principales |
|---|---|---|---|
| estado_usuario | id_estado (INT, AUTO_INCREMENT) | — | nombre VARCHAR(50) NOT NULL |
| usuario | id_usuario (INT, AUTO_INCREMENT) | id_estado → estado_usuario | correo VARCHAR(150) NOT NULL UNIQUE |
| cliente | id_cliente (INT, AUTO_INCREMENT) | — | nit VARCHAR(20) NOT NULL UNIQUE |
| factura | id_factura (INT, AUTO_INCREMENT) | id_cliente → cliente, id_usuario → usuario | numero_factura NOT NULL, fecha NOT NULL, estado NOT NULL |
| detalle_factura | id_detalle (INT, AUTO_INCREMENT) | id_factura → factura | cantidad DECIMAL(10,2) NOT NULL, precio_unitario DECIMAL(10,2) NOT NULL |
| metodo_pago | id_metodo (INT, AUTO_INCREMENT) | — | nombre VARCHAR(50) NOT NULL |
| pago | id_pago (INT, AUTO_INCREMENT) | id_metodo → metodo_pago, id_factura → factura | valor DECIMAL(10,2) NOT NULL, fecha DATE NOT NULL |
| tipo_alerta | id_tipo (INT, AUTO_INCREMENT) | — | nombre VARCHAR(100) NOT NULL |
| estado_alerta | id_estado (INT, AUTO_INCREMENT) | — | nombre VARCHAR(50) NOT NULL |
| alerta | id_alerta (INT, AUTO_INCREMENT) | id_tipo → tipo_alerta, id_estado → estado_alerta | descripcion VARCHAR(255) NOT NULL |
| version_modelo | id_modelo (INT, AUTO_INCREMENT) | — | nombre VARCHAR(100) NOT NULL, version VARCHAR(20) NOT NULL |
| analisis_ia | id_analisis (INT, AUTO_INCREMENT) | id_modelo → version_modelo | precision DECIMAL(5,2) |
| tipo_accion | id_tipo_accion (INT, AUTO_INCREMENT) | — | nombre VARCHAR(100) NOT NULL |
| auditoria | id_auditoria (INT, AUTO_INCREMENT) | id_tipo_accion → tipo_accion, id_usuario → usuario | fecha DATETIME NOT NULL |

---

### Script DDL de referencia

```sql
-- CATÁLOGOS BASE
CREATE TABLE estado_usuario (
    id_estado INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE metodo_pago (
    id_metodo INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE tipo_alerta (
    id_tipo INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE estado_alerta (
    id_estado INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE tipo_accion (
    id_tipo_accion INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE version_modelo (
    id_modelo INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    version VARCHAR(20) NOT NULL
);

-- ENTIDADES PRINCIPALES
CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(150) NOT NULL UNIQUE,
    id_estado INT NOT NULL,
    FOREIGN KEY (id_estado) REFERENCES estado_usuario(id_estado)
);

CREATE TABLE cliente (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    nit VARCHAR(20) NOT NULL UNIQUE,
    telefono VARCHAR(20)
);

CREATE TABLE factura (
    id_factura INT AUTO_INCREMENT PRIMARY KEY,
    numero_factura VARCHAR(50) NOT NULL,
    fecha DATE NOT NULL,
    estado VARCHAR(30) NOT NULL,
    id_cliente INT NOT NULL,
    id_usuario INT NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

CREATE TABLE detalle_factura (
    id_detalle INT AUTO_INCREMENT PRIMARY KEY,
    cantidad DECIMAL(10,2) NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    id_factura INT NOT NULL,
    FOREIGN KEY (id_factura) REFERENCES factura(id_factura)
);

CREATE TABLE pago (
    id_pago INT AUTO_INCREMENT PRIMARY KEY,
    valor DECIMAL(10,2) NOT NULL,
    fecha DATE NOT NULL,
    id_metodo INT NOT NULL,
    id_factura INT NOT NULL,
    FOREIGN KEY (id_metodo) REFERENCES metodo_pago(id_metodo),
    FOREIGN KEY (id_factura) REFERENCES factura(id_factura)
);

CREATE TABLE alerta (
    id_alerta INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(255) NOT NULL,
    id_tipo INT NOT NULL,
    id_estado INT NOT NULL,
    FOREIGN KEY (id_tipo) REFERENCES tipo_alerta(id_tipo),
    FOREIGN KEY (id_estado) REFERENCES estado_alerta(id_estado)
);

CREATE TABLE analisis_ia (
    id_analisis INT AUTO_INCREMENT PRIMARY KEY,
    precision DECIMAL(5,2),
    id_modelo INT NOT NULL,
    FOREIGN KEY (id_modelo) REFERENCES version_modelo(id_modelo)
);

CREATE TABLE auditoria (
    id_auditoria INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATETIME NOT NULL,
    id_tipo_accion INT NOT NULL,
    id_usuario INT NOT NULL,
    FOREIGN KEY (id_tipo_accion) REFERENCES tipo_accion(id_tipo_accion),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);
```

---

### Notas
- Las tablas de catálogo se crean primero porque las tablas principales dependen de ellas por FK.
- El campo `total` **no existe** en el DDL de `factura` porque viola la 3FN.
- `precision` en `analisis_ia` es nullable porque el análisis puede estar en proceso al momento del registro.

---
*Fuente: elaboración propia*