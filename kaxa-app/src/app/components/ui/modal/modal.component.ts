import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  @Input() visible = false;
  @Input() title = '';
  @Input() originX: number | null = null;
  @Input() originY: number | null = null;
  @Output() close = new EventEmitter<void>();

  onBackdrop(e: MouseEvent): void {
    if ((e.target as HTMLElement).classList.contains('overlay')) this.close.emit();
  }

  dx(): number {
    if (this.originX == null) return 0;
    return this.originX - window.innerWidth / 2;
  }

  dy(): number {
    if (this.originY == null) return 0;
    return this.originY - window.innerHeight / 2;
  }
}