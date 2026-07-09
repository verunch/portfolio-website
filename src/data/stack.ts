import type { ComponentType } from 'react';
import {
  ReactIcon,
  TypeScriptIcon,
  Html5Icon,
  Css3Icon,
  JavaScriptIcon,
  TailwindIcon,
  FigmaIcon,
  MiroIcon,
  NotionIcon,
  GitHubIcon,
  GitIcon,
  VsCodeIcon,
  ClaudeIcon,
  EtcIcon,
} from '../components/ui/techIcons';

export type Tool = {
  id: string;
  name: string;
  icon: ComponentType;
  dark?: boolean;
  bordered?: boolean;
};

export const stack: Tool[] = [
  { id: 'figma', name: 'Figma', icon: FigmaIcon },
  { id: 'miro', name: 'Miro', icon: MiroIcon },
  { id: 'html5', name: 'HTML5', icon: Html5Icon },
  { id: 'css3', name: 'CSS3', icon: Css3Icon },
  { id: 'javascript', name: 'JavaScript', icon: JavaScriptIcon },
  { id: 'typescript', name: 'TypeScript', icon: TypeScriptIcon },
  { id: 'react', name: 'React', icon: ReactIcon },
  { id: 'tailwind', name: 'Tailwind CSS', icon: TailwindIcon },
  { id: 'notion', name: 'Notion', icon: NotionIcon },
  { id: 'github', name: 'GitHub', icon: GitHubIcon, dark: true },
  { id: 'git', name: 'Git', icon: GitIcon },
  { id: 'vscode', name: 'VS Code', icon: VsCodeIcon },
  { id: 'claude', name: 'Claude', icon: ClaudeIcon },
  { id: 'etc', name: 'etc', icon: EtcIcon, bordered: true },
];
