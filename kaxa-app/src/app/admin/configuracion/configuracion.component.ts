import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { Theme } from '../../models/theme';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  host: { class: 'view view-fade' },
  templateUrl: './configuracion.component.html',
  styleUrl: './configuracion.component.css',
})
export class ConfiguracionComponent {
  themeService = inject(ThemeService);

  isActive(t: Theme): boolean {
    return this.themeService.current().id === t.id;
  }

  onInkChange(value: string): void {
    this.themeService.updateCustom({ ink: value });
  }

  onPaperAltChange(value: string): void {
    this.themeService.updateCustom({ paperAlt: value });
  }
}