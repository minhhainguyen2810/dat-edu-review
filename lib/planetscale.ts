import 'server-only';
import { Generated, Kysely } from 'kysely';
import { PlanetScaleDialect } from 'kysely-planetscale';

interface User {
  id: Generated<number>;
  name: string;
  username: string;
  email: string;
}

interface School {
  id: Generated<number>;
  name: string;
  location: string;
  description: string;
}

interface Program {
  id: Generated<number>;
  school_id: number;
  name: string;
  duration: string;
  goal: string;
  description: string;
}

interface ProgramComment {
  id: Generated<number>;
  program_id: number;
  pros: string;
  cons: string;
  need_to_improved: string;
  date: string;
  rate_teachers: number;
  rate_quality: number;
  rate_facilities: number;
  rate_overall: number;
}

export interface Database {
  users: User;
  school: School;
  program: Program;
  program_comment: ProgramComment;

  // https://github.com/nextauthjs/next-auth/issues/4922
}

export const queryBuilder = new Kysely<Database>({
  dialect: new PlanetScaleDialect({
    url: process.env.DATABASE_URL
  })
});
