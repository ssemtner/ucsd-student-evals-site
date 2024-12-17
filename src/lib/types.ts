export type Course = {
  code: string;
  name: string;
  unit: string;
};

export type Summary = {
  actualGPA: string;
  expectedGPA: string;
  hours: string;
  sections: number;
};

export type EvalSummary = {
  [key: string | "overall"]: Summary;
};
