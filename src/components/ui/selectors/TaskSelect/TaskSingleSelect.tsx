import React, { FC, memo } from 'react';
import { Select } from '@ui/basics';
import { TaskSelectProps } from './TaskSelect';
import { useRequest } from '@hooks/useRequest';
import { ITaskBaseInfo } from '@custom-types/data/ITask';
import { SelectItem } from '@mantine/core';

const TaskSingleSelect: FC<TaskSelectProps> = ({
  url,
  label,
  placeholder,
  nothingFound,
  select,
  multiple: _multiplr,
  additionalProps,
}) => {
  const { data } = useRequest<{}, ITaskBaseInfo[], SelectItem[]>(
    url,
    'GET',
    undefined,
    (users) =>
      users.map(
        (item) =>
          ({
            label: item.title,
            value: item.spec,
          } as SelectItem)
      ),
    undefined,
    undefined,
    2_000
  );

  return (
    <>
      <Select
        searchable
        data={data || []}
        label={label}
        placeholder={placeholder}
        clearable
        maxDropdownHeight={400}
        nothingFound={nothingFound}
        filter={(value, item) =>
          item.label
            ?.toLowerCase()
            .includes(value.toLowerCase().trim()) ||
          item.value
            .toLowerCase()
            .includes(value.toLowerCase().trim())
        }
        {...additionalProps}
        onChange={(spec) => {
          select(spec ? [spec] : []);
          additionalProps?.onChange(spec);
        }}
      />
    </>
  );
};

export default memo(TaskSingleSelect);
