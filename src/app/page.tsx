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
import questions from '@/data/questions.json';
import { useState } from 'react';

const levels = questions.reduce((acc, question) => {
  if (!acc.includes(question.difficulty.toUpperCase()))
    acc.push(question.difficulty.toUpperCase());
  return acc;
}, [] as string[]);

const Home = () => {
  const [teamAPoints, setTeamAPoints] = useState(() => {
    const localTeamAPoints = localStorage.getItem('teamAPoints');

    if (!localTeamAPoints) {
      localStorage.setItem('teamAPoints', '0');
      return 0;
    }

    return Number(localTeamAPoints);
  });
  const [teamBPoints, setTeamBPoints] = useState(() => {
    const localTeamBPoints = localStorage.getItem('teamBPoints');

    if (!localTeamBPoints) {
      localStorage.setItem('teamBPoints', '0');
      return 0;
    }

    return Number(localTeamBPoints);
  });

  const handleUpdateTeamAPoints = (points: number) => {
    if (points >= 0) {
      setTeamAPoints(points);
      localStorage.setItem('teamAPoints', String(points));
    }
  };

  const handleUpdateTeamBPoints = (points: number) => {
    if (points >= 0) {
      setTeamBPoints(points);
      localStorage.setItem('teamBPoints', String(points));
    }
  };

  return (
    <div className='w-full h-screen flex flex-col justify-start items-center gap-4 bg-slate-800'>
      <div className='w-full flex-1 flex flex-row justify-between items-start'>
        <Team
          name='Equipe A'
          color='#f9e169'
          points={teamAPoints}
          handleUpdatePoints={handleUpdateTeamAPoints}
        />
        <Team
          name='Equipe B'
          color='#fd67f3'
          points={teamBPoints}
          handleUpdatePoints={handleUpdateTeamBPoints}
        />
      </div>

      <div className='fixed bottom-0 left-0 w-full flex flex-col justify-center items-center p-4'>
        <div
          className='
        w-full max-w-[800px] flex flex-col justify-center items-center gap-4
        bg-slate-100 rounded-lg p-4
        '
        >
          <Select>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Theme' />
            </SelectTrigger>
            <SelectContent>
              {levels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className='text-3xl font-normal bg-zinc-200 p-4 rounded-lg text-center'>
            Como você explicaria o conceito de API para alguém que não é da
            área?
          </p>

          <div className='flex flex-col justify-start items-center gap-4'>
            <h3 className='text-2xl font-bold'>Marcar ponto</h3>
            <div className='flex flex-row justify-center items-center gap-4'>
              <Button onClick={() => handleUpdateTeamAPoints(teamAPoints + 1)}>
                Equipe A
              </Button>
              <Button onClick={() => handleUpdateTeamBPoints(teamBPoints + 1)}>
                Equipe B
              </Button>
            </div>
          </div>

          <Button className='' variant='destructive'>
            Nova pergunta
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
