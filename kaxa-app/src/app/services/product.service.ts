import { Injectable, signal, computed } from '@angular/core';
import { Product, stockStatus } from '../models/product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private nextId = 7;

  private _products = signal<Product[]>([
    { id: 1, nombre: 'Coca-Cola 600ml', categoriaId: 2, precio: 18.00, stock: 42, minStock: 10, codigo: '750100001' },
    { id: 2, nombre: 'Sabritas Original 45g', categoriaId: 1, precio: 17.50, stock: 8, minStock: 15, codigo: '750100002' },
    { id: 3, nombre: 'Jabón Zote 400g', categoriaId: 3, precio: 22.00, stock: 25, minStock: 10, codigo: '750100003' },
    { id: 4, nombre: 'Pan Bimbo Grande', categoriaId: 4, precio: 45.00, stock: 0, minStock: 5, codigo: '750100004' },
    { id: 5, nombre: 'Leche Lala 1L', categoriaId: 1, precio: 26.50, stock: 30, minStock: 12, codigo: '750100005' },
    { id: 6, nombre: 'Agua Ciel 1.5L', categoriaId: 2, precio: 15.00, stock: 60, minStock: 20, codigo: '750100006' },
  ]);

  products = this._products.asReadonly();

  valorInventario = computed(() =>
    this._products().reduce((s, p) => s + p.precio * p.stock, 0)
  );

  bajoStock = computed(() => this._products().filter(p => stockStatus(p) === 'low').length);
  agotados = computed(() => this._products().filter(p => stockStatus(p) === 'out').length);

  add(data: Omit<Product, 'id'>): void {
    this._products.update(list => [...list, { id: this.nextId++, ...data }]);
  }

  remove(id: number): void {
    this._products.update(list => list.filter(p => p.id !== id));
  }

  inCategory(categoriaId: number): number {
    return this._products().filter(p => p.categoriaId === categoriaId).length;
  }
}