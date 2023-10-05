import { Session } from 'next-auth';

export interface IProgramComment {
  pros?: string;
  cons?: string;
  id: number;
  need_to_improved?: string;
  image_url?: string;
  rate_overall?: number;
  program_id?: number;
  user?: string;
  date?: string;
}

export interface IProgramDetail {
  id: number;
  name: string;
  duration: string;
  goal: string;
  description: string;
  school_id: number;
}

export interface ISchool {
  id: number;
  name: string;
  description: string;
}

export type TSession = Omit<Session, 'user'> & {
  user: Session['user'] & {
    role: string;
  };
};
