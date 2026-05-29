-- =========================================
-- MIGRACIÓN 001: INICIALIZACIÓN
-- =========================================
USE sistema_facturacion;

CREATE TABLE IF NOT EXISTS estado_usuario (
    id_estado INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(150) NOT NULL UNIQUE,
    contrasenia_hash VARCHAR(255) NOT NULL,
    rol VARCHAR(50) NOT NULL DEFAULT 'Contador',
    id_estado INT NOT NULL,
    FOREIGN KEY (id_estado) REFERENCES estado_usuario(id_estado)
);

CREATE TABLE IF NOT EXISTS cliente (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    nit VARCHAR(20) NOT NULL UNIQUE,
    telefono VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS factura (
    id_factura INT AUTO_INCREMENT PRIMARY KEY,
    numero_factura VARCHAR(50) NOT NULL UNIQUE,
    fecha DATE NOT NULL,
    estado VARCHAR(30) NOT NULL,
    id_cliente INT NOT NULL,
    id_usuario INT NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

CREATE TABLE IF NOT EXISTS detalle_factura (
    id_detalle INT AUTO_INCREMENT PRIMARY KEY,
    cantidad DECIMAL(10,2) NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    id_factura INT NOT NULL,
    FOREIGN KEY (id_factura) REFERENCES factura(id_factura) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS metodo_pago (
    id_metodo INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS pago (
    id_pago INT AUTO_INCREMENT PRIMARY KEY,
    valor DECIMAL(10,2) NOT NULL,
    fecha DATE NOT NULL,
    id_metodo INT NOT NULL,
    id_factura INT NOT NULL,
    FOREIGN KEY (id_metodo) REFERENCES metodo_pago(id_metodo),
    FOREIGN KEY (id_factura) REFERENCES factura(id_factura) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tipo_alerta (
    id_tipo INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS estado_alerta (
    id_estado INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS alerta (
    id_alerta INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(255) NOT NULL,
    id_tipo INT NOT NULL,
    id_estado INT NOT NULL,
    id_factura INT NULL,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_tipo) REFERENCES tipo_alerta(id_tipo),
    FOREIGN KEY (id_estado) REFERENCES estado_alerta(id_estado),
    FOREIGN KEY (id_factura) REFERENCES factura(id_factura) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS version_modelo (
    id_modelo INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    version VARCHAR(20) NOT NULL UNIQUE,
    fecha_entrenamiento DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS analisis_ia (
    id_analisis INT AUTO_INCREMENT PRIMARY KEY,
    id_modelo INT NOT NULL,
    id_factura INT NOT NULL,
    es_anomalia BOOLEAN NOT NULL DEFAULT FALSE,
    score_anomalia DECIMAL(5,4) NOT NULL DEFAULT 0.0000,
    precision_modelo DECIMAL(5,2) NULL,
    FOREIGN KEY (id_modelo) REFERENCES version_modelo(id_modelo),
    FOREIGN KEY (id_factura) REFERENCES factura(id_factura) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tipo_accion (
    id_tipo_accion INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS auditoria (
    id_auditoria INT AUTO_INCREMENT PRIMARY KEY,
    id_tipo_accion INT NOT NULL,
    fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    id_usuario INT NOT NULL,
    detalles TEXT NULL,
    FOREIGN KEY (id_tipo_accion) REFERENCES tipo_accion(id_tipo_accion),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);
