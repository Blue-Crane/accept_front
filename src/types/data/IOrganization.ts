import { IRole } from './atomic';

export interface IOrganization {
  spec: string;
  logo: string;
  title: string;
  description: string;
  principal: string;
  email: string;
  created: Date;
  active_until: Date;
}

export interface IOrganizationDisplay {
  spec: string;
  title: string;
  logo: string;
}
export interface IOrganizationDisplayWithRole {
  organization: IOrganizationDisplay;
  role: IRole;
}

export interface IOrganizationAdd {
  spec: string;
  logo: string;
  title: string;
  description: string;
  email: string;
  active_until: Date;
}
