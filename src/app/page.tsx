'use client';

import Team from '@/components/Team';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { difficultyLevels, placeholderRound } from '@/data';
import { questions as staticQuestionList } from '@/data/questions';
import {
  DifficultyLevelEnum,
  DifficultyLevelType,
  Question,
  Round,
} from '@/interfaces';
import { storage } from '@/utils/storage';
import { useState } from 'react';

const Home = () => {
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<null | DifficultyLevelType>(null);

  const localQuestions = storage.getItem('questions');

  const [gameQuestions, setGameQuestions] = useState<Question[]>(() => {
    if (!localQuestions) {
      storage.setItem('questions', JSON.stringify(staticQuestionList));
      return staticQuestionList;
    }

    return JSON.parse(localQuestions);
  });

  const questions = selectedDifficulty
    ? gameQuestions.filter((q) => q.difficulty === selectedDifficulty)
    : gameQuestions;

  const [rounds, setRounds] = useState<Round[]>(() => {
    const localRounds = storage.getItem('rounds');

    if (!localRounds) {
      storage.setItem('rounds', JSON.stringify([]));
      return [];
    }

    return JSON.parse(localRounds);
  });

  const currentRound = rounds.length
    ? rounds[rounds.length - 1]
    : placeholderRound;

  const teamAPoints = rounds.reduce((acc, round) => {
    if (round.winner === 'A') {
      return acc + round.question.points;
    }
    return acc;
  }, 0);

  const teamBPoints = rounds.reduce((acc, round) => {
    if (round.winner === 'B') {
      return acc + round.question.points;
    }
    return acc;
  }, 0);

  const handleRemoveQuestion = (question: Question) => {
    const newQuestions = gameQuestions.filter((q) => q.id !== question.id);
    setGameQuestions(newQuestions);
    storage.setItem('questions', JSON.stringify(newQuestions));
  };

  const handleInitRound = () => {
    const questionRandomIndex = Math.floor(Math.random() * questions.length);

    const newQuestion = questions[questionRandomIndex];

    handleRemoveQuestion(newQuestion);

    const newRound: Round = {
      question: newQuestion,
      winner: 'NONE',
      index: rounds.length,
    };

    const newRounds = [...rounds, newRound];
    setRounds(newRounds);
    storage.setItem('rounds', JSON.stringify(newRounds));
  };

  const handleSetWinner = (winner: 'A' | 'B') => {
    const newRound = { ...currentRound, winner };

    const newRounds = [...rounds];

    newRounds.splice(newRounds.length - 1, 1, newRound);

    setRounds(newRounds);
    storage.setItem('rounds', JSON.stringify(newRounds));
  };

  const handleResetGame = () => {
    const newRounds: Round[] = [];
    setRounds(newRounds);
    storage.setItem('rounds', JSON.stringify(newRounds));
  };

  return (
    <div className='w-full h-screen flex flex-col justify-start items-center gap-4 bg-slate-800'>
      <div className='w-full flex-1 flex flex-row justify-between items-start'>
        <Team name='Equipe A' color='#f9e169' points={teamAPoints} />
        <Team name='Equipe B' color='#fd67f3' points={teamBPoints} />
      </div>

      <div className='fixed bottom-0 left-0 w-full flex flex-col justify-center items-center p-4'>
        <div
          className='
        w-full max-w-[800px] flex flex-col justify-center items-center gap-4
        bg-slate-100 rounded-lg p-4
        '
        >
          <Select
            onValueChange={(value: DifficultyLevelType | 'null') =>
              value !== 'null'
                ? setSelectedDifficulty(DifficultyLevelEnum[value])
                : setSelectedDifficulty(null)
            }
          >
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Dificuldade' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='null'>Todos</SelectItem>
              {difficultyLevels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className='text-3xl font-normal bg-zinc-200 p-4 rounded-lg text-center'>
            {currentRound.question.text}
          </p>
          <p>Dificuldade: {currentRound.question.difficulty}</p>

          <div className='flex flex-col justify-start items-center gap-4'>
            <h3 className='text-2xl font-bold'>Marcar ponto</h3>
            <div className='flex flex-row justify-center items-center gap-4'>
              <Button
                onClick={() => handleSetWinner('A')}
                className={`${
                  currentRound.winner === 'A' &&
                  'bg-green-600 hover:bg-green-700'
                }`}
              >
                Equipe A
              </Button>
              <Button
                onClick={() => handleSetWinner('B')}
                className={`${
                  currentRound.winner === 'B' &&
                  'bg-green-600 hover:bg-green-700'
                }`}
              >
                Equipe B
              </Button>
            </div>
          </div>

          <Button onClick={handleInitRound} variant='outline'>
            Novo round
          </Button>

          <Button onClick={handleResetGame} variant='destructive'>
            Reiniciar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
