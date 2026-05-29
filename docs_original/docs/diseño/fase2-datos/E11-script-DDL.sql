-- =========================================
-- CREACIÓN DE BASE DE DATOS
-- =========================================
CREATE DATABASE sistema_facturacion;
USE sistema_facturacion;

-- =========================================
-- TABLAS DE USUARIO
-- =========================================
CREATE TABLE estado_usuario (
    id_estado INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(150) NOT NULL UNIQUE,
    id_estado INT NOT NULL,
    FOREIGN KEY (id_estado) REFERENCES estado_usuario(id_estado)
);

-- =========================================
-- TABLAS DE CLIENTE
-- =========================================
CREATE TABLE cliente (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    nit VARCHAR(20) NOT NULL UNIQUE,
    telefono VARCHAR(20)
);

-- =========================================
-- FACTURACIÓN
-- =========================================
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

-- =========================================
-- PAGOS
-- =========================================
CREATE TABLE metodo_pago (
    id_metodo INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
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

-- =========================================
-- ALERTAS
-- =========================================
CREATE TABLE tipo_alerta (
    id_tipo INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE estado_alerta (
    id_estado INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE alerta (
    id_alerta INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(255) NOT NULL,
    id_tipo INT NOT NULL,
    id_estado INT NOT NULL,
    FOREIGN KEY (id_tipo) REFERENCES tipo_alerta(id_tipo),
    FOREIGN KEY (id_estado) REFERENCES estado_alerta(id_estado)
);

-- =========================================
-- INTELIGENCIA ARTIFICIAL
-- =========================================
CREATE TABLE version_modelo (
    id_modelo INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    version VARCHAR(20) NOT NULL
);

CREATE TABLE analisis_ia (
    id_analisis INT AUTO_INCREMENT PRIMARY KEY,
    id_modelo INT NOT NULL,
    precision_modelo DECIMAL(5,2),
    FOREIGN KEY (id_modelo) REFERENCES version_modelo(id_modelo)
);

-- =========================================
-- AUDITORÍA
-- =========================================
CREATE TABLE tipo_accion (
    id_tipo_accion INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE auditoria (
    id_auditoria INT AUTO_INCREMENT PRIMARY KEY,
    id_tipo_accion INT NOT NULL,
    fecha DATETIME NOT NULL,
    id_usuario INT NOT NULL,
    FOREIGN KEY (id_tipo_accion) REFERENCES tipo_accion(id_tipo_accion),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);