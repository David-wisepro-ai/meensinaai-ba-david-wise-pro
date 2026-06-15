// Tipos compartilhados pelos componentes do portal.

export type Level = 'iniciante' | 'avancado';

export type Question = {
  id: string;
  category: string;
  subtopic: string | null;
  question: string;
  options: Record<'A' | 'B' | 'C' | 'D', string>;
  difficulty: string;
};

export type Feedback = {
  correct: boolean;
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  codeReference: string | null;
};

export const OPTION_KEYS = ['A', 'B', 'C', 'D'] as const;
