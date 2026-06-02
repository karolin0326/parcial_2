import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import { ShieldCheck, Zap, BarChart3, Lock, AlertTriangle } from 'lucide-react';

export const LoginPage = () => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const formData = new URLSearchParams();
      formData.append('username', correo);
      formData.append('password', password);

      const { data } = await axiosClient.post('/auth/login', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });

      const usuarioInfo = {
        id_usuario: data.id_usuario || 0,
        nombre: data.nombre,
        correo: data.correo,
        rol: data.rol.toLowerCase(),
        id_estado: 1
      };

      setAuth(usuarioInfo, data.access_token);
      navigate('/dashboard');
    } catch {
      setError('Correo o contraseña incorrectos. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: <BarChart3 size={18} />, color: 'var(--primary)', bg: 'var(--primary-dim)', text: 'Dashboard en tiempo real con KPIs contables' },
    { icon: <Zap size={18} />, color: 'var(--cyan)', bg: 'var(--cyan-dim)', text: 'Detección de anomalías con Isolation Forest IA' },
    { icon: <ShieldCheck size={18} />, color: 'var(--success)', bg: 'var(--success-bg)', text: 'Auditoría completa e inmutable de operaciones' },
  ];

  return (
    <div className="login-page">
      {/* Orbs decorativos */}
      <div className="login-bg-orb" style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(124,110,250,0.15) 0%, transparent 70%)', top: '-100px', left: '-100px' }} />
      <div className="login-bg-orb" style={{ width: 400, height: 400, background: 'radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%)', bottom: '-80px', left: '30%' }} />

      {/* Panel izquierdo — Branding */}
      <div className="login-left">
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.9rem', background: 'var(--primary-dim)', border: '1px solid rgba(124,110,250,0.25)', borderRadius: '99px', marginBottom: '1.5rem' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--primary)', boxShadow: '0 0 8px var(--primary)' }} />
            <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600, letterSpacing: '0.05em' }}>SISTEMA ACTIVO</span>
          </div>
        </div>

        <div className="login-brand">SysIA</div>
        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-secondary)', letterSpacing: '-0.01em', marginBottom: '0.75rem', lineHeight: 1.3 }}>
          Monitoreo Inteligente<br />de Facturación Contable
        </div>
        <p className="login-tagline">
          Detecta anomalías, gestiona facturas y mantiene
          una auditoría completa con el poder de la Inteligencia Artificial.
        </p>

        <div className="login-features">
          {features.map((f, i) => (
            <div key={i} className="login-feature-item">
              <div className="login-feature-icon" style={{ background: f.bg, color: f.color }}>
                {f.icon}
              </div>
              <span>{f.text}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border)', display: 'flex', gap: '2rem' }}>
          {[['MySQL', 'Base de Datos'], ['FastAPI', 'Backend'], ['React', 'Frontend']].map(([tech, label]) => (
            <div key={tech}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>{tech}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Panel derecho — Formulario */}
      <div className="login-right">
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
            <div style={{ width: 36, height: 36, borderRadius: '9px', background: 'linear-gradient(135deg, var(--primary), var(--cyan))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Lock size={18} color="white" />
            </div>
            <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>Acceso Seguro</span>
          </div>
          <div className="login-form-title">Bienvenido de vuelta</div>
          <div className="login-form-sub">Inicia sesión para acceder al sistema</div>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label className="login-form-label">Correo Electrónico</label>
            <input
              id="login-email"
              type="email"
              placeholder="admin@empresa.com"
              className="input-premium"
              value={correo}
              onChange={e => setCorreo(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label className="login-form-label">Contraseña</label>
            <input
              id="login-password"
              type="password"
              placeholder="••••••••"
              className="input-premium"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="login-error">
              <AlertTriangle size={16} />
              {error}
            </div>
          )}

          <button
            id="btn-login"
            type="submit"
            className="btn-premium btn-primary-glow"
            style={{ marginTop: '0.5rem', padding: '0.9rem', fontSize: '0.95rem', width: '100%' }}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }} />
                Verificando...
              </>
            ) : 'Iniciar Sesión'}
          </button>
        </form>

        <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(124,110,250,0.06)', border: '1px solid rgba(124,110,250,0.15)', borderRadius: '10px' }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.6rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Credenciales de prueba</div>
          {[
            { email: 'admin@empresa.com', rol: 'Administrador', color: 'var(--primary)' },
            { email: 'contador@empresa.com', rol: 'Contador', color: 'var(--cyan)' },
          ].map(u => (
            <div key={u.email} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>{u.email}</span>
              <span style={{ fontSize: '0.7rem', color: u.color, fontWeight: 600 }}>{u.rol}</span>
            </div>
          ))}
          <div style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Contraseña: <span style={{ color: 'var(--text-secondary)', fontFamily: 'monospace' }}>admin123</span>
          </div>
        </div>

        <div style={{ marginTop: 'auto', paddingTop: '2rem', textAlign: 'center', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
          Ingeniería de Software II — Sistema de Facturación con IA
        </div>
      </div>
    </div>
  );
};
