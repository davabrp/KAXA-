import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'productos', pathMatch: 'full' },
      {
        path: 'productos',
        loadComponent: () =>
          import('./admin/productos/productos-list/productos-list.component').then(m => m.ProductosListComponent),
      },
      // { path: 'inventario', loadComponent: () => import(...) },
      // { path: 'categorias', loadComponent: () => import(...) },
      // { path: 'facturacion', loadComponent: () => import(...) },
    ],
  },
];