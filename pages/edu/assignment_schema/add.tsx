import { useLocale } from '@hooks/useLocale';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { UseFormReturnType } from '@mantine/form';
import { ReactNode, useCallback } from 'react';
import { useUser } from '@hooks/useUser';
import Form from '@components/AssignmentSchema/Form/Form';

import { IAssignmentSchema } from '@custom-types/data/IAssignmentSchema';
import { Item } from '@ui/CustomTransferList/CustomTransferList';
import { requestWithNotify } from '@utils/requestWithNotify';
import {
  errorNotification,
  newNotification,
} from '@utils/notificationFunctions';

const initialValues = {
  spec: '',
  title: '',
  description: '',
  author: '',
  tasks: [],
  defaultDuration: 40, // minutes
  tags: [],
};

function AddAssignmentSchema() {
  const { locale, lang } = useLocale();
  const { user } = useUser();

  const handleSubmit = useCallback(
    (form: UseFormReturnType<any>) => {
      if (form.validate().hasErrors) {
        const id = newNotification({});
        errorNotification({
          id,
          title: locale.validationError,
          autoClose: 5000,
        });
        return;
      }
      let body: any = {
        ...form.values,
        author: user?.shortName || 'undefined',
        tasks: form.values['tasks'].map((task: Item) => task.value),
        defaultDuration: form.values.defaultDuration * 60 * 1000, // from minutes to milliseconds
        tags: form.values['tags'].map((tag: Item) => tag.value),
      };
      requestWithNotify(
        'assignment_schema/add',
        'POST',
        locale.notify.assignmentSchema.create,
        lang,
        (response: IAssignmentSchema) => response.spec,
        body
      );
    },
    [user, locale, lang]
  );

  return (
    <>
      <Form
        initialValues={initialValues}
        handleSubmit={handleSubmit}
        buttonLabel={locale.form.create}
      />
    </>
  );
}

AddAssignmentSchema.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default AddAssignmentSchema;
