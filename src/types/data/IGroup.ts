import { IUser } from './IUser';

export interface IGroup {
  spec: string;
  name: string;
  readonly: boolean;
}

export interface IGroupEditBundle {
  group: IGroup;
  users: IUser[];
}

export interface IGroupDisplay {
  spec: string;
  name: string;
  readonly: boolean;
  participants: number;
}
