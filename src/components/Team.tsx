'use client';

type TeamProps = {
  name: string;
  color: string;
  points: number;
};

const Team = ({ color, name, points }: TeamProps) => {
  return (
    <div
      style={{
        backgroundColor: color,
        flex: 1,
      }}
      className={`w-full h-full flex flex-1 flex-col justify-start items-center`}
    >
      <div className='w-full max-w-[600px] min-w-[400px] h-full flex flex-col justify-start items-stretch p-8 gap-4'>
        <h2
          className='
          text-2xl
          font-bold
          text-center
          text-slate-900
        '
        >
          {name}
        </h2>

        <h3
          className='
        text-6xl
        font-bold
        text-center
        text-slate-900
        uppercase
        '
        >
          {points} {points === 1 ? 'ponto' : 'pontos'}
        </h3>

        {/* <div className='flex flex-row justify-center items-center gap-4'>
          <Button onClick={() => handleUpdatePoints(points - 1)}>
            <FiMinus />
          </Button>

          <Button onClick={() => handleUpdatePoints(points + 1)}>
            <FiPlus />
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default Team;
