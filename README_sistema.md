# Sistema de Monitoreo de Facturación Contable con IA

Sistema de monitoreo web inteligente diseñado para detectar en tiempo real anomalías, errores e irregularidades en datos de facturación de pequeñas y medianas empresas mediante técnicas avanzadas de Inteligencia Artificial (Isolation Forest).

## 🚀 Arquitectura y Tecnologías

El sistema implementa una **Arquitectura en Capas (Layered Architecture)** alineada con el patrón **Model-View-Controller (MVC)** para garantizar un alto grado de desacoplamiento, mantenibilidad y escalabilidad.

- **Backend:** Python 3.10+ utilizando **FastAPI** para una API REST de alto rendimiento, asíncrona, robusta y autocompilada con OpenAPI (Swagger).
- **Inteligencia Artificial:** **scikit-learn** utilizando el modelo **Isolation Forest** para evaluar de manera multidimensional y no supervisada anomalías en transacciones de facturación.
- **Frontend:** **React + Vite** con **TypeScript** utilizando **Zustand** para la gestión global y reactiva del estado, y **Vanilla CSS** con diseño premium adaptable (Dark Mode, HSL, Glassmorphism).
- **Base de Datos:** **MySQL 8.0** estructurada bajo la **Tercera Forma Normal (3FN)** para garantizar la consistencia, integridad referencial y erradicación de redundancias.
- **Contenedores:** **Docker** y **Docker Compose** para un aprovisionamiento local consistente de todos los servicios.
- **Autenticación:** Tokens **JWT (JSON Web Tokens)** seguros con hashing bcrypt de contraseñas.

---

## 📂 Estructura del Proyecto

```text
sistema-facturacion-ia/
├── backend/                  # API FastAPI y Motor de IA
│   ├── app/
│   │   ├── api/              # Endpoints REST (v1)
│   │   ├── core/             # Seguridad, JWT y Configuración
│   │   ├── db/               # Conexión ORM e inicialización
│   │   ├── models/           # Modelos de SQLAlchemy (BD 3FN)
│   │   ├── schemas/          # Esquemas Pydantic
│   │   ├── services/         # Servicios de Lógica de Negocio
│   │   ├── ia/               # Detector de anomalías (scikit-learn)
│   │   └── main.py           # Inicializador de FastAPI
│   ├── tests/                # Pruebas unitarias y de integración
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/                 # Interfaz React con TypeScript
│   ├── src/
│   │   ├── api/              # Conexión REST Axios
│   │   ├── components/       # Componentes reusables y de negocio
│   │   ├── pages/            # Vistas principales de módulos
│   │   ├── store/            # Tiendas Zustand (estado global)
│   │   ├── hooks/            # Hooks de React
│   │   ├── types/            # Interfaces TypeScript
│   │   ├── utils/            # Formateadores y validadores
│   │   ├── router/           # Enrutador protegido por rol
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── Dockerfile
│   └── package.json
├── database/                 # Diseños de Base de Datos SQL
│   ├── schema.sql            # Estructura de tablas (3FN)
│   ├── seed.sql              # Semilla de datos maestros
│   └── migrations/
└── docker-compose.yml        # Orquestador multi-contenedor
```

---

## 🛠️ Configuración e Instalación Rápida

### Requisitos Previos
- **Docker** y **Docker Compose** instalados en el sistema.
- Opcional para desarrollo local: **Python 3.10+** y **Node.js 18+**.

### Paso 1: Configurar Variables de Entorno
Copia el archivo de variables de entorno de ejemplo en la raíz del backend:

```bash
cp backend/.env.example backend/.env
```

Ajusta los valores en `backend/.env` según sea necesario:
- `DATABASE_URL`: `mysql+pymysql://root:securepassword@db:3306/sistema_facturacion` (Para Docker)
- `SECRET_KEY`: Una cadena aleatoria segura para firmar tokens JWT.

### Paso 2: Despliegue con Docker Compose
Desde la raíz del proyecto, ejecuta el siguiente comando para compilar y levantar los contenedores de la base de datos MySQL, el Backend de FastAPI y el Frontend de React:

```bash
docker-compose up --build
```

Una vez levantados los servicios:
- **Frontend (React):** Accede a [http://localhost:5173](http://localhost:5173)
- **Backend (FastAPI Docs):** Accede a [http://localhost:8000/docs](http://localhost:8000/docs)
- **Base de Datos (MySQL):** Escuchando en el puerto `3306`

---

## 🔒 Roles y Reglas de Negocio Implementadas

1. **Roles Soportados (RF02):**
   - **Administrador:** Acceso total, gestión de usuarios, auditorías del sistema y configuración.
   - **Contador:** Registro y edición de clientes, facturas y pagos. Vista de reportes y KPI de facturación.
   - **Auditor:** Visualización de alertas de IA, histórico de auditorías, reportes analíticos y auditoría de anomalías.

2. **Detección Automática de Anomalías (RF03 / RF05):**
   - Cada vez que se registra una factura, el motor de IA (`IsolationForest`) evalúa los atributos. Si la transacción es sospechosa (ej. discrepancia severa de precios, combinaciones inusuales de cantidad y métodos de pago), se genera una **Alerta Automática** en estado `Pendiente` y se registra en el log.
   - **RF01:** No se permiten números de factura duplicados.

3. **Reportes y Auditoría (RF04 / RF06):**
   - Generación automática de reportes de anomalías y auditoría exhaustiva en base de datos de cada acción del usuario.
