import { Injectable, signal, inject } from '@angular/core';
import { ProductService } from './product.service';
import { StockMovement, MovementType } from '../models/stock-movement';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private productService = inject(ProductService);
  private nextId = 1;

  private _movements = signal<StockMovement[]>([]);
  movements = this._movements.asReadonly();

  registrar(productId: number, tipo: MovementType, cantidad: number, motivo: string): void {
    const delta = tipo === 'salida' ? -Math.abs(cantidad) : Math.abs(cantidad);
    this.productService.adjustStock(productId, delta);

    const now = new Date();
    this._movements.update(list => [
      {
        id: this.nextId++,
        productId,
        tipo,
        cantidad: Math.abs(cantidad),
        motivo,
        fecha: now.toLocaleDateString('es-MX'),
        hora: now.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }),
      },
      ...list,
    ]);
  }

  recientes(limit = 8): StockMovement[] {
    return this._movements().slice(0, limit);
  }
}