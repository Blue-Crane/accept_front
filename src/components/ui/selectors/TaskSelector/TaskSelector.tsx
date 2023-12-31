import { useLocale } from '@hooks/useLocale';

import {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import styles from './taskSelector.module.css';
import { sendRequest } from '@requests/request';
import { ITaskDisplay } from '@custom-types/data/ITask';
import {
  CustomTransferList,
  Item,
} from '@ui/CustomTransferList/CustomTransferList';
import { TaskItem } from './TaskItem/TaskItem';
import { setter } from '@custom-types/ui/atomic';
import { LoadingOverlay } from '@ui/basics';

const TaskSelector: FC<{
  initialTasks: Item[];
  setUsed: setter<any>;
  classNames?: object;
}> = ({ setUsed, classNames, initialTasks }) => {
  const { locale } = useLocale();

  const [tasks, setTasks] = useState<ITaskDisplay[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedTasks, availableTasks] = useMemo(() => {
    const selected = initialTasks.map((task) => task.value);
    let newAvailableTasks: Item[] = [];
    let newSelectedTasks: Item[] = [];

    for (let i = 0; i < tasks.length; i++) {
      const task = {
        value: tasks[i].spec,
        label: tasks[i].title,
      };
      if (!selected.includes(task.value)) {
        newAvailableTasks.push(task);
      } else {
        newSelectedTasks.push(task);
      }
    }
    return [newSelectedTasks, newAvailableTasks];
  }, [initialTasks, tasks]);

  const refetch = useCallback(async () => {
    setLoading(true);
    sendRequest<{}, ITaskDisplay[]>(
      'task/list',
      'GET',
      undefined,
      3000
    ).then((res) => {
      if (res.error) return;
      setTasks(res.response);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    refetch();
  }, []); // eslint-disable-line

  const itemComponent = useCallback(
    (item: any, handleSelect: any) => {
      return (
        <TaskItem item={item} onSelect={() => handleSelect(item)} />
      );
    },
    []
  );

  return (
    <div className={styles.wrapper}>
      <LoadingOverlay visible={loading} />
      {!loading && (
        <CustomTransferList
          defaultOptions={availableTasks}
          defaultChosen={selectedTasks}
          setUsed={setUsed}
          classNames={classNames ? classNames : {}}
          titles={[
            locale.assignmentSchema.form.taskSelector.available,
            locale.assignmentSchema.form.taskSelector.used,
          ]}
          itemComponent={itemComponent}
        />
      )}
    </div>
  );
};

export default memo(TaskSelector);
