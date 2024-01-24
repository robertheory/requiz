export enum DifficultyLevelEnum {
  ESTAGIÁRIO = 'ESTAGIÁRIO',
  JÚNIOR = 'JÚNIOR',
  PLENO = 'PLENO',
  SÊNIOR = 'SÊNIOR',
}

export type DifficultyLevelType = keyof typeof DifficultyLevelEnum;

export type Question = {
  id: string;
  text: string;
  difficulty: DifficultyLevelType;
  points: number;
};

export type Round = {
  index: number;
  question: Question;
  winner: 'A' | 'B' | 'NONE';
};
