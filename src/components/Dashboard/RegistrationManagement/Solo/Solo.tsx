import { FC, memo, useCallback, useState } from 'react';
import { ILocale } from '@custom-types/ui/ILocale';
import { Button, LoadingOverlay } from '@ui/basics';
import { UserSelector } from '@ui/selectors';
import styles from '../registrationManagement.module.css';
import { requestWithNotify } from '@utils/requestWithNotify';
import { useLocale } from '@hooks/useLocale';
import { setter } from '@custom-types/ui/atomic';

const Solo: FC<{
  spec: string;
  refetch: setter<boolean>;
  initialParticipants: string[];
  loading: boolean;
}> = ({ spec, refetch, loading, initialParticipants }) => {
  const { locale, lang } = useLocale();

  const [participants, setParticipants] = useState<string[]>(
    initialParticipants
  );

  const handleRegister = useCallback(
    (logins: string[]) => {
      requestWithNotify<string[], {}>(
        `tournament/register-users/${spec}`,
        'POST',
        locale.notify.tournament.registration,
        lang,
        () => '',
        logins,
        () => refetch(false)
      );
    },
    [refetch, spec, locale, lang]
  );

  return (
    <div className={styles.wrapper}>
      {<LoadingOverlay visible={loading} />}
      <div
        style={{
          width: '90%',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacer-m)',
        }}
      >
        <UserSelector
          selectedUsers={participants}
          setUsers={setParticipants}
          titles={(locale: ILocale) => [
            locale.dashboard.tournament.registrationManagementSelector
              .users,
            locale.dashboard.tournament.registrationManagementSelector
              .participants,
          ]}
          height="400px"
        />
        <div style={{ margin: '0 auto' }}>
          <Button onClick={() => handleRegister(participants)}>
            {locale.edit}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(Solo);
