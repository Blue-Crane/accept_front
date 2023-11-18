import React, { FC, memo } from 'react';
import { MultiSelect } from '@ui/basics';
import { TaskSelectProps } from './TaskSelect';
import { useRequest } from '@hooks/useRequest';
import { SelectItem } from '@mantine/core';
import { ITaskBaseInfo } from '@custom-types/data/ITask';

const TaskMultiSelect: FC<TaskSelectProps> = ({
  url,
  label,
  placeholder,
  nothingFound,
  select,
  multiple: _multiple,
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
      <MultiSelect
        searchable
        data={data || []}
        label={label}
        placeholder={placeholder}
        clearable
        maxDropdownHeight={400}
        nothingFound={nothingFound}
        filter={(value, selected, item) =>
          item.label
            ?.toLowerCase()
            .includes(value.toLowerCase().trim()) ||
          item.value
            .toLowerCase()
            .includes(value.toLowerCase().trim())
        }
        {...additionalProps}
        onChange={(specs) => {
          select(specs);
          additionalProps?.onChange(specs);
        }}
      />
    </>
  );
};

export default memo(TaskMultiSelect);
