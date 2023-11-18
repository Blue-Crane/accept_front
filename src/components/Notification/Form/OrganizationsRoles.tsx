import { OrganizationSelector, RoleSelector } from '@ui/selectors';
import { FC, memo, useState } from 'react';
import { Overlay, Switch } from '@ui/basics';
import { useLocale } from '@hooks/useLocale';

const OrganizationsRoles: FC<{
  form: any;
}> = ({ form }) => {
  const { locale } = useLocale();

  const [roles, setRoles] = useState(
    form.values.roles.map((item: number) => item.toString())
  );

  const [organizations, setOrganizations] = useState(
    form.values.organizations
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

      <OrganizationSelector
        url={'organization/notification_add/write'}
        form={form}
        selectedOrganizations={organizations}
        setOrganizations={setOrganizations}
        field={'organizations'}
      />
      <div style={{ position: 'relative' }}>
        {form.values.broadcast && <Overlay />}
        <RoleSelector
          form={form}
          selectedRoles={roles}
          setRoles={setRoles}
          field={'roles'}
        />
      </div>
    </>
  );
};

export default memo(OrganizationsRoles);
