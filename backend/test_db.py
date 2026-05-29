import pymysql

conn = pymysql.connect(host='localhost', user='root', password='', database='sistema_facturacion')

migrations = [
    # usuario: agregar contrasenia_hash y rol
    ("ALTER TABLE usuario ADD COLUMN contrasenia_hash VARCHAR(255) NOT NULL DEFAULT ''", "usuario.contrasenia_hash"),
    ("ALTER TABLE usuario ADD COLUMN rol VARCHAR(50) NOT NULL DEFAULT 'Contador'", "usuario.rol"),

    # alerta: agregar id_factura y fecha_creacion
    ("ALTER TABLE alerta ADD COLUMN id_factura INT NULL", "alerta.id_factura"),
    ("ALTER TABLE alerta ADD COLUMN fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP", "alerta.fecha_creacion"),
    ("ALTER TABLE alerta ADD CONSTRAINT fk_alerta_factura FOREIGN KEY (id_factura) REFERENCES factura(id_factura) ON DELETE SET NULL", "alerta FK factura"),

    # analisis_ia: agregar id_factura, es_anomalia, score_anomalia
    ("ALTER TABLE analisis_ia ADD COLUMN id_factura INT NOT NULL DEFAULT 0", "analisis_ia.id_factura"),
    ("ALTER TABLE analisis_ia ADD COLUMN es_anomalia TINYINT(1) NOT NULL DEFAULT 0", "analisis_ia.es_anomalia"),
    ("ALTER TABLE analisis_ia ADD COLUMN score_anomalia DECIMAL(5,4) NOT NULL DEFAULT 0.0000", "analisis_ia.score_anomalia"),
    ("ALTER TABLE analisis_ia ADD CONSTRAINT fk_analisia_factura FOREIGN KEY (id_factura) REFERENCES factura(id_factura) ON DELETE CASCADE", "analisis_ia FK factura"),

    # auditoria: agregar detalles
    ("ALTER TABLE auditoria ADD COLUMN detalles TEXT NULL", "auditoria.detalles"),

    # version_modelo: agregar fecha_entrenamiento
    ("ALTER TABLE version_modelo ADD COLUMN fecha_entrenamiento DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP", "version_modelo.fecha_entrenamiento"),
]

with conn.cursor() as cursor:
    for sql, desc in migrations:
        try:
            cursor.execute(sql)
            conn.commit()
            print(f"OK: {desc}")
        except Exception as e:
            if "Duplicate column" in str(e) or "1060" in str(e):
                print(f"YA EXISTE (skip): {desc}")
            elif "Duplicate key" in str(e) or "1061" in str(e):
                print(f"FK YA EXISTE (skip): {desc}")
            else:
                print(f"ERROR en {desc}: {e}")

conn.close()
print("\nMigracion completada.")
