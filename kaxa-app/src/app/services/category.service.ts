import { Injectable, signal } from '@angular/core';
import { Category } from '../models/category';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private nextId = 5;

  private _categories = signal<Category[]>([
    { id: 1, nombre: 'Abarrotes' },
    { id: 2, nombre: 'Bebidas' },
    { id: 3, nombre: 'Limpieza' },
    { id: 4, nombre: 'Panadería' },
  ]);

  categories = this._categories.asReadonly();

  nameOf(id: number): string {
    return this._categories().find(c => c.id === id)?.nombre ?? '—';
  }

  add(nombre: string): void {
    this._categories.update(list => [...list, { id: this.nextId++, nombre }]);
  }

  remove(id: number): void {
    this._categories.update(list => list.filter(c => c.id !== id));
  }
}