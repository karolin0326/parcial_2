# 📘 E12 - Diagrama de Clases

# Sistema Inteligente de Monitoreo de Facturación con IA

---

# 📌 Descripción

El diagrama de clases representa la estructura estática de la base de datos y la capa de modelos (ORM) del sistema de facturación.
Muestra las entidades, sus atributos y las relaciones (Llaves Foráneas) entre maestras (Cliente, Usuario) y transaccionales (Factura, Pago, AnalisisIA, etc.).

---

# 📊 Diagrama de Clases

```mermaid
classDiagram

    class Usuario {
        +int id_usuario
        +String nombre
        +String correo
        +String contrasenia
        +String rol
        +int id_estado
    }

    class Cliente {
        +int id_cliente
        +String nombre
        +String nit
        +String correo
        +String telefono
        +String direccion
    }

    class Factura {
        +int id_factura
        +String numero_factura
        +Date fecha
        +String estado
        +int id_cliente
        +int id_usuario
    }

    class DetalleFactura {
        +int id_detalle
        +float cantidad
        +float precio_unitario
        +int id_factura
    }

    class Pago {
        +int id_pago
        +float monto
        +Date fecha_pago
        +String metodo_pago
        +int id_factura
    }

    class VersionModelo {
        +int id_modelo
        +String nombre_modelo
        +Date fecha_entrenamiento
        +JSON metricas
    }

    class AnalisisIA {
        +int id_analisis
        +boolean es_anomalia
        +float score_anomalia
        +float precision_modelo
        +int id_modelo
        +int id_factura
    }

    class Alerta {
        +int id_alerta
        +Date fecha
        +String tipo_alerta
        +String descripcion
        +String estado
        +int id_factura
    }

    class Auditoria {
        +int id_auditoria
        +int id_usuario
        +String accion
        +Date fecha
        +String detalles
    }

    %% Relaciones
    Cliente "1" -- "*" Factura : Emite
    Usuario "1" -- "*" Factura : Registra
    Factura "1" *-- "*" DetalleFactura : Contiene
    Factura "1" -- "*" Pago : Recibe
    Factura "1" -- "1" AnalisisIA : Analizada por
    VersionModelo "1" -- "*" AnalisisIA : Genera
    Factura "1" -- "*" Alerta : Dispara
    Usuario "1" -- "*" Auditoria : Realiza
```

---

# 📋 Relaciones Principales (Llaves Foráneas)

- **Factura -> Cliente:** Relación 1 a muchos. Un cliente puede tener muchas facturas. (`id_cliente` en Factura).
- **Factura -> Usuario:** Relación 1 a muchos. Un usuario (contador) registra muchas facturas. (`id_usuario` en Factura).
- **DetalleFactura -> Factura:** Relación de composición 1 a muchos. Una factura tiene varios items (detalles).
- **AnalisisIA -> Factura:** Relación 1 a 1. Cada factura se evalúa en el motor de Isolation Forest.
- **Auditoria -> Usuario:** Cada registro en la bitácora de auditoría apunta al usuario que ejecutó la acción.