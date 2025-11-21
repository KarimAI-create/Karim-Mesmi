export interface Lesson {
  id: string;
  title: string;
  category: 'Grammar' | 'Vocabulary' | 'Reading';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  content: string;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option
  explanation: string;
}

export enum AdFormat {
  Banner = 'horizontal',
  Rectangle = 'rectangle',
  Vertical = 'vertical'
}