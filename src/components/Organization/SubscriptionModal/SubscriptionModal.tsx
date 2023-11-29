import { IOrganizationFull } from '@custom-types/data/IOrganization';
import { setter } from '@custom-types/ui/atomic';
import { FC, memo, useCallback, useState } from 'react';
import modalStyles from '@styles/ui/modal.module.css';
import { requestWithNotify } from '@utils/requestWithNotify';
import SimpleModal from '@ui/SimpleModal/SimpleModal';
import { useLocale } from '@hooks/useLocale';
import { DateTimePicker } from '@ui/basics';
import SimpleButtonGroup from '@ui/SimpleButtonGroup/SimpleButtonGroup';

const SubscriptionModal: FC<{
  active: boolean;
  setActive: setter<boolean>;
  organization: IOrganizationFull;
}> = ({ active, setActive, organization }) => {
  const { locale, lang } = useLocale();
  const [activeUntil, setActiveUntil] = useState<Date | null>(
    new Date(organization.active_until)
  );

  const handleSubscriptionUpdate = useCallback(() => {
    requestWithNotify(
      `organization/active/${organization.spec}`,
      'PUT',
      locale.notify.organization.edit,
      lang,
      (_: any) => '',
      { active_until: activeUntil },
      () => setActive(false)
    );
  }, [organization, locale, lang]);

  return (
    <SimpleModal
      opened={active}
      close={() => setActive(false)}
      hideCloseButton={true}
      title={locale.organization.modals.subscription}
    >
      <div className={modalStyles.verticalContent}>
        <DateTimePicker
          required
          label={locale.organization.form.activeUntil}
          value={activeUntil}
          onChange={setActiveUntil}
        />
        <SimpleButtonGroup
          actionButton={{
            label: locale.save,
            onClick: handleSubscriptionUpdate,
          }}
          cancelButton={{
            label: locale.cancel,
            onClick: () => setActive(false),
          }}
        />
      </div>
    </SimpleModal>
  );
};

export default memo(SubscriptionModal);
