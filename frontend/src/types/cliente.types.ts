export interface Cliente {
  id_cliente: number;
  nombre: string;
  nit: string;
  telefono: string;
}
export type ClienteCreateDTO = Omit<Cliente, 'id_cliente'>;
export type ClienteCreate = ClienteCreateDTO;
export interface ClienteResponse extends Cliente {}
