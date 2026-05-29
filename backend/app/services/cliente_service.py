from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from app.models.cliente import Cliente
from app.schemas.cliente import ClienteCreate, ClienteUpdate
from app.services.auditoria_service import AuditoriaService

class ClienteService:
    
    @staticmethod
    def get_clientes(db: Session, skip: int = 0, limit: int = 100):
        return db.query(Cliente).offset(skip).limit(limit).all()

    @staticmethod
    def get_cliente(db: Session, cliente_id: int):
        return db.query(Cliente).filter(Cliente.id_cliente == cliente_id).first()

    @staticmethod
    def create_cliente(db: Session, cliente_in: ClienteCreate, id_usuario_audit: int) -> Cliente:
        # Validar NIT único
        cliente_existente = db.query(Cliente).filter(Cliente.nit == cliente_in.nit).first()
        if cliente_existente:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"El cliente con NIT '{cliente_in.nit}' ya se encuentra registrado."
            )
            
        db_cliente = Cliente(**cliente_in.model_dump())
        db.add(db_cliente)
        db.commit()
        db.refresh(db_cliente)
        
        # Registrar en auditoría
        AuditoriaService.registrar_accion(
            db=db,
            id_usuario=id_usuario_audit,
            tipo_accion_nombre="Registro de Cliente",
            detalles=f"Cliente creado: {db_cliente.nombre} (NIT: {db_cliente.nit})"
        )
        
        return db_cliente

    @staticmethod
    def update_cliente(db: Session, cliente_id: int, cliente_in: ClienteUpdate, id_usuario_audit: int) -> Cliente:
        db_cliente = db.query(Cliente).filter(Cliente.id_cliente == cliente_id).first()
        if not db_cliente:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Cliente no encontrado"
            )
            
        for key, val in cliente_in.model_dump(exclude_unset=True).items():
            setattr(db_cliente, key, val)
            
        db.commit()
        db.refresh(db_cliente)
        
        # Registrar en auditoría
        AuditoriaService.registrar_accion(
            db=db,
            id_usuario=id_usuario_audit,
            tipo_accion_nombre="Modificar Cliente",
            detalles=f"Cliente actualizado: {db_cliente.nombre}"
        )
        
        return db_cliente

    @staticmethod
    def delete_cliente(db: Session, cliente_id: int, id_usuario_audit: int) -> Cliente:
        db_cliente = db.query(Cliente).filter(Cliente.id_cliente == cliente_id).first()
        if not db_cliente:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Cliente no encontrado"
            )
            
        nombre = db_cliente.nombre
        db.delete(db_cliente)
        db.commit()
        
        # Registrar en auditoría
        AuditoriaService.registrar_accion(
            db=db,
            id_usuario=id_usuario_audit,
            tipo_accion_nombre="Modificar Cliente",
            detalles=f"Cliente eliminado: {nombre}"
        )
        
        return db_cliente
