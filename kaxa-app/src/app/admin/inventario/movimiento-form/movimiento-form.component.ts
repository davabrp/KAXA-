import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MovementType, MOTIVOS_ENTRADA, MOTIVOS_SALIDA } from '../../../models/stock-movement';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-movimiento-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './movimiento-form.component.html',
  styleUrl: './movimiento-form.component.css',
})
export class MovimientoFormComponent {
  @Input({ required: true }) product!: Product;
  @Output() save = new EventEmitter<{ tipo: MovementType; cantidad: number; motivo: string }>();
  @Output() cancel = new EventEmitter<void>();

  private fb = inject(FormBuilder);

  form = this.fb.group({
    tipo: ['entrada' as MovementType, Validators.required],
    cantidad: [1, [Validators.required, Validators.min(1)]],
    motivo: ['', Validators.required],
  });

  motivosSugeridos(): string[] {
    return this.form.value.tipo === 'salida' ? MOTIVOS_SALIDA : MOTIVOS_ENTRADA;
  }

  usarMotivo(m: string): void {
    this.form.patchValue({ motivo: m });
  }

  submit(): void {
    if (this.form.invalid) return;
    const v = this.form.getRawValue();
    this.save.emit({ tipo: v.tipo!, cantidad: Number(v.cantidad), motivo: v.motivo! });
  }
}