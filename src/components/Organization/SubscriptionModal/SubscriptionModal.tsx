import { IOrganizationFull } from '@custom-types/data/IOrganization';
import { setter } from '@custom-types/ui/atomic';
import { FC, memo, useCallback, useState } from 'react';
import modalStyles from '@styles/ui/modal.module.css';
import SimpleModal from '@ui/SimpleModal/SimpleModal';
import { useLocale } from '@hooks/useLocale';
import { Group } from '@mantine/core';
import { Button } from '@ui/basics';
import { DateTimePicker } from '@ui/basics';

const SubscriptionModal: FC<{
  active: boolean;
  setActive: setter<boolean>;
  organization: IOrganizationFull;
}> = ({ active, setActive, organization }) => {
  const { locale, lang } = useLocale();
  const [activeUntil, setActiveUntil] = useState(
    organization.active_until
  );

  const handleSubscriptionUpdate = useCallback(() => {
    // requestWithNotify(
    //   `.../delete/${organization.spec}`,
    //   'DELETE',
    //   locale.notify.organization.delete,
    //   lang,
    //   (_: any) => '',
    //   undefined,
    //   () => setActive(false)
    // );
    console.log(activeUntil);
  }, [organization, locale, lang]);

  const handleFroze = useCallback(() => {
    // requestWithNotify(
    //   `.../delete/${organization.spec}`,
    //   'DELETE',
    //   locale.notify.organization.delete,
    //   lang,
    //   (_: any) => '',
    //   undefined,
    //   () => setActive(false)
    // );
    console.log('froze');
  }, [organization, locale, lang]);

  return (
    <>
      <SimpleModal
        opened={active}
        close={() => setActive(false)}
        hideCloseButton={true}
        title={locale.organization.modals.subscription}
      >
        <div className={modalStyles.verticalContent}>
          <DateTimePicker
            required
            label={'locale.organization.form.subscriptionEnd'}
            value={activeUntil}
            onChange={(value) => value && setActiveUntil(value)}
          />
        </div>
        <Group position="right" spacing="lg">
          <Button
            variant="outline"
            shrink
            onClick={() => setActive(false)}
            autoFocus
          >
            {locale.cancel}
          </Button>
          <Button
            variant="outline"
            kind={'positive'}
            shrink
            onClick={handleSubscriptionUpdate}
          >
            {'UPDATE'}
          </Button>
          <Button
            variant="outline"
            kind={'negative'}
            shrink
            onClick={handleFroze}
          >
            {'Froe'}
          </Button>
        </Group>
      </SimpleModal>
    </>
  );
};

export default memo(SubscriptionModal);
