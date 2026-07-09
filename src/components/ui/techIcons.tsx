import {
  SiReact,
  SiTypescript,
  SiHtml5,
  SiJavascript,
  SiTailwindcss,
  SiMiro,
  SiNotion,
  SiGithub,
  SiGit,
  SiClaude,
} from 'react-icons/si';
import { DiCss3 } from 'react-icons/di';
import { VscVscode } from 'react-icons/vsc';

// Brand-accurate marks via react-icons where available; sizing/centering is
// handled by TechIconButton's CSS (`.icon svg { width/height: 100% }`).

export function ReactIcon() {
  return <SiReact color="#61dafb" />;
}

export function TypeScriptIcon() {
  return <SiTypescript color="#3178c6" />;
}

export function Html5Icon() {
  return <SiHtml5 color="#e34f26" />;
}

// react-icons' Simple Icons set has no "SiCss3" export — Devicons does.
export function Css3Icon() {
  return <DiCss3 color="#1572b6" />;
}

export function JavaScriptIcon() {
  return <SiJavascript color="#f7df1e" />;
}

export function TailwindIcon() {
  return <SiTailwindcss color="#38bdf8" />;
}

export function MiroIcon() {
  return <SiMiro color="#ffd02f" />;
}

export function NotionIcon() {
  return <SiNotion color="#000000" />;
}

export function GitHubIcon() {
  return <SiGithub color="#ffffff" />;
}

export function GitIcon() {
  return <SiGit color="#f05133" />;
}

export function VsCodeIcon() {
  return <VscVscode color="#007acc" />;
}

export function ClaudeIcon() {
  return <SiClaude color="#d97757" />;
}

// react-icons' installed Simple Icons set has no ChatGPT/OpenAI mark —
// kept as a hand-drawn fallback.
export function ChatGptIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="#10a37f" strokeWidth="1.4" />
      <path
        d="M8.5 10.3c0-1.9 1.6-3.4 3.5-3.4s3.5 1.5 3.5 3.4-1.6 3.4-3.5 3.4"
        stroke="#10a37f"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="9" cy="14.3" r="1" fill="#10a37f" />
    </svg>
  );
}

// Simple Icons are monochrome-only — Figma's real mark is multi-color, so
// kept as a hand-drawn fallback for visual fidelity.
export function FigmaIcon() {
  return (
    <svg viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 2h3.5a3 3 0 010 6H9V2z" fill="#f24e1e" />
      <path d="M6 2h3v6H6a3 3 0 110-6z" fill="#ff7262" />
      <path d="M6 8h3v6H6a3 3 0 110-6z" fill="#a259ff" />
      <path d="M9 8h3.5a3 3 0 110 6H9V8z" fill="#1abcfe" />
      <path d="M6 14a3 3 0 116 0 3 3 0 01-6 0z" fill="#0acf83" />
    </svg>
  );
}

export function EtcIcon() {
  return (
    <svg viewBox="-12 -12 24 24" xmlns="http://www.w3.org/2000/svg">
      <text
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="14"
        fontWeight="700"
        fill="currentColor"
        fontFamily="system-ui"
      >
        etc
      </text>
    </svg>
  );
}
