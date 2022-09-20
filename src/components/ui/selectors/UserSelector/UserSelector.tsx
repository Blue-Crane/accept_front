import { useLocale } from '@hooks/useLocale';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import {
  CustomTransferList,
  Item,
} from '@ui/CustomTransferList/CustomTransferList';
import styles from './userSelector.module.css';
import stepperStyles from '@styles/ui/stepper.module.css';
import { IUserDisplay } from '@custom-types/data/IUser';
import { InputWrapper, SegmentedControl } from '@ui/basics';
import { ActionIcon } from '@mantine/core';
import { Eye } from 'tabler-icons-react';

const UserSelector: FC<{
  setFieldValue: (_: string[]) => void;
  inputProps: any;
  users: IUserDisplay[];
  initialUsers?: string[];
}> = ({ setFieldValue, inputProps, users, initialUsers }) => {
  const [availableUsers, setAvailableUsers] = useState<Item[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const { locale } = useLocale();

  useEffect(() => {
    setLoading(true);
    let newAvailableUsers = [];
    let newSelectedUsers = [];

    for (let i = 0; i < users.length; i++) {
      if (
        initialUsers &&
        initialUsers.find((login) => login === users[i].login)
      ) {
        newSelectedUsers.push({
          ...users[i],
          label: users[i].shortName,
        });
      } else {
        newAvailableUsers.push({
          ...users[i],
          label: users[i].shortName,
        });
      }
    }
    setAvailableUsers(newAvailableUsers);
    setSelectedUsers(newSelectedUsers);
    setLoading(false);
  }, [initialUsers, users]);

  const [displayedField, setDisplayedField] = useState<
    'shortName' | 'login'
  >('shortName');

  const itemComponent = useCallback(
    (user: IUserDisplay, handleSelect: any) => {
      return (
        <div
          className={styles.itemWrapper}
          onClick={() => handleSelect(user)}
        >
          <div className={styles.name}>{user[displayedField]}</div>
          <div className={styles.actions}>
            <ActionIcon<'a'>
              component="a"
              href={`/profile/${user.login}`}
              target="_blank"
              tabIndex={5}
              color="var(--primary)"
              variant="transparent"
              size="lg"
            >
              <Eye width={20} height={20} />
            </ActionIcon>
          </div>
        </div>
      );
    },
    [displayedField]
  );

  return (
    <div>
      <SegmentedControl
        data={[
          {
            label: locale.group.form.login,
            value: 'login',
          },
          {
            label: locale.group.form.shortName,
            value: 'shortName',
          },
        ]}
        value={displayedField}
        onChange={(value) =>
          setDisplayedField(value as 'login' | 'shortName')
        }
      />

      {!loading && (
        <InputWrapper {...inputProps}>
          <CustomTransferList
            defaultOptions={availableUsers}
            defaultChosen={selectedUsers}
            setUsed={(users: Item[]) =>
              setFieldValue(users.map((user) => user.login))
            }
            classNames={{ label: stepperStyles.label }}
            titles={[
              locale.ui.userSelector.unselected,
              locale.ui.userSelector.selected,
            ]}
            itemComponent={itemComponent}
            searchKeys={['login', 'name', 'shortName']}
          />
        </InputWrapper>
      )}
    </div>
  );
};

export default memo(UserSelector);
