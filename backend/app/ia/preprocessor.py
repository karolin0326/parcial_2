import numpy as np
import pandas as pd
from typing import List, Tuple, Union

class DataPreprocessor:
    """Preprocesa datos de facturación para alimentar el modelo de Isolation Forest."""
    
    @staticmethod
    def extract_features(cantidad: float, precio_unitario: float, valor_pago: float) -> np.ndarray:
        """
        Extrae un vector de características multidimensional a partir de los datos de facturación.
        Efectúa transformaciones logarítmicas de protección si hay asimetría severa en precios.
        """
        # Creación de variables derivadas
        total_calculado = cantidad * precio_unitario
        desviacion_pago = abs(total_calculado - valor_pago)
        
        # Evitar logaritmos de cero
        log_cantidad = np.log1p(max(0.0, cantidad))
        log_precio = np.log1p(max(0.0, precio_unitario))
        log_total = np.log1p(max(0.0, total_calculado))
        log_desviacion = np.log1p(max(0.0, desviacion_pago))
        
        features = np.array([
            log_cantidad,
            log_precio,
            log_total,
            log_desviacion
        ], dtype=np.float64)
        
        return features.reshape(1, -1)

    @staticmethod
    def preprocess_batch(df_invoices: pd.DataFrame) -> np.ndarray:
        """
        Procesa por lotes un dataframe de facturas para el entrenamiento del modelo.
        Columnas esperadas: ['cantidad', 'precio_unitario', 'valor_pago']
        """
        df = df_invoices.copy()
        df['total_calculado'] = df['cantidad'] * df['precio_unitario']
        df['desviacion_pago'] = (df['total_calculado'] - df['valor_pago']).abs()
        
        # Transformaciones logarítmicas robustas
        df['log_cantidad'] = np.log1p(df['cantidad'].clip(lower=0))
        df['log_precio'] = np.log1p(df['precio_unitario'].clip(lower=0))
        df['log_total'] = np.log1p(df['total_calculado'].clip(lower=0))
        df['log_desviacion'] = np.log1p(df['desviacion_pago'].clip(lower=0))
        
        feature_cols = ['log_cantidad', 'log_precio', 'log_total', 'log_desviacion']
        return df[feature_cols].to_numpy(dtype=np.float64)
