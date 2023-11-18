import { FC, memo } from 'react';
import { Select } from '@ui/basics';
import { capitalize } from '@utils/capitalize';
import { useRequest } from '@hooks/useRequest';
import { SelectItem } from '@mantine/core';
import { IOrganizationDisplay } from '@custom-types/data/IOrganization';
import { setter } from '@custom-types/ui/atomic';

const SingleOrganizationSelector: FC<{
  url: string;
  label: string;
  organization: string;
  setOrganization: setter<string>;
}> = ({ url, label, organization, setOrganization }) => {
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
    (res) => {
      if (organization == '') {
        setOrganization(res.response[0].spec);
      }
    },
    undefined,
    10_000
  );

  return (
    <div style={{ width: '100%' }}>
      <Select
        label={label}
        data={data || []}
        disabled={data?.length == 1}
        value={organization}
        onChange={setOrganization}
      />
    </div>
  );
};

export default memo(SingleOrganizationSelector);
