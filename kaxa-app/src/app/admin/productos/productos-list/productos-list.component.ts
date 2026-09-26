import { Component, inject, signal } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';
import { StatCardComponent } from '../../../components/ui/stat-card/stat-card.component';
import { ModalComponent } from '../../../components/ui/modal/modal.component';
import { ProductoFormComponent } from '../producto-form/producto-form.component';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-productos-list',
  standalone: true,
  host: { class: 'view view-fade' },
  imports: [StatCardComponent, ModalComponent, ProductoFormComponent],
  templateUrl: './productos-list.component.html',
  styleUrl: './productos-list.component.css',
})
export class ProductosListComponent {
  productService = inject(ProductService);
  categoryService = inject(CategoryService);

  showForm = signal(false);
  originX = 0;
  originY = 0;

  openProductForm(event: MouseEvent): void {
    const btn = event.currentTarget as HTMLElement;
    const rect = btn.getBoundingClientRect();
    this.originX = rect.left + rect.width / 2;
    this.originY = rect.top + rect.height / 2;
    this.showForm.set(true);
  }

  onSave(data: Omit<Product, 'id'>): void {
    this.productService.add(data);
    this.showForm.set(false);
  }
}