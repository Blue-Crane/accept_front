import { GroupSelector, RoleSelector } from '@ui/selectors';
import { FC, memo, useState } from 'react';
import { Overlay, Switch } from '@ui/basics';
import { useLocale } from '@hooks/useLocale';

const GroupsRoles: FC<{
  form: any;
}> = ({ form }) => {
  const { locale } = useLocale();

  const [roles, setRoles] = useState(
    form.values.roles.map((item: number) => item.toString())
  );
  const [groups, setGroups] = useState(
    form.values.roles.map((item: number) => item.toString())
  );
  return (
    <>
      <Switch
        label={locale.notification.form.broadcast}
        helperContent={
          <div>
            {locale.helpers.notification.broadcast.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        }
        {...form.getInputProps('broadcast', { type: 'checkbox' })}
      />
      <div style={{ position: 'relative' }}>
        {form.values.broadcast && <Overlay />}
        <RoleSelector
          form={form}
          selectedRoles={roles}
          setRoles={setRoles}
          field={'roles'}
        />
        <GroupSelector
          form={form}
          selectedGroups={groups}
          setGroups={setGroups}
          field={'groups'}
        />
      </div>
    </>
  );
};

export default memo(GroupsRoles);
