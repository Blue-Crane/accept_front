import { IOrganizationDisplay } from '@custom-types/data/IOrganization';
import { setter } from '@custom-types/ui/atomic';
import { FC, memo, useCallback } from 'react';
import modalStyles from '@styles/ui/modal.module.css';
import { requestWithNotify } from '@utils/requestWithNotify';
import SimpleModal from '@ui/SimpleModal/SimpleModal';
import { useLocale } from '@hooks/useLocale';
import SimpleButtonGroup from '@ui/SimpleButtonGroup/SimpleButtonGroup';

const DeleteModal: FC<{
  active: boolean;
  setActive: setter<boolean>;
  organization: IOrganizationDisplay;
}> = ({ active, setActive, organization }) => {
  const { locale, lang } = useLocale();

  const handleDelete = useCallback(() => {
    requestWithNotify(
      `organization/delete/${organization.spec}`,
      'DELETE',
      locale.notify.organization.delete,
      lang,
      (_: any) => '',
      undefined,
      () => setActive(false)
    );
  }, [organization, locale, lang]);

  return (
    <>
      <SimpleModal
        opened={active}
        close={() => setActive(false)}
        hideCloseButton={true}
        title={locale.organization.modals.deletion}
      >
        <div className={modalStyles.verticalContent}>
          <div>
            {locale.organization.modals.delete +
              ` '${organization.title}' ?`}
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
