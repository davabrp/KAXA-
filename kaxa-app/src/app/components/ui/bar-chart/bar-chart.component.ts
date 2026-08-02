import { Component, Input } from '@angular/core';

export interface BarDatum {
  label: string;
  value: number;
}

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css',
})
export class BarChartComponent {
  @Input() data: BarDatum[] = [];

  max(): number {
    return Math.max(...this.data.map(d => d.value), 1);
  }

  pct(value: number): number {
    return (value / this.max()) * 100;
  }
}