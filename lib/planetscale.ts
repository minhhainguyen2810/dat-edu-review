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
  program_id: string;
  name: string;
  pros: string;
  cons: string;
  description: string;
}

interface ProgramComments {
  id: Generated<number>;
  program_id: string;
  name: string;
  pros: string;
  cons: string;
  description: string;
  `need_to_improved`: string;
	`date`: date,
	`rate_teachers`: number,
	`rate_quality`: number,
	`rate_facilities`: number,
	`rate_overall` number,
}

interface Database {
  users: User;
  // https://github.com/nextauthjs/next-auth/issues/4922
}

export const queryBuilder = new Kysely<Database>({
  dialect: new PlanetScaleDialect({
    url: process.env.DATABASE_URL
  })
});
