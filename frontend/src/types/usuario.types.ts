export type Rol = 'contador' | 'auditor' | 'administrador';

export interface Usuario {
  id_usuario: number;
  nombre: string;
  correo: string;
  rol: Rol;
  id_estado: number;
}

export interface UsuarioResponse extends Usuario {
}

export interface UsuarioCreate {
  nombre: string;
  correo: string;
  contrasenia: string;
  rol: string;
  id_estado: number;
}

export interface LoginDTO {
  correo: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  usuario: Usuario;
}

export interface Token {
  access_token: string;
  token_type: string;
}
