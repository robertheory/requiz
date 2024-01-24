'use client';

import { Button } from './ui/button';

type TeamProps = {
  name: string;
  color: string;
  points: number;
  handleScore: () => void;
};

const Team = ({ color, name, points, handleScore }: TeamProps) => {
  return (
    <div
      style={{
        backgroundColor: color,
        flex: 1,
      }}
      className={`pt-8 w-full h-full flex flex-1 flex-col justify-start items-center`}
    >
      <div className='w-full max-w-[600px] min-w-[400px] h-full flex flex-col justify-start items-center p-8 gap-4'>
        <h2
          className='
          text-6xl
          font-black
          text-center
          text-slate-900
        '
        >
          {name}
        </h2>

        <h3
          className='
          w-full
        text-6xl
        font-bold
        text-center
        text-slate-900
        uppercase
        bg-slate-100
        rounded-lg
        p-4
        '
        >
          {points} pontos
        </h3>

        <Button onClick={handleScore} className='w-fit'>
          <span className='text-2xl font-bold'>Marcar ponto</span>
        </Button>
      </div>
    </div>
  );
};

export default Team;
