import { setter } from '@custom-types/ui/atomic';
import { useLocale } from '@hooks/useLocale';
import { FC, useEffect } from 'react';
import styles from './form.module.css';
import stepperStyles from '@styles/ui/stepper.module.css';
import {
  Button,
  CustomEditor,
  DateTimePicker,
  TextInput,
} from '@ui/basics';
import { IOrganizationAdd } from '@custom-types/data/IOrganization';
import { FileInput } from '@mantine/core';
import { UseFormReturnType, useForm } from '@mantine/form';

const Form: FC<{
  handleSubmit: setter<UseFormReturnType<IOrganizationAdd>>;
  initialValues: IOrganizationAdd;
  noDefault?: boolean;
}> = ({ handleSubmit, initialValues, noDefault }) => {
  const { locale } = useLocale();

  const form = useForm({
    initialValues,
    validate: {
      spec: (value) => null,
    },
    validateInputOnBlur: true,
    validateInputOnChange: true,
  });

  useEffect(() => {
    form.setValues(initialValues);
  }, [initialValues]); //eslint-disable-line

  return (
    <div
      className={noDefault ? styles.wrapper : stepperStyles.wrapper}
    >
      <TextInput {...form.getInputProps('spec')} />
      <TextInput {...form.getInputProps('email')} />
      <TextInput {...form.getInputProps('title')} />
      <CustomEditor
        label={locale.task.form.description}
        form={form}
        name={'description'}
      />
      <DateTimePicker {...form.getInputProps('active_until')} />
      <FileInput />
      <Button onClick={() => handleSubmit(form)} />
    </div>
  );
};

export default Form;
