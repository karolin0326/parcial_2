import React from 'react'

export const LoadingSpinner: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem',
      flexDirection: 'column',
      gap: '1rem'
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '3px solid rgba(255, 255, 255, 0.05)',
        borderTopColor: 'var(--primary)',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
        Cargando datos del servidor...
      </span>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
export default LoadingSpinner
