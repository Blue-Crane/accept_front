import { IOrganizationDisplay } from './IOrganization';
import { IUser } from './IUser';

export interface IGroupAdd {
  spec: string;
  name: string;
  readonly: boolean;
  organization: string;
}

export interface IGroupDisplay {
  spec: string;
  name: string;
  readonly: boolean;
  organization: IOrganizationDisplay;
}

export interface IGroupEditBundle {
  group: IGroupDisplay;
  users: IUser[];
}

export interface IGroupDisplayList {
  spec: string;
  name: string;
  readonly: boolean;
  participants: number;
  organization: IOrganizationDisplay;
}
