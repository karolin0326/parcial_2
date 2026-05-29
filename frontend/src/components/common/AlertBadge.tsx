import React from 'react'

interface AlertBadgeProps {
  status: string | number
}

export const AlertBadge: React.FC<AlertBadgeProps> = ({ status }) => {
  const getBadgeStyle = () => {
    const s = String(status).toLowerCase()
    if (s === '1' || s === 'pendiente') {
      return {
        className: 'badge badge-danger',
        label: 'Pendiente'
      }
    } else if (s === '2' || s === 'en revision' || s === 'en revisión') {
      return {
        className: 'badge badge-warning',
        label: 'En Revisión'
      }
    } else {
      return {
        className: 'badge badge-success',
        label: 'Resuelta'
      }
    }
  }

  const { className, label } = getBadgeStyle()

  return <span className={className}>{label}</span>
}
export default AlertBadge
