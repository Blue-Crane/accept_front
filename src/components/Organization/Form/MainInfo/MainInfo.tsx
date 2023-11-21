import { IOrganizationAdd } from '@custom-types/data/IOrganization';
import { useLocale } from '@hooks/useLocale';
import { UseFormReturnType } from '@mantine/form';
import ImageUploader from '@ui/ImageUploader/ImageUploader';
import { TextInput } from '@ui/basics';
import { FC, memo } from 'react';

const MainInfo: FC<{
  form: UseFormReturnType<IOrganizationAdd>;
}> = ({ form }) => {
  const { locale } = useLocale();
  return (
    <>
      <TextInput
        label={locale.organization.form.spec}
        {...form.getInputProps('spec')}
      />
      <TextInput
        label={locale.organization.form.title}
        {...form.getInputProps('title')}
      />
      <ImageUploader
        label={locale.organization.form.logo}
        setUrl={(url: string) => form.setFieldValue('logo', url)}
      />
    </>
  );
};

export default memo(MainInfo);
