import { useLocale } from '@hooks/useLocale';
import { FC, memo, useMemo } from 'react';
import { CustomEditor, NumberInput, TextInput } from '@ui/basics';
import { TagSelector } from '@ui/selectors';
import { useCallback } from 'react';
import { ITag } from '@custom-types/data/ITag';

const MainInfo: FC<{ form: any }> = ({ form }) => {
  const { locale } = useLocale();

  const initialTags = useMemo(
    () => {
      return form.values.tags;
    },
    [form.values.tags.length] // eslint-disable-line
  );

  const setUsed = useCallback(
    (value: ITag[]) => form.setFieldValue('tags', value),
    [form.setFieldValue] // eslint-disable-line
  );

  return (
    <>
      <TextInput
        label={locale.assignmentSchema.form.title}
        required
        {...form.getInputProps('title')}
      />
      <CustomEditor
        label={locale.task.form.description}
        form={form}
        name={'description'}
      />
      <TagSelector
        initialTags={initialTags}
        setUsed={setUsed}
        fetchURL={'assignment_tag/list'}
        addURL={'assignment_tag/add'}
        updateURL={'assignment_tag/edit'}
        deleteURL={'assignment_tag/delete'}
        form={form}
        field={'tags'}
      />
      <NumberInput
        label={locale.assignmentSchema.form.defaultDuration}
        min={0}
        {...form.getInputProps('defaultDuration')}
      />
    </>
  );
};

export default memo(MainInfo);
