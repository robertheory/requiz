import { z } from 'zod';

export const scoreFormSchema = z.object({
  teamA: z.object({
    points: z.number().default(0),
  }),
  teamB: z.object({
    points: z.number().default(0),
  }),
});

export type ScoreFormSchema = z.infer<typeof scoreFormSchema>;
