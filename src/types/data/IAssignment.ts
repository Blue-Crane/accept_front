import {
  IAssignmentSchema,
  IAssignmentSchemaDisplay,
} from './IAssignmentSchema';
import { IAssignmentStatus } from './atomic';
import { IGroupDisplay } from './IGroup';
import { IAttemptDisplay } from './IAttempt';
import { ITag } from './ITag';
export interface IAssignment extends IAssignmentSchema {
  origin: string;
  starter: string;
  status: IAssignmentStatus;
  infinite: boolean;

  start: Date;
  end: Date;

  groups: IGroupDisplay[];
}

export interface IAssignmentAdd {
  spec: string;
  origin: string;
  starter: string;
  status: number;
  infinite: boolean;

  start: Date;
  end: Date;

  groups: string[];
}
export interface IAssignmentAddBundle {
  assignment_schemas: IAssignmentSchemaDisplay[];
  groups: IGroupDisplay[];
}

export interface IAssignmentEditBundle {
  assignment_schemas: IAssignmentSchemaDisplay[];
  groups: IGroupDisplay[];
  assignment: IAssignmentAdd;
}

export interface IAssignmentResults {
  assignment: IAssignment;
  tasks: { spec: string; title: string }[];
  users: { login: string; shortName: string }[];
  results: {
    best: IAttemptDisplay | null;
    attempts: IAttemptDisplay[];
  }[][];
}

export interface IAssignmentDisplay {
  spec: string;
  title: string;
  author: string;
  taskNumber: number;
  tags: ITag[];
  starter: string;
  origin: string;
  groups: IGroupDisplay[];

  status: IAssignmentStatus;
  infinite: boolean;

  start: Date;
  end: Date;
}

export interface IAssignmentTimeInfo {
  status: number;
  infinite: boolean;

  start: Date;
  end: Date;
}
