import React, { FC, memo } from 'react';
import UserMultiSelect from './UserMultiSelect';
import UserSingleSelect from './UserSingleSelect';

export interface UserItemProps
  extends React.ComponentPropsWithoutRef<'div'> {
  login: string;
  label: string;
  value: string;
}

export interface UserSelectProps {
  url: string;
  label: string;
  placeholder: string;
  nothingFound: string;
  selectedUsers: string[];
  select: (_: string[]) => void;
  additionalProps?: any;
  multiple?: boolean;
}

const UserSelect: FC<UserSelectProps> = ({ multiple, ...props }) => {
  if (multiple) return <UserMultiSelect {...props} />;
  return <UserSingleSelect {...props} />;
};

export default memo(UserSelect);
