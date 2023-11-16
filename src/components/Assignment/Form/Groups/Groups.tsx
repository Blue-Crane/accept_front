import { FC, memo, useState } from 'react';
import { GroupSelector } from '@ui/selectors';

const Groups: FC<{ form: any }> = ({ form }) => {
  const [groups, setGroups] = useState(
    form.values.roles.map((item: number) => item.toString())
  );

  return (
    <>
      <GroupSelector
        width="80%"
        form={form}
        selectedGroups={groups}
        setGroups={setGroups}
        field={'groups'}
      />
    </>
  );
};

export default memo(Groups);
