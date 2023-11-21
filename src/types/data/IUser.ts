import { pureCallback } from '../ui/atomic';
import { IRole } from './atomic';
import { IGroupDisplay } from './IGroup';
import { ITeamBaseInfo } from './ITeam';

export interface Role {
  spec: number;
  name: string;
  accessLevel: number;
}

export interface IUser {
  login: string;
  name: string;
  surname: string;
  patronymic: string;
  email: string | undefined;
  shortName: string;
  groups: IGroupDisplay[];
  role: Role;
}

export interface IUserContext {
  authorized: boolean;
  user: IUser | undefined | null;
  accessLevel: number;
  isUser: boolean;
  isStudent: boolean;
  isTeacher: boolean;
  isAdmin: boolean;
  isDeveloper: boolean;
  signIn: (_: string, __: string) => Promise<Boolean>;
  signOut: pureCallback<Promise<Boolean>>;
  refresh: pureCallback<Promise<void>>;
  refreshAccess: pureCallback<number>;
}

export interface IRegUser {
  login: string;
  name: string;
  surname: string;
  patronymic: string;
  password: string;
  email: string | null;
}

export interface IUserListBundle {
  users: IUser[];
  groups: IGroupDisplay[];
  roles: IRole[];
}

export interface IUserDisplay {
  login: string;
  shortName: string;
}

export interface IParticipant extends IUserDisplay {
  banned?: boolean;
  banReason?: string;
  groups: IGroupDisplay[];
  team?: ITeamBaseInfo;
}

export interface IParticipantListBundle {
  users: IParticipant[];
  groups: IGroupDisplay[];
  roles: IRole[];
}
