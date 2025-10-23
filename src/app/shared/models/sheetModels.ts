interface Topic {
  id: string;
  step_no: number;
  sl_no_in_step: number;
  head_step_no: string;
  title: string;
  isSolved: boolean;
  yt_link: string;
  cs_link: string;
  gfg_link: string | null;
  lc_link: string;
  difficulty: number;
}

interface Step {
  step_no: number;
  head_step_no: string;
  topics: Topic[];
}

export { Topic, Step };