import { FC, memo } from 'react';
import { IRole } from '@custom-types/data/atomic';
import { Select } from '@ui/basics';
import { capitalize } from '@utils/capitalize';
import { useRequest } from '@hooks/useRequest';
import { SelectItem } from '@mantine/core';

const SingleRoleSelector: FC<{
  label: string;
  form: any;
  field: string;
}> = ({ label, form, field }) => {
  const { data, loading } = useRequest<{}, IRole[], SelectItem[]>(
    'role',
    'GET',
    undefined,
    (roles) =>
      roles.map(
        (item) =>
          ({
            label: capitalize(item.name),
            value: item.spec.toString(),
          } as SelectItem)
      ),
    undefined,
    undefined,
    10_000
  );

  return (
    <div style={{ width: '100%' }}>
      <Select
        label={label}
        data={data}
        {...form.getInputProps(field)}
      />
    </div>
  );
};

export default memo(SingleRoleSelector);
