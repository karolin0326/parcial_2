import React from 'react';
import { FacturaEstado } from '../../types/factura.types';
import { AlertaEstado } from '../../types/alerta.types';

interface Props {
  estado: FacturaEstado | AlertaEstado;
}

export const StatusBadge: React.FC<Props> = ({ estado }) => {
  const styles: Record<string, string> = {
    pendiente: 'bg-[var(--warning-light)] text-[var(--warning)] border-[var(--warning)]',
    validada: 'bg-[var(--success-light)] text-[var(--success)] border-[var(--success)]',
    anomalia: 'bg-[var(--danger-light)] text-[var(--danger)] border-[var(--danger)]',
    resuelta: 'bg-blue-100 text-blue-800 border-blue-400',
    revisada: 'bg-gray-100 text-gray-800 border-gray-400',
    anulada: 'bg-gray-200 text-gray-600 border-gray-300'
  };

  const className = `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[estado] || ''}`;

  return <span className={className}>{estado}</span>;
};
