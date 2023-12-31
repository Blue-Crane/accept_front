import { pureCallback } from '../ui/atomic';
import { IRole } from './atomic';
import { IGroup } from './IGroup';

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
  groups: IGroup[];
  role: Role;
}

export interface IUserContext {
  user: IUser | undefined | null;
  accessLevel: number;
  isUser: boolean;
  isStudent: boolean;
  isTeacher: boolean;
  isAdmin: boolean;
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
  groups: IGroup[];
  roles: IRole[];
}

export interface IParticipantsListBundle extends IUserListBundle {
  banned?: IUser[];
}

export interface IUserDisplay {
  login: string;
  role: IRole;
  shortName: string;
}
