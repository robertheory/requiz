import questions from '@/data/questions.json';

export const difficultyLevels = questions.reduce((acc, question) => {
  if (!acc.includes(question.difficulty.toUpperCase()))
    acc.push(question.difficulty.toUpperCase());
  return acc;
}, [] as string[]);
