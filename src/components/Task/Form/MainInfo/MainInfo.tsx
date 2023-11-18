import { useLocale } from '@hooks/useLocale';
import { FC, memo, useCallback, useMemo } from 'react';
import {
  SingleOrganizationSelector,
  TagSelector,
} from '@ui/selectors';
import styles from './mainInfo.module.css';
import { ITaskCheckType, ITaskType } from '@custom-types/data/atomic';
import { NumberInput, Radio, Switch, TextInput } from '@ui/basics';
import { Item } from '@custom-types/ui/atomic';

const MainInfo: FC<{
  form: any;
  taskTypes: ITaskType[];
  taskCheckTypes: ITaskCheckType[];
  blurOrganization?: boolean;
}> = ({ form, taskTypes, taskCheckTypes, blurOrganization }) => {
  const { locale } = useLocale();
  const initialTags = useMemo(
    () => {
      return form.values.tags;
    },
    [form.values.tags.length] // eslint-disable-line
  );

  const taskCheckTypeItems = useMemo(
    () =>
      taskCheckTypes.map((checkType) => ({
        value: checkType.spec.toString(),
        label: locale.task.form.checkTypes[checkType.spec],
      })),
    [locale, taskCheckTypes]
  );

  const taskTypeItems = useMemo(
    () =>
      taskTypes.map((taskType) => ({
        value: taskType.spec.toString(),
        label: locale.task.form.taskTypes[taskType.spec],
      })),
    [locale, taskTypes]
  );

  const handlerTaskType = useCallback(
    (value: string) => {
      form.setFieldValue('taskType', value);
      value === '1' ? form.setFieldValue('checkType', '0') : () => {};
      form.validateField('tests');
    },
    [form]
  );

  const setUsed = useCallback(
    (value: Item[]) => form.setFieldValue('tags', value),
    [form.setFieldValue] // eslint-disable-line
  );

  return (
    <>
      <SingleOrganizationSelector
        url={`organization/task_add/write`}
        disabled={!!blurOrganization}
        label={locale.task.form.organization}
        organization={form.values.organization}
        setOrganization={(new_organization) =>
          form.setFieldValue('organization', new_organization)
        }
      />
      <TextInput
        label={locale.task.form.title}
        required
        {...form.getInputProps('title')}
      />

      <TagSelector
        initialTags={initialTags}
        setUsed={setUsed}
        fetchURL={'tag/list'}
        addURL={'tag/add'}
        updateURL={'tag/edit'}
        deleteURL={'tag/delete'}
        form={form}
        field={'tags'}
      />

      <NumberInput
        label={locale.task.form.complexity}
        required
        noClampOnBlur
        hideControls
        {...form.getInputProps('complexity')}
      />
      <div className={styles.radioGroups}>
        <Radio
          label={locale.task.form.taskType}
          field={'taskType'}
          form={form}
          items={taskTypeItems}
          onChange={handlerTaskType}
          helperContent={
            <div>
              {locale.helpers.task.taskType.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          }
        />
        {form.values.taskType === '0' && (
          <Radio
            label={locale.task.form.checkType}
            field={'checkType'}
            form={form}
            items={taskCheckTypeItems}
            onChange={(value) => {
              form.setFieldValue('checkType', value);
              form.validateField('tests');
            }}
          />
        )}
        {!form.values.isTournament && (
          <Switch
            label={locale.task.form.hint.title}
            {...form.getInputProps('hasHint', { type: 'checkbox' })}
          />
        )}
      </div>
    </>
  );
};

export default memo(MainInfo);
