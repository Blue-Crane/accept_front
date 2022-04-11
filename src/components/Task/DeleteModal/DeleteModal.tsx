import Notify from '@ui/Notify/Notify';
import { ITask, ITaskDisplay } from '@custom-types/ITask';
import { useLocale } from '@hooks/useLocale';
import { Button, Group, Modal } from '@mantine/core';
import { isSuccessful, sendRequest } from '@requests/request';
import { capitalize } from '@utils/capitalize';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  FC,
  memo,
  useCallback,
  useEffect,
  useState,
  useMemo,
} from 'react';
import deleteModalStyles from '@styles/ui/deleteModal.module.css';

const DeleteModal: FC<{
  active: boolean;
  setActive: (_: boolean) => void;
  task: ITaskDisplay;
}> = ({ active, setActive, task }) => {
  const [assignments, setAssignments] = useState<ITask[]>([]);
  const { locale } = useLocale();
  const router = useRouter();
  const defaultStatuses = useMemo(
    () => ({
      error: locale.tasks.delete.error,
      ok: locale.tasks.delete.success,
    }),
    [locale]
  );
  const [error, setError] = useState(false);
  const [notify, setNotify] = useState(false);
  const [notificationDescription, setNotificationDescription] =
    useState('');

  useEffect(() => {
    let cleanUp = false;

    sendRequest<{}, ITask[]>(
      `/tasks/connected_assignments/${task.spec}`,
      'POST'
    ).then((res) => {
      if (res && !cleanUp) {
        setAssignments(res);
      }
    });

    return () => {
      cleanUp = true;
    };
  }, [task]);

  const handleDelete = useCallback(() => {
    let cleanUp = false;
    isSuccessful<{}>('/tasks/delete', 'POST', {
      spec: task.spec,
    }).then((res) => {
      setActive(false);
      if (res && !cleanUp) {
        setNotify(true);
        setNotificationDescription(capitalize(defaultStatuses.ok));
        router.push('/edu/task/list');
      } else {
        setNotify(true);
        setError(true);
        setNotificationDescription(capitalize(defaultStatuses.error));
      }
    });

    return () => {
      cleanUp = true;
    };
  }, [
    task.spec,
    defaultStatuses.ok,
    defaultStatuses.error,
    setActive,
    router,
  ]);

  return (
    <>
      <div className={deleteModalStyles.notification}>
        <Notify
          answer={notify}
          error={error}
          setAnswer={setNotify}
          description={notificationDescription}
        />
      </div>
      <Modal
        opened={active}
        centered
        hideCloseButton
        onClose={() => setActive(false)}
        size="lg"
        title={
          capitalize(locale.tasks.modals.delete) +
          ` '${task.title}' ?`
        }
        classNames={{
          title: deleteModalStyles.modalTitle,
        }}
      >
        <div className={deleteModalStyles.form}>
          <div className={deleteModalStyles.question}>
            {capitalize(locale.tasks.modals.deleteConfidence)}
          </div>
          {assignments.length > 0 && (
            <div>
              <div>
                {capitalize(locale.tasks.modals.usedInAssignments) +
                  ` (${assignments.length}):`}
              </div>
              <br />
              <div className={deleteModalStyles.assignmentList}>
                {assignments.map((assignment, index) => (
                  <div key={index}>
                    <Link href={`/edu/assignment/${assignment.spec}`}>
                      <a
                        className={deleteModalStyles.assignmentLink}
                        target="_blank"
                      >
                        {assignment.title}
                      </a>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
          <Group
            position="right"
            spacing="lg"
            className={deleteModalStyles.buttons}
          >
            <Button
              variant="outline"
              color="green"
              autoFocus
              onClick={() => setActive(false)}
            >
              {capitalize(locale.cancel)}
            </Button>
            <Button
              variant="outline"
              color="red"
              onClick={() => handleDelete()}
            >
              {capitalize(locale.delete)}
            </Button>
          </Group>
        </div>
      </Modal>
    </>
  );
};

export default memo(DeleteModal);
