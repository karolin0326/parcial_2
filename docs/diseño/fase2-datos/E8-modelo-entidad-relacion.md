# Modelo Entidad Relación (MER)
## Sistema de Monitoreo Inteligente de Facturación con IA

---

# ¿Qué es un Modelo Entidad Relación?

El Modelo Entidad Relación (MER) es una representación conceptual de la base de datos que permite identificar las entidades principales del sistema, sus atributos y las relaciones existentes entre ellas.

Este modelo sirve como base para el diseño del modelo relacional y posteriormente para la implementación física de la base de datos en MySQL/MariaDB.

---

# Diagrama MER (Corregido)

A continuación se presenta el Modelo Entidad Relación utilizando la sintaxis de Mermaid para una visualización clara y estructurada de las entidades, atributos, claves primarias (PK), claves foráneas (FK) y sus cardinalidades.

```mermaid
erDiagram
    %% Relaciones y Cardinalidades
    ESTADO_USUARIO ||--o{ USUARIO : "TIENE"
    USUARIO ||--o{ FACTURA : "REGISTRA"
    CLIENTE ||--o{ FACTURA : "PERTENECE"
    FACTURA ||--o{ DETALLE_FACTURA : "TIENE"
    FACTURA ||--o{ PAGO : "TIENE"
    METODO_PAGO ||--o{ PAGO : "UTILIZA"
    USUARIO ||--o{ AUDITORIA : "REGISTRA"
    TIPO_ACCION ||--o{ AUDITORIA : "ES_DE"
    TIPO_ALERTA ||--o{ ALERTA : "ES_DE"
    ESTADO_ALERTA ||--o{ ALERTA : "ES_DE"
    VERSION_MODELO ||--o{ ANALISIS_IA : "USA"

    %% Definición de Entidades y Atributos
    ESTADO_USUARIO {
        int id_estado PK
        varchar nombre
    }
    
    USUARIO {
        int id_usuario PK
        varchar nombre
        varchar correo
        int id_estado FK
    }
    
    CLIENTE {
        int id_cliente PK
        varchar nombre
        varchar nit UK "UNIQUE"
        varchar telefono
    }
    
    FACTURA {
        int id_factura PK
        varchar numero_factura
        date fecha
        varchar estado
        int id_cliente FK
        int id_usuario FK
    }
    
    DETALLE_FACTURA {
        int id_detalle PK
        decimal cantidad
        decimal precio_unitario
        int id_factura FK
    }
    
    METODO_PAGO {
        int id_metodo PK
        varchar nombre
    }
    
    PAGO {
        int id_pago PK
        decimal valor
        date fecha
        int id_metodo FK
        int id_factura FK
    }
    
    TIPO_ALERTA {
        int id_tipo PK
        varchar nombre
    }
    
    ESTADO_ALERTA {
        int id_estado PK
        varchar nombre
    }
    
    ALERTA {
        int id_alerta PK
        varchar descripcion
        int id_tipo FK
        int id_estado FK
    }
    
    VERSION_MODELO {
        int id_modelo PK
        varchar nombre
        varchar version
    }
    
    ANALISIS_IA {
        int id_analisis PK
        decimal precision
        int id_modelo FK
    }
    
    TIPO_ACCION {
        int id_tipo_accion PK
        varchar nombre
    }
    
    AUDITORIA {
        int id_auditoria PK
        datetime fecha
        int id_tipo_accion FK
        int id_usuario FK
    }
```

---

## Reglas de Negocio Importantes

Basado en el diseño corregido, se deben tener en cuenta las siguientes lógicas para la aplicación:

1. **El campo total de FACTURA fue eliminado**: Se calcula sumando los subtotales de la tabla `DETALLE_FACTURA`.
2. **Cálculo del subtotal**: El subtotal de cada ítem se calcula como `cantidad * precio_unitario` directamente en la aplicación, no se almacena en la base de datos.
3. **Cambio de estado de la factura**: El estado de la factura puede cambiar automáticamente cuando se registra un pago (por ejemplo: pasar de "Pendiente" a "Pagada") o puede manejarse manualmente según la lógica del sistema.
4. **Restricción de Cliente**: El campo `nit` en la tabla `CLIENTE` tiene restricción `UNIQUE` (no pueden existir dos clientes con el mismo NIT).