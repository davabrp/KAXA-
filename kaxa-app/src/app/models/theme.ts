export interface Theme {
  id: string;
  nombre: string;
  ink: string;
  paper: string;
  paperAlt: string;
  line: string;
}

export const THEME_PRESETS: Theme[] = [
  { id: 'clasico',   nombre: 'Blanco y Negro', ink: '#0a0a0a', paper: '#ffffff', paperAlt: '#f4f4f2', line: '#dcdcd8' },
{ id: 'azul',      nombre: 'Azul y Blanco',  ink: '#1e3a8a', paper: '#ffffff', paperAlt: '#eef2ff', line: '#c7d2fe' },
  { id: 'invertido', nombre: 'Modo Oscuro',    ink: '#f2f2f0', paper: '#0a0a0a', paperAlt: '#171717', line: '#2e2e2e' },
  { id: 'carbon',    nombre: 'Carbón',         ink: '#1c1c1c', paper: '#ffffff', paperAlt: '#ececea', line: '#d4d4d1' },
  { id: 'marfil',    nombre: 'Marfil',         ink: '#141210', paper: '#fdfcf7', paperAlt: '#f4f0e4', line: '#e3ddc9' },
];