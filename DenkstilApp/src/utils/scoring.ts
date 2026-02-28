import { Score, PreferenceLevel } from '../types';
import { sections } from '../data/questions';

export function computeScores(answers: Record<string, number>): Score[] {
  return sections.map((sec, si) => {
    const raw = sec.questions.reduce(
      (sum, _, qi) => sum + (answers[`${si}_${qi}`] ?? 3),
      0
    );
    return {
      id: sec.id,
      name: sec.name,
      color: sec.color,
      icon: sec.icon,
      raw,
      pct: Math.round((raw / (sec.questions.length * 5)) * 100),
    };
  });
}

export function getPreferenceLevel(pct: number): PreferenceLevel {
  if (pct >= 80) return { level: 4, label: 'Sehr stark', color: '#15803d', bg: '#f0fdf4', border: '#86efac' };
  if (pct >= 60) return { level: 3, label: 'Stark (primär)', color: '#1d4ed8', bg: '#eff6ff', border: '#93c5fd' };
  if (pct >= 40) return { level: 2, label: 'Sekundär', color: '#b45309', bg: '#fefce8', border: '#fcd34d' };
  return { level: 1, label: 'Geringe Präferenz', color: '#b91c1c', bg: '#fef2f2', border: '#fca5a5' };
}
