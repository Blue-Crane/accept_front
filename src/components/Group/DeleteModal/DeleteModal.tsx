import { useLocale } from '@hooks/useLocale';
import { FC, memo, useCallback, useState } from 'react';
import { requestWithNotify } from '@utils/requestWithNotify';
import SimpleModal from '@ui/SimpleModal/SimpleModal';
import { Icon } from '@ui/basics';
import { IGroupDisplay } from '@custom-types/data/IGroup';
import { Trash } from 'tabler-icons-react';
import modalStyles from '@styles/ui/modal.module.css';
import SimpleButtonGroup from '@ui/SimpleButtonGroup/SimpleButtonGroup';

const DeleteModal: FC<{
  group: IGroupDisplay;
}> = ({ group }) => {
  const { locale, lang } = useLocale();

  const [active, setActive] = useState(false);

  const handleDelete = useCallback(() => {
    requestWithNotify(
      `group/delete/${group.spec}`,
      'DELETE',
      locale.notify.group.delete,
      lang,
      (_: any) => '',
      undefined,
      () => setActive(false)
    );
  }, [group.spec, locale, lang]);

  return (
    <>
      <Icon color="red" size="xs" onClick={() => setActive(true)}>
        <Trash />
      </Icon>
      <SimpleModal
        opened={active}
        close={() => setActive(false)}
        hideCloseButton={true}
        title={locale.group.modals.deletion}
      >
        <div className={modalStyles.verticalContent}>
          <div>
            {locale.group.modals.delete + ` '${group.name}' ?`}
          </div>
          <SimpleButtonGroup
            reversePositive
            actionButton={{
              label: locale.delete,
              onClick: handleDelete,
            }}
            cancelButton={{
              label: locale.cancel,
              onClick: () => setActive(false),
            }}
          />
        </div>
      </SimpleModal>
    </>
  );
};

export default memo(DeleteModal);
