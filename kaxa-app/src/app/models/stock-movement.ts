export type MovementType = 'entrada' | 'salida' | 'ajuste';

export interface StockMovement {
  id: number;
  productId: number;
  tipo: MovementType;
  cantidad: number;
  motivo: string;
  fecha: string;
  hora: string;
}

export const MOTIVOS_ENTRADA = ['Compra a proveedor', 'Devolución de cliente', 'Conteo físico (sobrante)'];
export const MOTIVOS_SALIDA = ['Merma / producto dañado', 'Caducidad', 'Conteo físico (faltante)', 'Uso interno'];