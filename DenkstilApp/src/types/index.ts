export type QuadrantId = 'A' | 'B' | 'C' | 'D';

export interface QuadrantSection {
  id: QuadrantId;
  name: string;
  color: string;
  icon: string;
  questions: string[];
}

export interface Question {
  text: string;
  sectionIndex: number;
  questionIndex: number;
  key: string;
}

export interface Score {
  id: QuadrantId;
  name: string;
  color: string;
  icon: string;
  raw: number;
  pct: number;
}

export interface Profile {
  label: string;
  persoenlicheMerkmale: string[];
  arbeitsMerkmale: string[];
  lernstil: string;
  kommunikation: string;
  karriere: string;
  staerken: string;
  arbeit: string;
  unterDruck: string;
  entwicklung: string;
}

export interface PreferenceLevel {
  level: number;
  label: string;
  color: string;
  bg: string;
  border: string;
}
