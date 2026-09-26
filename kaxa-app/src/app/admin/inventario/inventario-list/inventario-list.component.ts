import { Component, inject, signal, computed } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';
import { InventoryService } from '../../../services/inventory.service';
import { StatCardComponent } from '../../../components/ui/stat-card/stat-card.component';
import { BadgeComponent } from '../../../components/ui/badge/badge.component';
import { ModalComponent } from '../../../components/ui/modal/modal.component';
import { MovimientoFormComponent } from '../movimiento-form/movimiento-form.component';
import { Product, stockStatus } from '../../../models/product';
import { MovementType } from '../../../models/stock-movement';

@Component({
  selector: 'app-inventario-list',
  standalone: true,
  host: { class: 'view view-fade' },
  imports: [StatCardComponent, BadgeComponent, ModalComponent, MovimientoFormComponent],
  templateUrl: './inventario-list.component.html',
  styleUrl: './inventario-list.component.css',
})
export class InventarioListComponent {
  productService = inject(ProductService);
  categoryService = inject(CategoryService);
  inventoryService = inject(InventoryService);

  search = signal('');
  categoriaFiltro = signal<number | null>(null);

  showForm = signal(false);
  selectedProduct: Product | null = null;
  originX = 0;
  originY = 0;

  statusOf = stockStatus;

  filtered = computed(() => {
    const term = this.search().trim().toLowerCase();
    const cat = this.categoriaFiltro();
    return this.productService.products().filter(p => {
      const matchTerm = !term || p.nombre.toLowerCase().includes(term) || p.codigo.includes(term);
      const matchCat = cat == null || p.categoriaId === cat;
      return matchTerm && matchCat;
    });
  });

  totalUnidades(): number {
    return this.productService.products().reduce((s, p) => s + p.stock, 0);
  }

  normal(): number {
    return this.productService.products().length - this.productService.bajoStock() - this.productService.agotados();
  }

  labelOf(p: Product): string {
    const s = stockStatus(p);
    return s === 'ok' ? 'En stock' : s === 'low' ? 'Bajo stock' : 'Agotado';
  }

  productoDe(id: number): Product | undefined {
    return this.productService.products().find(p => p.id === id);
  }

  openMovement(event: MouseEvent, product: Product): void {
    const btn = event.currentTarget as HTMLElement;
    const rect = btn.getBoundingClientRect();
    this.originX = rect.left + rect.width / 2;
    this.originY = rect.top + rect.height / 2;
    this.selectedProduct = product;
    this.showForm.set(true);
  }

  onMovementSave(data: { tipo: MovementType; cantidad: number; motivo: string }): void {
    if (!this.selectedProduct) return;
    this.inventoryService.registrar(this.selectedProduct.id, data.tipo, data.cantidad, data.motivo);
    this.showForm.set(false);
  }
}