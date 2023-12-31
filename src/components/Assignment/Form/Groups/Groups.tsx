import { FC, memo, useMemo } from 'react';
import { GroupSelector } from '@ui/selectors';
import { IGroup } from '@custom-types/data/IGroup';

const Groups: FC<{ form: any; groups: IGroup[] }> = ({
  form,
  groups,
}) => {
  const initialGroups = useMemo(() => form.values.groups, []); //eslint-disable-line
  return (
    <>
      <GroupSelector
        form={form}
        groups={groups}
        initialGroups={initialGroups}
        field={'groups'}
      />
    </>
  );
};

export default memo(Groups);
