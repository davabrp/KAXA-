import { Component, Input } from '@angular/core';
import { StockStatus } from '../../../models/product';

@Component({
  selector: 'app-badge',
  standalone: true,
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.css',
})
export class BadgeComponent {
  @Input() status: StockStatus | 'cat' = 'cat';
  @Input() label = '';
}