import { setter } from '@custom-types/ui/atomic';
import { useLocale } from '@hooks/useLocale';
import { FC, useEffect } from 'react';


import { IOrganizationAdd } from '@custom-types/data/IOrganization';
import { UseFormReturnType, useForm } from '@mantine/form';
import Preview from './Preview/Preview';
import ExtraInfo from './ExtraInfo/ExtraInfo';
import MainInfo from './MainInfo/MainInfo';
import Stepper from '@ui/Stepper/Stepper';

const stepFields = [
  ['spec', 'title', 'logo'],
  ['description', 'email', 'active_until'],
  [],
];

const Form: FC<{
  handleSubmit: setter<UseFormReturnType<IOrganizationAdd>>;
  initialValues: IOrganizationAdd;
  buttonLabel: string;
  noDefault?: boolean;
}> = ({ handleSubmit, initialValues, buttonLabel, noDefault }) => {
  const { locale } = useLocale();

  const form = useForm({
    initialValues,
    validate: {
      spec: (value) =>
        value.length < 5
          ? locale.organization.form.validation.specLength
          : !value.match(/^[a-zA-Z][a-zA-Z_]+$/)
          ? locale.organization.form.validation.specSymbols
          : null,
      title: (value) =>
        value.length < 5
          ? locale.organization.form.validation.title
          : null,
      description: (value) =>
        value.length < 10
          ? locale.organization.form.validation.description
          : null,
      email: (value) =>
        value.length > 0 &&
        !value.toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
          ? locale.organization.form.validation.email
          : null,
      active_until: (value) =>
        !value
          ? locale.organization.form.validation.activeUntil
          : null,
    },
    validateInputOnBlur: true,
    validateInputOnChange: true,
  });

  useEffect(() => {
    form.setValues(initialValues);
  }, [initialValues]); //eslint-disable-line

  return (
    <Stepper
      buttonLabel={buttonLabel}
      form={form}
      handleSubmit={() => handleSubmit(form)}
      stepFields={stepFields}
      pages={[
        <MainInfo key={0} form={form} />,
        <ExtraInfo key={1} form={form} />,
        <Preview key={2} form={form} />,
      ]}
      labels={locale.organization.form.steps.labels}
      descriptions={locale.organization.form.steps.descriptions}
      noDefault={noDefault}
    />
  );
};

export default Form;
