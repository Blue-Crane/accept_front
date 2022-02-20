import { useLocale } from '@hooks/useLocale';
import { Tabs } from '@mantine/core';
import { FC, memo, ReactNode } from 'react';

const TaskLayout: FC<{
  description: ReactNode;
  send: ReactNode;
  results: ReactNode;
}> = ({ description, send, results }) => {
  const { locale } = useLocale();

  return (
    <Tabs grow style={{ width: '100%', height: '100%' }}>
      <Tabs.Tab label={locale.pages.tasks.task.description}>
        {description}
      </Tabs.Tab>
      <Tabs.Tab label={locale.pages.tasks.task.send}>{send}</Tabs.Tab>
      <Tabs.Tab label={locale.pages.tasks.task.results}>{results}</Tabs.Tab>
    </Tabs>
  );
};

export default memo(TaskLayout);
