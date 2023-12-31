import { useLocale } from '@hooks/useLocale';
import { FC, memo, useCallback, useMemo } from 'react';
import { CustomEditor, Radio, Switch, TextInput } from '@ui/basics';
import { TagSelector } from '@ui/selectors';
import styles from './mainInfo.module.css';
import { IAssessmentType } from '@custom-types/data/atomic';
import { Item } from '@ui/CustomTransferList/CustomTransferList';

const MainInfo: FC<{
  form: any;
  assessmentTypes: IAssessmentType[];
}> = ({ form, assessmentTypes }) => {
  const { locale } = useLocale();

  const initialTags = useMemo(
    () => {
      return form.values.tags;
    },
    [form.values.tags.length] // eslint-disable-line
  );

  const assessmentTypeItems = useMemo(
    () =>
      assessmentTypes.map((assessmentType) => ({
        value: assessmentType.spec.toString(),
        label:
          locale.tournament.form.assessmentType.variants[
            assessmentType.spec
          ],
      })),
    [locale, assessmentTypes]
  );

  const handlerAssessmentType = useCallback(
    (value: string) => {
      form.setFieldValue('assessmentType', value);
    },
    [form]
  );

  const setUsed = useCallback(
    (value: Item[]) => form.setFieldValue('tags', value),
    [form.setFieldValue] // eslint-disable-line
  );

  return (
    <>
      <TextInput
        size="lg"
        label={locale.tournament.form.title}
        required
        {...form.getInputProps('title')}
      />
      <CustomEditor
        label={locale.tournament.form.description}
        form={form}
        name={'description'}
      />
      <TagSelector
        initialTags={initialTags}
        setUsed={setUsed}
        fetchURL={'tournament_tag/list'}
        addURL={'tournament_tag/add'}
        updateURL={'tournament_tag/edit'}
        deleteURL={'tournament_tag/delete'}
        form={form}
        field={'tags'}
      />
      <div className={styles.radioGroups}>
        <Radio
          label={locale.tournament.form.assessmentType.title}
          field={'assessmentType'}
          form={form}
          items={assessmentTypeItems}
          onChange={handlerAssessmentType}
        />
        <Switch
          label={locale.tournament.form.allowRegistrationAfterStart}
          {...form.getInputProps('allowRegistrationAfterStart', {
            type: 'checkbox',
          })}
        />
        <Switch
          label={locale.tournament.form.shouldPenalizeAttempt}
          {...form.getInputProps('shouldPenalizeAttempt', {
            type: 'checkbox',
          })}
        />
      </div>
    </>
  );
};

export default memo(MainInfo);
