import { questions } from '@/data/questions';
import { DifficultyLevelType, Question, Round } from '@/interfaces';

export const difficultyLevels: DifficultyLevelType[] = questions.reduce(
  (acc, question) => {
    if (!acc.includes(question.difficulty)) acc.push(question.difficulty);
    return acc;
  },
  [] as DifficultyLevelType[]
);

export const placeholderQuestion: Question = {
  id: 'q-00',
  text: 'Selecione um tema e clique em Nova Pergunta para começar',
  difficulty: 'ESTAGIÁRIO',
  points: 0,
};

export const placeholderRound: Round = {
  question: placeholderQuestion,
  winner: 'NONE',
  index: -1,
};
