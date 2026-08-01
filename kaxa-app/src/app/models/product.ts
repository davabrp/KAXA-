export interface Product {
  id: number;
  nombre: string;
  categoriaId: number;
  precio: number;
  stock: number;
  minStock: number;
  codigo: string;
}

export type StockStatus = 'ok' | 'low' | 'out';

export function stockStatus(p: Product): StockStatus {
  if (p.stock === 0) return 'out';
  if (p.stock <= p.minStock) return 'low';
  return 'ok';
}