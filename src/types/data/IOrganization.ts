import { IRole } from './atomic';

export interface IOrganization {
  spec: string;
  logo: string;
  title: string;
  description: string;
  principal: string;
  email: string;
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
