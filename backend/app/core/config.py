import os
from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "Sistema de Monitoreo de Facturación Contable con IA"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Base de Datos
    DATABASE_URL: str = "mysql+pymysql://root:securepassword@db:3306/sistema_facturacion"
    
    # JWT
    SECRET_KEY: str = "3948bf83e298db39487cbe8d2983d9e830bf9f48abdb923cde8de83fb"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    
    # Entorno
    ENVIRONMENT: str = "development"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

settings = Settings()
