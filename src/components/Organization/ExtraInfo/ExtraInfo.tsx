import { IOrganizationAdd } from '@custom-types/data/IOrganization';
import { useLocale } from '@hooks/useLocale';
import { UseFormReturnType } from '@mantine/form';
import { CustomEditor, DateTimePicker, TextInput } from '@ui/basics';
import { FC, memo } from 'react';

const RestInfo: FC<{
  form: UseFormReturnType<IOrganizationAdd>;
}> = ({ form }) => {
  const { locale } = useLocale();
  return (
    <div>
      <TextInput
        label={locale.organization.form.email}
        {...form.getInputProps('email')}
      />
      <CustomEditor
        label={locale.organization.form.description}
        form={form}
        name={'description'}
      />
      <DateTimePicker
        label={locale.organization.form.activeUntil}
        {...form.getInputProps('active_until')}
      />
    </div>
  );
};

export default memo(RestInfo);
