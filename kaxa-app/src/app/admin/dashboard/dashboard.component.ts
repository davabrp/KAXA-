
import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { DashboardService } from '../../services/dashboard.service';
import { StatCardComponent } from '../../components/ui/stat-card/stat-card.component';
import { BarChartComponent } from '../../components/ui/bar-chart/bar-chart.component';
import { DonutChartComponent } from '../../components/ui/donut-chart/donut-chart.component';
import { BadgeComponent } from '../../components/ui/badge/badge.component';
import { Product, stockStatus } from '../../models/product';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [StatCardComponent, BarChartComponent, DonutChartComponent, BadgeComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  productService = inject(ProductService);
  categoryService = inject(CategoryService);
  dashboardService = inject(DashboardService);

  statusOf = stockStatus;

  categoriaData() {
    return this.categoryService.categories().map(c => ({
      label: c.nombre,
      value: this.productService.inCategory(c.id),
    }));
  }

  productosBajoStock(): Product[] {
    return this.productService.products().filter(p => stockStatus(p) !== 'ok');
  }

  labelOf(p: Product): string {
    return stockStatus(p) === 'low' ? 'Bajo stock' : 'Agotado';
  }
}