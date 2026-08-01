import { Component, EventEmitter, Output, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './producto-form.component.html',
  styleUrl: './producto-form.component.css',
})
export class ProductoFormComponent {
  categoryService = inject(CategoryService);
  private fb = inject(FormBuilder);

  @Output() save = new EventEmitter<Omit<Product, 'id'>>();
  @Output() cancel = new EventEmitter<void>();

  form = this.fb.group({
    nombre: ['', Validators.required],
    categoriaId: [this.categoryService.categories()[0]?.id ?? 1, Validators.required],
    codigo: [''],
    precio: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    minStock: [5, [Validators.required, Validators.min(0)]],
  });

  submit(): void {
    if (this.form.invalid) return;
    const v = this.form.getRawValue();
    this.save.emit({
      nombre: v.nombre!,
      categoriaId: Number(v.categoriaId),
      codigo: v.codigo || String(750100000 + Math.floor(Math.random() * 999)),
      precio: Number(v.precio),
      stock: Number(v.stock),
      minStock: Number(v.minStock),
    });
  }
}