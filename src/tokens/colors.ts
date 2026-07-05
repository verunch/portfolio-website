// Sourced verbatim from the approved Color Foundation design system (ARCHITECTURE.md §13).
// Mirror any change here in src/styles/tokens.css — the CSS custom properties are the
// runtime source components style against; this module is for JS/TS consumers.
export const color = {
  bg: { paper: '#FBFAF6', surface: '#FFFFFF', warm: '#F2EFDF', beige: '#F2DAC4' },
  brand: {
    primary: '#8D9FA6',
    light: '#A4BFBA',
    hover: '#7B9098',
    active: '#687C83',
    900: '#2F383C',
  },
  accent: {
    gold: '#F2CB57',
    light: '#F6DE97',
    soft: '#F8E8B9',
    hover: '#E0B63E',
    active: '#C49A2C',
  },
  text: { primary: '#403636', secondary: '#6F6966', muted: '#A6A19D', inverse: '#FFFFFF' },
  border: { base: '#E5E0D6', divider: '#ECE8DF', strong: '#CFC8BB' },
  functional: {
    success: '#8FB89A',
    warning: '#E5B64A',
    error: '#F29991',
    info: '#8D9FA6',
    disabled: '#D8D3C8',
  },
  focusRing: 'rgba(141,159,166,.45)',
  overlay: 'rgba(64,54,54,.45)',
} as const;
