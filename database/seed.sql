USE sistema_facturacion;

-- =========================================
-- SEMILLA: ESTADO USUARIO
-- =========================================
INSERT INTO estado_usuario (id_estado, nombre) VALUES
(1, 'Activo'),
(2, 'Inactivo'),
(3, 'Suspendido')
ON DUPLICATE KEY UPDATE nombre=VALUES(nombre);

-- =========================================
-- SEMILLA: USUARIOS BASE (Contraseña por defecto: 'admin123' -> hash bcrypt)
-- =========================================
INSERT INTO usuario (id_usuario, nombre, correo, contrasenia_hash, rol, id_estado) VALUES
(1, 'Administrador del Sistema', 'admin@empresa.com', '$2b$12$EixZaYVK1fsAH1yp4.7G2O376K/j.dF/XGepH76U8rJ82u1YV4t7.', 'Administrador', 1),
(2, 'Carlos Contador', 'contador@empresa.com', '$2b$12$EixZaYVK1fsAH1yp4.7G2O376K/j.dF/XGepH76U8rJ82u1YV4t7.', 'Contador', 1),
(3, 'Ana Auditora', 'auditor@empresa.com', '$2b$12$EixZaYVK1fsAH1yp4.7G2O376K/j.dF/XGepH76U8rJ82u1YV4t7.', 'Auditor', 1)
ON DUPLICATE KEY UPDATE nombre=VALUES(nombre), correo=VALUES(correo), contrasenia_hash=VALUES(contrasenia_hash), rol=VALUES(rol), id_estado=VALUES(id_estado);

-- =========================================
-- SEMILLA: METODO DE PAGO
-- =========================================
INSERT INTO metodo_pago (id_metodo, nombre) VALUES
(1, 'Efectivo'),
(2, 'Transferencia Bancaria'),
(3, 'Tarjeta de Crédito'),
(4, 'Tarjeta de Débito'),
(5, 'Cheque')
ON DUPLICATE KEY UPDATE nombre=VALUES(nombre);

-- =========================================
-- SEMILLA: TIPO ALERTA
-- =========================================
INSERT INTO tipo_alerta (id_tipo, nombre) VALUES
(1, 'Precio Unitario Fuera de Rango'),
(2, 'Cantidad Inusualmente Alta'),
(3, 'Método de Pago Inconsistente'),
(4, 'Anomalía Detectada por Inteligencia Artificial'),
(5, 'Múltiples Facturas Anuladas por Usuario')
ON DUPLICATE KEY UPDATE nombre=VALUES(nombre);

-- =========================================
-- SEMILLA: ESTADO ALERTA
-- =========================================
INSERT INTO estado_alerta (id_estado, nombre) VALUES
(1, 'Pendiente'),
(2, 'En Revisión'),
(3, 'Resuelta - Fraude Confirmado'),
(4, 'Resuelta - Falso Positivo'),
(5, 'Archivada')
ON DUPLICATE KEY UPDATE nombre=VALUES(nombre);

-- =========================================
-- SEMILLA: TIPO ACCIÓN (AUDITORÍA)
-- =========================================
INSERT INTO tipo_accion (id_tipo_accion, nombre) VALUES
(1, 'Inicio de Sesión'),
(2, 'Cierre de Sesión'),
(3, 'Creación de Usuario'),
(4, 'Actualización de Usuario'),
(5, 'Registro de Cliente'),
(6, 'Registro de Factura'),
(7, 'Anulación de Factura'),
(8, 'Registro de Pago'),
(9, 'Resolución de Alerta'),
(10, 'Entrenamiento de Modelo IA'),
(11, 'Generación de Reporte')
ON DUPLICATE KEY UPDATE nombre=VALUES(nombre);

-- =========================================
-- SEMILLA: VERSIÓN MODELO IA inicial
-- =========================================
INSERT INTO version_modelo (id_modelo, nombre, version) VALUES
(1, 'Bosque de Aislamiento Principal (Isolation Forest)', 'v1.0.0')
ON DUPLICATE KEY UPDATE nombre=VALUES(nombre), version=VALUES(version);

-- =========================================
-- SEMILLA: CLIENTES DE PRUEBA
-- =========================================
INSERT INTO cliente (id_cliente, nombre, nit, telefono) VALUES
(1, 'Distribuidora Global S.A.S.', '900.123.456-1', '601-555-0199'),
(2, 'Tecnología e Innovación Express', '830.987.654-2', '602-555-7788'),
(3, 'Supermercados del Norte', '800.456.789-3', '604-555-1234'),
(4, 'Suministros Industriales Alfa', '910.111.222-4', '605-555-8900')
ON DUPLICATE KEY UPDATE nombre=VALUES(nombre), nit=VALUES(nit), telefono=VALUES(telefono);
