import pandas as pd
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.models.factura import Factura, DetalleFactura
from app.models.pago import Pago
from app.models.analisis_ia import VersionModelo
from app.ia.anomaly_detector import AnomalyDetector

def train_model_from_db() -> float:
    """Extrae datos de la base de datos, entrena el modelo de IA y registra su nueva versión."""
    db = SessionLocal()
    try:
        # Consulta para unir factura, detalle y pago
        query = db.query(
            DetalleFactura.cantidad,
            DetalleFactura.precio_unitario,
            Pago.valor.label('valor_pago')
        ).join(
            Factura, Factura.id_factura == DetalleFactura.id_factura
        ).outerjoin(
            Pago, Pago.id_factura == Factura.id_factura
        )
        
        results = query.all()
        
        # Estructurar en Dataframe
        data_list = []
        for r in results:
            data_list.append({
                'cantidad': float(r.cantidad),
                'precio_unitario': float(r.precio_unitario),
                'valor_pago': float(r.valor_pago) if r.valor_pago is not None else float(r.cantidad * r.precio_unitario)
            })
            
        df = pd.DataFrame(data_list)
        
        detector = AnomalyDetector()
        precision = detector.train(df)
        
        # Obtener última versión e incrementar
        ultimo_modelo = db.query(VersionModelo).order_by(VersionModelo.id_modelo.desc()).first()
        nueva_version = "v1.0.0"
        if ultimo_modelo:
            partes = ultimo_modelo.version.lstrip('v').split('.')
            if len(partes) == 3:
                nuevo_parche = int(partes[2]) + 1
                nueva_version = f"v{partes[0]}.{partes[1]}.{nuevo_parche}"
                
        version_db = VersionModelo(
            nombre="Bosque de Aislamiento Principal (Isolation Forest)",
            version=nueva_version
        )
        db.add(version_db)
        db.commit()
        
        return precision
        
    finally:
        db.close()

if __name__ == "__main__":
    print("Iniciando entrenamiento del motor de IA...")
    precision = train_model_from_db()
    print(f"Entrenamiento completado exitosamente. Precisión del modelo: {precision}%")
