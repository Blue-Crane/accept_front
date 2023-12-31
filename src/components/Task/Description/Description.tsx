import { FC, memo, useEffect } from 'react';
import { ITask } from '@custom-types/data/ITask';
import styles from './description.module.css';
import { Table } from '@mantine/core';
import { useLocale } from '@hooks/useLocale';

import CopyButton from '@ui/CopyButton/CopyButton';

import { sendRequest } from '@requests/request';
import { setter } from '@custom-types/ui/atomic';
import { AlertCircle } from 'tabler-icons-react';
import TagList from '@ui/TagList/TagList';

const Description: FC<{
  task: ITask;
  setShowHint: setter<boolean>;
  preview?: boolean;
  languagesRestrictions?: boolean;
}> = ({ task, preview, setShowHint, languagesRestrictions }) => {
  const { locale } = useLocale();

  useEffect(() => {
    if (preview) return;
    sendRequest<{}, boolean>(
      `task/should_show_hint/${task.spec}`,
      'GET',
      undefined,
      5000
    ).then((res) => {
      setShowHint(res.response);
    });
  }, [task.spec, setShowHint, preview]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <div className={styles.title}>{task.title}</div>
        <div
          className={styles.complexity}
        >{`${locale.task.complexity} ${task.complexity}%`}</div>
      </div>
      <div className={styles.constraints}>
        <div
          className={styles.memory}
        >{`${locale.task.constraints.memory}: ${task.constraints.memory}Mb`}</div>
        <div
          className={styles.time}
        >{`${locale.task.constraints.time}: ${task.constraints.time}s`}</div>
      </div>
      <div className={styles.tags}>
        <TagList tags={task.tags} />
      </div>
      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: task.description }}
      />
      {languagesRestrictions && (
        <div className={styles.languagesRestrictions}>
          <AlertCircle color={'var(--negative)'} />

          <div className={styles.alert}>
            {locale.task.description.languagesRestrictions}
          </div>
        </div>
      )}
      <div className={styles.formatWrapper}>
        <div className={styles.inputFormat}>
          <div className={styles.formatLabel}>
            {locale.task.description.format.input}
          </div>
          <div
            className={styles.inputFormat}
            dangerouslySetInnerHTML={{ __html: task.inputFormat }}
          />
        </div>
        <div className={styles.outputFormat}>
          <div className={styles.formatLabel}>
            {locale.task.description.format.output}
          </div>
          <div
            className={styles.outputFormat}
            dangerouslySetInnerHTML={{ __html: task.outputFormat }}
          />
        </div>
      </div>
      <div className={styles.tablesWrapper}>
        <div className={styles.examplesLabel}>
          {locale.task.description.examples.title}
        </div>
        {task.examples.map((example, index) => (
          <Table
            key={index}
            striped
            verticalSpacing="md"
            className={styles.table}
          >
            <tbody className={styles.tbody}>
              <tr>
                <td>
                  <div className={styles.exampleHeader}>
                    {locale.task.description.examples.input}
                    <CopyButton toCopy={example.inputData} />
                  </div>
                </td>
              </tr>
              <tr>
                <td className={styles.exampleData}>
                  {example.inputData}
                </td>
              </tr>
              <tr>
                <td>
                  <div className={styles.exampleHeader}>
                    {locale.task.description.examples.output}
                    <CopyButton toCopy={example.outputData || ''} />
                  </div>
                </td>
              </tr>
              <tr>
                <td className={styles.exampleData}>
                  {example.outputData}
                </td>
              </tr>
            </tbody>
          </Table>
        ))}
      </div>
      {task.remark && (
        <div className={styles.remarkWrapper}>
          <div className={styles.remarkLabel}>
            {locale.task.form.remark}
          </div>
          <div
            className={styles.remark}
            dangerouslySetInnerHTML={{ __html: task.remark }}
          />
        </div>
      )}
    </div>
  );
};

export default memo(Description);
