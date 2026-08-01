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
  @Output() close = new EventEmitter<void>();

  onBackdrop(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('overlay')) this.close.emit();
  }
}