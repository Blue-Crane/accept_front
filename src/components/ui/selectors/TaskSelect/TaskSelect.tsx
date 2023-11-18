import React, { FC, memo } from 'react';
import TaskMultiSelect from './TaskMultiSelect';
import TaskSingleSelect from './TaskSingleSelect';

export interface TaskItemProps
  extends React.ComponentPropsWithoutRef<'div'> {
  image: string;
  label: string;
  role: string;
  value: string;
}

export interface TaskSelectProps {
  url: string;
  label: string;
  placeholder: string;
  nothingFound: string;
  select: (_: string[]) => void;
  selectedTasks: string[];
  additionalProps?: any;
  multiple?: boolean;
}

const TaskSelect: FC<TaskSelectProps> = ({ multiple, ...props }) => {
  if (multiple) return <TaskMultiSelect {...props} />;
  return <TaskSingleSelect {...props} />;
};

export default memo(TaskSelect);
