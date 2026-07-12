// Hex -> HSL -> Hex round trip used to derive hover/active tile colors by
// boosting saturation relative to a resource's own base color, rather than
// hardcoding a hover/active hex per resource.
function hexToRgb(hex: string): [number, number, number] {
  const parsed = hex.replace('#', '');
  const value = parseInt(parsed, 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (channel: number) =>
    Math.round(Math.min(255, Math.max(0, channel))).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;
  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const l = (max + min) / 2;
  const d = max - min;

  if (d === 0) return [0, 0, l];

  const s = d / (1 - Math.abs(2 * l - 1));
  let h: number;
  switch (max) {
    case rNorm:
      h = ((gNorm - bNorm) / d) % 6;
      break;
    case gNorm:
      h = (bNorm - rNorm) / d + 2;
      break;
    default:
      h = (rNorm - gNorm) / d + 4;
  }
  h *= 60;
  if (h < 0) h += 360;

  return [h, s, l];
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let [r, g, b] = [0, 0, 0];
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  return [(r + m) * 255, (g + m) * 255, (b + m) * 255];
}

// `saturationPercent`/`darkenPercent` are added/subtracted directly as
// percentage points on the S/L channels, not multiplied — a relative boost
// barely moves near-desaturated colors (e.g. a pale gray-cyan tile stays
// visually identical at every state since 10%/20% of a saturation already
// close to 0 rounds back to itself).
export function adjustTileColor(hex: string, saturationPercent: number, darkenPercent = 0): string {
  const [r, g, b] = hexToRgb(hex);
  const [h, s, l] = rgbToHsl(r, g, b);
  const boostedS = Math.min(1, Math.max(0, s + saturationPercent / 100));
  const darkenedL = Math.min(1, Math.max(0, l - darkenPercent / 100));
  const [nr, ng, nb] = hslToRgb(h, boostedS, darkenedL);
  return rgbToHex(nr, ng, nb);
}
