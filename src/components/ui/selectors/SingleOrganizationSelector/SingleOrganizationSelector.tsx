import { FC, memo } from 'react';
import { Select } from '@ui/basics';
import { capitalize } from '@utils/capitalize';
import { useRequest } from '@hooks/useRequest';
import { SelectItem } from '@mantine/core';
import { IOrganizationDisplay } from '@custom-types/data/IOrganization';

const SingleOrganizationSelector: FC<{
  url: string;
  label: string;
  form: any;
  field: string;
}> = ({ url, label, form, field }) => {
  const { data, loading } = useRequest<
    {},
    IOrganizationDisplay[],
    SelectItem[]
  >(
    url,
    'GET',
    undefined,
    (organizations) =>
      organizations.map(
        (item) =>
          ({
            label: capitalize(item.title),
            value: item.spec,
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

export default memo(SingleOrganizationSelector);
