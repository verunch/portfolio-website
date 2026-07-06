// Tools/technologies list — feeds StackGrid.
export type Tool = {
  id: string;
  label: string;
  name: string;
  // Brand-associated color per product decision (docs/architecture/DECISIONS.md)
  // so badges read as recognizable technology marks. Not a Color Foundation
  // token — deliberately outside the app's own palette, scoped to this one
  // component. No logos/artwork reproduced, only the common brand color.
  brandColor: string;
  textColor: 'light' | 'dark';
};

// Per the approved wireframe's "MY STACK" row (Home (A) — desktop breakpoint).
export const stack: Tool[] = [
  { id: 'react', label: 'Re', name: 'React', brandColor: '#61DAFB', textColor: 'dark' },
  { id: 'typescript', label: 'TS', name: 'TypeScript', brandColor: '#3178C6', textColor: 'light' },
  { id: 'html', label: 'H5', name: 'HTML', brandColor: '#E34F26', textColor: 'light' },
  { id: 'css', label: 'CSS', name: 'CSS', brandColor: '#1572B6', textColor: 'light' },
  { id: 'javascript', label: 'JS', name: 'JavaScript', brandColor: '#F7DF1E', textColor: 'dark' },
  { id: 'figma', label: 'Fi', name: 'Figma', brandColor: '#A259FF', textColor: 'light' },
  { id: 'miro', label: 'Mi', name: 'Miro', brandColor: '#FFD02F', textColor: 'dark' },
  { id: 'notion', label: 'No', name: 'Notion', brandColor: '#191919', textColor: 'light' },
  { id: 'github', label: 'GH', name: 'GitHub', brandColor: '#181717', textColor: 'light' },
  { id: 'claude', label: 'Cl', name: 'Claude', brandColor: '#D97757', textColor: 'light' },
  { id: 'chatgpt', label: 'GPT', name: 'ChatGPT', brandColor: '#10A37F', textColor: 'light' },
  { id: 'cursor', label: 'Cu', name: 'Cursor', brandColor: '#0A0A0A', textColor: 'light' },
  { id: 'vscode', label: 'VS', name: 'VS Code', brandColor: '#007ACC', textColor: 'light' },
];
