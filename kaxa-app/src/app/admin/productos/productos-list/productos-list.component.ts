import { Component, inject, signal } from '@angular/core';
import { ProductService } from  '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';
import { StatCardComponent } from '../../../components/ui/stat-card/stat-card.component';
import { ModalComponent } from '../../../components/ui/modal/modal.component';
import { ProductoFormComponent } from '../producto-form/producto-form.component';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-productos-list',
  standalone: true,
  imports: [StatCardComponent, ModalComponent, ProductoFormComponent],
  templateUrl: './productos-list.component.html',
  styleUrl: './productos-list.component.css',
})
export class ProductosListComponent {
  productService = inject(ProductService);
  categoryService = inject(CategoryService);
  showForm = signal(false);

  onSave(data: Omit<Product, 'id'>): void {
    this.productService.add(data);
    this.showForm.set(false);
  }
}