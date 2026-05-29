from sqlalchemy.orm import Session
from datetime import datetime

from app.models.auditoria import Auditoria, TipoAccion
from app.models.usuario import Usuario

class AuditoriaService:
    
    @staticmethod
    def get_auditorias(db: Session, skip: int = 0, limit: int = 100):
        """Consulta el log completo de auditorías, resolviendo nombres de usuario y acciones."""
        results = db.query(
            Auditoria.id_auditoria,
            Auditoria.fecha,
            Auditoria.detalles,
            TipoAccion.nombre.label('accion_nombre'),
            Usuario.nombre.label('usuario_nombre')
        ).join(
            TipoAccion, TipoAccion.id_tipo_accion == Auditoria.id_tipo_accion
        ).join(
            Usuario, Usuario.id_usuario == Auditoria.id_usuario
        ).order_by(
            Auditoria.fecha.desc()
        ).offset(skip).limit(limit).all()
        
        # Mapeamos a diccionario para fácil serialización
        return [
            {
                "id_auditoria": r.id_auditoria,
                "fecha": r.fecha,
                "detalles": r.detalles,
                "accion": r.accion_nombre,
                "usuario": r.usuario_nombre
            } for r in results
        ]

    @staticmethod
    def registrar_accion(db: Session, id_usuario: int, tipo_accion_nombre: str, detalles: str = None) -> Auditoria:
        """
        Inserta un registro de auditoría en la base de datos de manera automatizada.
        """
        # Buscar el tipo de acción
        tipo_accion = db.query(TipoAccion).filter(TipoAccion.nombre == tipo_accion_nombre).first()
        if not tipo_accion:
            # Tolerancia: Crear dinámicamente si no existe de semilla
            tipo_accion = TipoAccion(nombre=tipo_accion_nombre)
            db.add(tipo_accion)
            db.commit()
            db.refresh(tipo_accion)
            
        db_audit = Auditoria(
            id_tipo_accion=tipo_accion.id_tipo_accion,
            id_usuario=id_usuario,
            fecha=datetime.utcnow(),
            detalles=detalles
        )
        db.add(db_audit)
        db.commit()
        db.refresh(db_audit)
        
        return db_audit
