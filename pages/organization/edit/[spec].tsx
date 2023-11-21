import Form from '@components/Organization/Form/Form';
import { useLocale } from '@hooks/useLocale';
import { ReactNode, useCallback, useMemo } from 'react';
import { DefaultLayout } from '@layouts/DefaultLayout';
import {
  IOrganizationEdit,
  IOrganizationFull,
} from '@custom-types/data/IOrganization';

import { getApiUrl } from '@utils/getServerUrl';
import { GetServerSideProps } from 'next';
import { requestWithNotify } from '@utils/requestWithNotify';
import {
  errorNotification,
  newNotification,
} from '@utils/notificationFunctions';
import { UseFormReturnType } from '@mantine/form';

import Title from '@ui/Title/Title';

function EditOrganization(organization: IOrganizationFull) {
  const { locale, lang } = useLocale();

  const formValues: IOrganizationEdit = useMemo(
    () => ({
      ...organization,
      principal: organization.principal.login,
      active_until: new Date(organization.active_until),
    }),
    [organization] //eslint-disable-line
  );

  const handleSubmit = useCallback(
    (form: UseFormReturnType<any>) => {
      if (form.validate().hasErrors) {
        const id = newNotification({});
        errorNotification({
          id,
          title: locale.notify.organization.validation.error,
          autoClose: 5000,
        });
        return;
      }
      requestWithNotify<IOrganizationEdit, boolean>(
        'organization/edit',
        'PUT',
        locale.notify.organization.edit,
        lang,
        (response: boolean) => '',
        {
          spec: form.values.spec,
          title: form.values.title,
          description: form.values.description,
          logo: form.values.logo,
          email: form.values.email,
          active_until: form.values.active_until,
          principal: form.values.principal,
        } as IOrganizationEdit
      );
    },
    [
      locale.notify.organization.edit,
      locale.notify.organization.validation.error,
      lang,
    ]
  );
  return (
    <>
      <Title title={locale.titles.organization.edit} />
      <Form
        handleSubmit={handleSubmit}
        initialValues={formValues}
        buttonLabel={locale.form.update}
        isEdit
      />
    </>
  );
}

EditOrganization.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default EditOrganization;

const API_URL = getApiUrl();

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  if (!query.spec) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
    };
  }
  const spec = query.spec;
  const response = await fetch(
    `${API_URL}/api/organization/${spec}`,
    {
      method: 'GET',
      headers: {
        cookie: req.headers.cookie,
        'content-type': 'application/json',
      } as { [key: string]: string },
    }
  );

  if (response.status === 200) {
    const response_json = await response.json();

    return {
      props: response_json,
    };
  }
  return {
    redirect: {
      permanent: false,
      destination: '/404',
    },
  };
};
