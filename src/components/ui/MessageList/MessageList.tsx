import styles from './messageList.module.css';
import {
  ChangeEvent,
  FC,
  ReactNode,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Pagination, Tooltip } from '@mantine/core';
import { Checkbox, Icon, LoadingOverlay } from '@ui/basics';
import { useLocale } from '@hooks/useLocale';
import { getLocalDate } from '@utils/datetime';
import { shrinkText } from '@utils/shrinkText';
import { pureCallback, setter } from '@custom-types/ui/atomic';

const ON_PAGE = 10;

export interface IListMessage {
  spec: string;
  author: string;
  subject: string;
  message: string;
  date: Date;
}

export interface IListAction {
  icon: ReactNode;
  tooltipLabel: string;
  onClick: (_: string[], __: setter<string[]>) => void;
}

const MessageList: FC<{
  messages: IListMessage[];
  loading: boolean;
  actions: IListAction[];
  messageTitle: (_: IListMessage) => ReactNode;
  rowClassName: (_: IListMessage) => string;
  refetch: pureCallback;
  emptyMessage: string;
}> = ({
  messages,
  loading,
  actions,
  messageTitle,
  rowClassName,
  refetch,
  emptyMessage,
}) => {
  const [openedModal, setOpenedModal] = useState(false);
  const [current, setCurrent] = useState(0);
  const [activePage, setPage] = useState(1);

  const displayedMessages = useMemo(() => {
    return messages.slice(
      ON_PAGE * (activePage - 1),
      ON_PAGE * activePage
    );
  }, [activePage, messages]);

  const { locale } = useLocale();

  const [selected, setSelected] = useState<string[]>([]);

  const onCheckboxCheck = useCallback((message: IListMessage) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      if (event.currentTarget.checked) {
        setSelected((selected) => {
          let processedSelected = [...selected];
          processedSelected.push(message.spec);
          return processedSelected;
        });
      } else {
        setSelected((selected) => {
          let processedSelected = [...selected];
          const idx = processedSelected.findIndex(
            (value) => value == message.spec
          );
          if (idx >= 0) processedSelected.splice(idx, 1);
          return processedSelected;
        });
      }
    };
  }, []);

  const handleOpenModal = useCallback(
    (index: number) => {
      setCurrent(index + ON_PAGE * (activePage - 1));
      setOpenedModal(true);
    },
    [activePage]
  );

  const handleCloseModal = useCallback(() => {
    setOpenedModal(false);
    setTimeout(refetch, 500);
  }, [refetch]);

  const totalPages = useMemo(
    () => Math.max(Math.ceil(messages.length / ON_PAGE), 1),
    [messages.length]
  );

  const shouldShowPagination = useMemo(
    () => totalPages > 1,
    [totalPages]
  );

  useEffect(() => {
    setPage((activePage) => Math.min(activePage, totalPages));
  }, [totalPages]);

  return (
    <div className={styles.wrapper}>
      <LoadingOverlay visible={loading} />
      {loading ? (
        <></>
      ) : messages.length > 0 ? (
        <>
          {/* <ReadModal
            opened={openedModal}
            defaultSelected={current}
            messages={messages}
            notLoading
            close={handleCloseModal}
          /> */}
          <div className={styles.utils}>
            {selected.length !== 0 ? (
              <>
                <Tooltip label={locale.notification.list.unselect}>
                  <div>
                    <Checkbox
                      checked={selected.length > 0}
                      indeterminate={
                        selected.length !== messages.length
                      }
                      onChange={() => setSelected([])}
                    />
                  </div>
                </Tooltip>
                <div className={styles.lengthWrapper}>
                  {selected.length}
                </div>

                {actions.map((action, index) => (
                  <Icon
                    key={index}
                    size="xs"
                    tooltipLabel={action.tooltipLabel}
                    onClick={() =>
                      action.onClick(selected, setSelected)
                    }
                  >
                    {action.icon}
                  </Icon>
                ))}
              </>
            ) : (
              <Tooltip label={locale.notification.list.selectAll}>
                <div>
                  <Checkbox
                    checked={false}
                    onChange={() =>
                      setSelected(messages.map((elem) => elem.spec))
                    }
                  />
                </div>
              </Tooltip>
            )}
          </div>
          <div
            className={styles.messages}
            style={{ minHeight: `${55 * ON_PAGE}px` }}
          >
            {displayedMessages.map((message, index) => (
              <div
                key={index}
                className={`${styles.message} ${rowClassName(
                  message
                )}`}
              >
                <div className={styles.checkboxWrapper}>
                  <Checkbox
                    checked={selected.includes(message.spec)}
                    onChange={onCheckboxCheck(message)}
                  />
                </div>
                <div
                  className={styles.messageWrapper}
                  onClick={() => handleOpenModal(index)}
                >
                  <div className={styles.titleWrapper}>
                    <div className={styles.title}>
                      {messageTitle(message)}
                    </div>
                    <div className={styles.subject}>
                      {shrinkText(message.subject, 80)}
                    </div>
                  </div>
                  <div className={styles.author}>
                    {shrinkText(message.author, 12)}
                  </div>
                  <div className={styles.date}>
                    {getLocalDate(message.date)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {shouldShowPagination && (
            <Pagination
              total={totalPages}
              position="center"
              page={activePage}
              onChange={setPage}
            />
          )}
        </>
      ) : (
        <div className={styles.emptyMessage}>{emptyMessage}</div>
      )}
    </div>
  );
};

export default memo(MessageList);
