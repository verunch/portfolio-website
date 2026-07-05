// Tools/technologies list — feeds StackGrid (Milestone 2). Not yet consumed.
export type Tool = {
  id: string;
  label: string;
  name: string;
};

// Per the approved wireframe's "MY STACK" row (Home (A) — desktop breakpoint).
export const stack: Tool[] = [
  { id: 'react', label: 'Re', name: 'React' },
  { id: 'typescript', label: 'TS', name: 'TypeScript' },
  { id: 'html', label: 'H5', name: 'HTML' },
  { id: 'css', label: 'CSS', name: 'CSS' },
  { id: 'javascript', label: 'JS', name: 'JavaScript' },
  { id: 'figma', label: 'Fi', name: 'Figma' },
  { id: 'miro', label: 'Mi', name: 'Miro' },
  { id: 'notion', label: 'No', name: 'Notion' },
  { id: 'github', label: 'GH', name: 'GitHub' },
  { id: 'claude', label: 'Cl', name: 'Claude' },
  { id: 'chatgpt', label: 'GPT', name: 'ChatGPT' },
  { id: 'cursor', label: 'Cu', name: 'Cursor' },
  { id: 'vscode', label: 'VS', name: 'VS Code' },
];
