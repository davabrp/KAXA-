import { Component, Input } from '@angular/core';

export interface DonutSegment {
  label: string;
  value: number;
}

@Component({
  selector: 'app-donut-chart',
  standalone: true,
  templateUrl: './donut-chart.component.html',
  styleUrl: './donut-chart.component.css',
})
export class DonutChartComponent {
  @Input() segments: DonutSegment[] = [];
  colors = ['#0a0a0a', '#3d3d3d', '#5c5c5c', '#8a8a8a', '#b5b5b3', '#dcdcd8'];

  total(): number {
    return this.segments.reduce((s, x) => s + x.value, 0) || 1;
  }

  gradient(): string {
    let cum = 0;
    const total = this.total();
    const stops = this.segments.map((s, i) => {
      const start = (cum / total) * 360;
      cum += s.value;
      const end = (cum / total) * 360;
      return `${this.colors[i % this.colors.length]} ${start}deg ${end}deg`;
    });
    return stops.length ? `conic-gradient(${stops.join(',')})` : 'var(--line)';
  }

  colorOf(i: number): string {
    return this.colors[i % this.colors.length];
  }
}