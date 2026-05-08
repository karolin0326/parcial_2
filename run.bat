@echo off
echo Iniciando el sistema de Monitoreo de Facturacion con IA...
echo.

:: Verificar si Python esta instalado
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python no esta instalado o no esta agregado al PATH.
    echo Por favor, descarga Python desde https://www.python.org/downloads/
    echo y asegurate de marcar "Add Python to PATH" durante la instalacion.
    pause
    exit /b
)

:: Crear entorno virtual si no existe
if not exist "venv" (
    echo Creando entorno virtual...
    python -m venv venv
)

:: Activar entorno virtual
call venv\Scripts\activate.bat

:: Instalar dependencias
echo Instalando dependencias...
pip install -r src\requirements.txt

:: Correr la aplicacion
echo.
echo =========================================================
echo Servidor iniciando en http://localhost:8000
echo Documentacion API en http://localhost:8000/docs
echo =========================================================
echo.
uvicorn src.main:app --reload
