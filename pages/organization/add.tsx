import { useLocale } from '@hooks/useLocale';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { UseFormReturnType } from '@mantine/form';
import { ReactNode, useCallback } from 'react';
import { requestWithNotify } from '@utils/requestWithNotify';
import {
  errorNotification,
  newNotification,
} from '@utils/notificationFunctions';
import Title from '@ui/Title/Title';
import { IOrganizationAdd } from '@custom-types/data/IOrganization';
import Form from '@components/Organization/Form';

const initialValues: IOrganizationAdd = {
  spec: '',
  logo: '',
  title: '',
  description: '',
  email: '',
  active_until: new Date(),
};

function AddOrganization() {
  const { locale, lang } = useLocale();

  const handleSubmit = useCallback(
    (form: UseFormReturnType<IOrganizationAdd>) => {
      if (form.validate().hasErrors) {
        const id = newNotification({});
        errorNotification({
          id,
          title: locale.notify.organization.validation.error,
          autoClose: 5000,
        });
        return;
      }
      requestWithNotify<IOrganizationAdd, string>(
        'organization/add',
        'POST',
        locale.notify.group.create,
        lang,
        (adminPassword: string) =>
          `${locale.organization.add.adminLogin}: admin_${form.values.spec}\n${locale.organization.add.adminPassword}: ${adminPassword}`,
        {
          spec: form.values.spec,
          title: form.values.title,
          description: form.values.description,
          logo: form.values.logo,
          email: form.values.email,
          active_until: form.values.active_until,
        },
        () => {},
        { autoClose: false }
      );
    },
    [locale, lang]
  );

  return (
    <>
      <Title title={locale.titles.organization.add} />
      <Form
        noDefault
        handleSubmit={handleSubmit}
        initialValues={initialValues}
      />
    </>
  );
}

AddOrganization.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default AddOrganization;
