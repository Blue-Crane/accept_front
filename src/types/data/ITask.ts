import {
  IAttemptStatus,
  IHintAlarmType,
  ILanguage,
  ITaskCheckType,
  ITaskTestData,
  ITaskType,
  IVerdict,
} from './atomic';
import { IOrganizationDisplay } from './IOrganization';
import { ITag } from './ITag';

export interface IHint {
  content: string;
  alarmType: IHintAlarmType; //  spec
  alarm: number;
  // depends on alarmType
  // "attempts" -> number of attempts required for hint to appear
  // "timestamp" -> timestamp when hint will appear
}

export interface IChecker {
  sourceCode: string;
  language: string; // spec
}

interface IConstraints {
  time: number;
  memory: number;
}

export interface IExample {
  inputData: string;
  outputData: string;
}

export interface ITaskBaseInfo {
  spec: string;
  title: string;
}

export interface IBarTask {
  spec: string;
  status?: IAttemptStatus;
  verdict?: IVerdict;
}

export interface ITaskDisplay {
  spec: string;
  title: string;
  tags: ITag[];
  author: string;
  verdict: IVerdict;
  insertedDate: Date;
  complexity: number;
  status?: IAttemptStatus;
  organization: IOrganizationDisplay;
}

export interface ITaskDisplayWithPublic extends ITaskDisplay {
  public: boolean;
}

export interface ITask extends ITaskDisplay {
  description: string;
  constraints: IConstraints;

  examples: IExample[];
  inputFormat: string;
  outputFormat: string;
  remark: string | undefined;

  hint: IHint | undefined;

  allowedLanguages: ILanguage[];
  forbiddenLanguages: ILanguage[];

  testsNumber: number;
  taskType: ITaskType;
}

export interface ITaskEdit extends ITask {
  tests: ITaskTestData[];
  checker: IChecker | undefined;
  checkType: ITaskCheckType | undefined;
}

export interface ITaskAdd {
  spec: string;
  title: string;
  description: string;
  examples: IExample[];
  author: string;
  inputFormat: string;
  outputFormat: string;
  remark?: string;
  hint?: IHint;
  tags: string[];
  complexity: number;
  constraints?: IConstraints;
  checkType: number;
  taskType: number;
  checker?: IChecker;
  allowedLanguages: number[];
  forbiddenLanguages: number[];
  organization: string;
}
