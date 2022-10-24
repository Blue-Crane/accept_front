import { IVerdict } from './atomic';
import { ITaskBaseInfo } from './ITask';
import { IUserDisplay } from './IUser';

export interface IResult {
  attempt: string;
  date: Date;
  verdict: IVerdict;
  verdictTest: number;
  passedTests: number;
  percentTests: number;
}

export interface ITableResults {
  attempts: IResult[];
  best?: IResult;
}

export interface IUserResult {
  user: IUserDisplay;
  results: ITableResults[];
  score: number;
}

export interface IFullResults {
  tasks: ITaskBaseInfo[];
  user_results: IUserResult[];
}
