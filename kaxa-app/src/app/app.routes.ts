import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./admin/dashboard/dashboard.component').then(m => m.DashboardComponent),
      },
      {
        path: 'productos',
        loadComponent: () =>
          import('./admin/productos/productos-list/productos-list.component').then(m => m.ProductosListComponent),
      },
      {
        path: 'configuracion',
        loadComponent: () =>
          import('./admin/configuracion/configuracion.component').then(m => m.ConfiguracionComponent),
      },
      {
  path: 'inventario',
  loadComponent: () =>
    import('./admin/inventario/inventario-list/inventario-list.component').then(m => m.InventarioListComponent),
},
    ],
  },
];