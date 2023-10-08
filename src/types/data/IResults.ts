import { ITaskBaseInfo } from './ITask';
import { IVerdict } from './atomic';

export interface IResultPayload {
  spec: string;
  target: string;
  task: string;
  toDate?: Date;
}

export interface IResult {
  attempt: string;
  date: Date;
  verdict: IVerdict;
  verdictTest: number;
  passedTests: number;
  percentTests: number;
  score: number;
}

export interface IParticipantDisplay {
  identifier: string;
  label: string;
}

export interface IParticipantResult {
  best: (IResult | undefined)[];
  score: number;
  participant: IParticipantDisplay;
}

export interface IActivityResults {
  tasks: ITaskBaseInfo[];
  results: IParticipantResult[];
}