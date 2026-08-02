import { Injectable, signal } from '@angular/core';

export interface VentaDia {
  label: string;
  value: number;
}

@Injectable({ providedIn: 'root' })
export class DashboardService {
  // Datos de demostración. Cuando conectes Spring Boot, esto se reemplaza
  // por un GET a /api/reportes/ventas-semana.
  ventasSemana = signal<VentaDia[]>([
    { label: 'Lun', value: 420 },
    { label: 'Mar', value: 610 },
    { label: 'Mié', value: 380 },
    { label: 'Jue', value: 720 },
    { label: 'Vie', value: 950 },
    { label: 'Sáb', value: 1180 },
    { label: 'Dom', value: 860 },
  ]);

  ventasHoy(): number {
    const dias = this.ventasSemana();
    return dias[dias.length - 1].value;
  }

  ingresosSemana(): number {
    return this.ventasSemana().reduce((s, d) => s + d.value, 0);
  }
}