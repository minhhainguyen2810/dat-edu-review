export interface IProgramComment {
  pros?: string;
  cons?: string;
  id: number;
  need_to_improved?: string;
  image_url?: string;
  rate_overall?: number;
  program_id?: number;
}

export interface IProgramDetail {
  id: number;
  name: string;
  duration: string;
  goal: string;
  description: string;
  school_id: number;
}
