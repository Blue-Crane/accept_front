import { Overlay } from '@ui/basics';
import { GroupSelector, UserSelector } from '@ui/selectors';
import { FC, memo, useState } from 'react';

const GroupsUsers: FC<{ form: any }> = ({ form }) => {
  const [groups, setGroups] = useState(
    form.values.groups.map((item: number) => item.toString())
  );

  return (
    <div style={{ position: 'relative' }}>
      {form.values.broadcast && <Overlay />}
      <GroupSelector
        form={form}
        selectedGroups={groups}
        setGroups={setGroups}
        field={'groups'}
      />
      <UserSelector
        setUsers={(data: string[]) =>
          form.setFieldValue('logins', data)
        }
        selectedUsers={form.values.logins}
      />
    </div>
  );
};

export default memo(GroupsUsers);
