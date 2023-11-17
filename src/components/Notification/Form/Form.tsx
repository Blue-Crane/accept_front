import { FC, memo, useCallback } from 'react';
import { useLocale } from '@hooks/useLocale';
import { useForm } from '@mantine/form';
import { requestWithNotify } from '@utils/requestWithNotify';
import MainInfo from './MainInfo';
import DescriptionInfo from './DescriptionInfo';
import {
  errorNotification,
  newNotification,
} from '@utils/notificationFunctions';
import Stepper from '@ui/Stepper/Stepper';
import { INewNotification } from '@custom-types/data/notification';
import OrganizationsRoles from './OrganizationsRoles';
import GroupsUsers from './GroupsUsers';

const stepFields = [
  ['title', 'author'],
  ['shortDescription', 'description'],
  [],
  ['logins', 'groups', 'roles'],
];

const Form: FC<{
  noDefault?: boolean;
}> = ({ noDefault }) => {
  const { locale, lang } = useLocale();

  const form = useForm({
    initialValues: {
      spec: '',
      title: '',
      author: '',
      shortDescription: '',
      description: '',
      logins: [],
      broadcast: false,
      groups: [],
      roles: [],
      organizations: [],
    },
    validate: {
      title: (value) =>
        value.length < 5
          ? locale.notification.form.validate.title
          : null,

      shortDescription: () => null,
      description: (value) =>
        value.length < 20
          ? locale.notification.form.validate.description
          : null,

      logins: (value, values) =>
        !values.broadcast &&
        !(values.logins.length > 0) &&
        !(values.groups.length > 0) &&
        !(values.roles.length > 0)
          ? locale.notification.form.validate.users
          : null,
      groups: (value, values) =>
        !values.broadcast &&
        !(values.logins.length > 0) &&
        !(values.groups.length > 0) &&
        !(values.roles.length > 0)
          ? locale.notification.form.validate.users
          : null,
      roles: (value, values) =>
        !values.broadcast &&
        !(values.logins.length > 0) &&
        !(values.groups.length > 0) &&
        !(values.roles.length > 0)
          ? locale.notification.form.validate.users
          : null,
      organizations: (value, values) =>
        !(value.length > 0)
          ? locale.notification.form.validate.organizations
          : null,
    },
    validateInputOnBlur: true,
  });

  const handleSubmit = useCallback(() => {
    if (form.validate().hasErrors) {
      const id = newNotification({});
      errorNotification({
        id,
        title: locale.validationError,
        autoClose: 5000,
      });
      return;
    }
    const body: INewNotification = {
      ...form.values,
    };
    requestWithNotify<INewNotification, string>(
      'notification/add',
      'POST',
      locale.notify.notification.create,
      lang,
      (_: string) => '',
      body
    );
  }, [form, locale, lang]);

  return (
    <>
      <Stepper
        buttonLabel={locale.create}
        form={form}
        handleSubmit={handleSubmit}
        stepFields={stepFields}
        noDefault={noDefault}
        pages={[
          <MainInfo key="1" form={form} />,
          <DescriptionInfo key="2" form={form} />,
          <OrganizationsRoles key="3" form={form} />,
          <GroupsUsers key="4" form={form} />,
        ]}
        labels={locale.notification.form.steps.labels}
        descriptions={locale.notification.form.steps.descriptions}
      />
    </>
  );
};

export default memo(Form);
