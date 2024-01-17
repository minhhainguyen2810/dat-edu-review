import 'server-only';
import { Generated, GeneratedAlways, Kysely } from 'kysely';
import { PlanetScaleDialect } from 'kysely-planetscale';
import { KyselyAuth } from '@auth/kysely-adapter';

interface User {
  id: GeneratedAlways<string>;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  role: string;
}

interface Account {
  id: GeneratedAlways<string>;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token: string | null;
  access_token: string | null;
  expires_at: number | null;
  token_type: string | null;
  scope: string | null;
  id_token: string | null;
  session_state: string | null;
}

interface Session {
  id: GeneratedAlways<string>;
  userId: string;
  sessionToken: string;
  expires: Date;
}

interface VerificationToken {
  identifier: string;
  token: string;
  expires: Date;
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
  user: string;
  is_approved: boolean;
}

interface Workplace {
  id: Generated<number>;
  name: string;
  description: string;
  location: string;
}

interface WorkplaceComment {
  id: Generated<number>;
  workplace_id: Generated<number>;
  pros: string;
  cons: string;
  need_to_improved: string;
  date: string;
  rate_teachers: number;
  rate_quality: number;
  rate_facilities: number;
  rate_overall: number;
  user: string;
  is_approved: boolean;
}

export interface Database {
  User: User;
  Account: Account;
  Session: Session;
  VerificationToken: VerificationToken;
  school: School;
  program: Program;
  program_comment: ProgramComment;
  workplace: Workplace;
  workplace_comment: WorkplaceComment;
}

export const queryBuilder = new KyselyAuth<Database>({
  dialect: new PlanetScaleDialect({
    url: process.env.DATABASE_URL
  })
});
