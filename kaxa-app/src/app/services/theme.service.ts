import { Injectable, signal } from '@angular/core';
import { Theme, THEME_PRESETS } from '../models/theme';

const STORAGE_KEY = 'kaxa-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  presets = THEME_PRESETS;
  current = signal<Theme>(this.loadInitial());

  constructor() {
    this.apply(this.current());
  }

  private loadInitial(): Theme {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // si falla el parseo, cae al default
    }
    return this.presets[0];
  }

  select(theme: Theme): void {
    this.current.set(theme);
    this.apply(theme);
    this.persist(theme);
  }

  updateCustom(partial: Partial<Theme>): void {
    const next: Theme = { ...this.current(), id: 'personalizado', nombre: 'Personalizado', ...partial };
    this.current.set(next);
    this.apply(next);
    this.persist(next);
  }

  reset(): void {
    this.select(this.presets[0]);
  }

  private apply(theme: Theme): void {
    const root = document.documentElement.style;
    root.setProperty('--ink', theme.ink);
    root.setProperty('--paper', theme.paper);
    root.setProperty('--paper-alt', theme.paperAlt);
    root.setProperty('--line', theme.line);
  }

  private persist(theme: Theme): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(theme));
    } catch {
      // almacenamiento no disponible; no rompe la app
    }
  }
}