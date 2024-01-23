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
import { difficultyLevels } from '@/data';
import questions from '@/data/questions.json';
import { useState } from 'react';

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

  // questions handler
  const [currentQuestion, setCurrentQuestion] = useState({
    text: '',
    difficulty: '',
    points: 0,
  });
  const [usedQuestion, setUsedQuestion] = useState([] as number[]);
  const [scoringTeam, setScoringTeam] = useState(''); // 'A' or 'B'

  const getRandomQuestion = () => {
    if (usedQuestion.length === questions.length) {
      setUsedQuestion([]);
    }

    setScoringTeam('');

    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * questions.length);
    } while (usedQuestion.includes(randomIndex));

    setUsedQuestion([...usedQuestion, randomIndex]);

    const selectedQuestion = questions[randomIndex];
    setCurrentQuestion({
      text: selectedQuestion.question,
      difficulty: selectedQuestion.difficulty,
      points: selectedQuestion.points,
    });
  };

  const handleUpdateTeamAPoints = (newPoints: number) => {
    if (newPoints < 0) return;
    setTeamAPoints(newPoints);
    localStorage.setItem('teamAPoints', String(newPoints));
    setScoringTeam('A');
  };

  const handleUpdateTeamBPoints = (newPoints: number) => {
    if (newPoints < 0) return;

    setTeamBPoints(newPoints);
    localStorage.setItem('teamBPoints', String(newPoints));
    setScoringTeam('B');
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
            {currentQuestion.text ||
              'Selecione um tema e clique em "Nova Pergunta"'}
          </p>
          <p>Dificuldade: {currentQuestion.difficulty}</p>

          <div className='flex flex-col justify-start items-center gap-4'>
            <h3 className='text-2xl font-bold'>Marcar ponto</h3>
            <div className='flex flex-row justify-center items-center gap-4'>
              <Button
                onClick={() =>
                  handleUpdateTeamAPoints(teamAPoints + currentQuestion.points)
                }
                disabled={scoringTeam != ''}
              >
                Equipe A
              </Button>
              <Button
                onClick={() =>
                  handleUpdateTeamBPoints(teamBPoints + currentQuestion.points)
                }
                disabled={scoringTeam != ''}
              >
                Equipe B
              </Button>
            </div>
          </div>

          <Button
            onClick={getRandomQuestion}
            className=''
            variant='destructive'
          >
            Nova pergunta
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
