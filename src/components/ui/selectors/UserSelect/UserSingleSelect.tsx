import React, { FC, forwardRef, memo } from 'react';
import { SelectItem, Text } from '@mantine/core';
import { Select, UserAvatar } from '@ui/basics';
import { Eye } from 'tabler-icons-react';
import styles from './userSelect.module.css';
import Link from 'next/link';
import { UserItemProps, UserSelectProps } from './UserSelect';
import { useRequest } from '@hooks/useRequest';
import { IUserDisplay } from '@custom-types/data/IUser';

const UserSingleSelect: FC<UserSelectProps> = ({
  url,
  label,
  placeholder,
  selectedUsers,
  nothingFound,
  select,
  multiple: _multiple,
  additionalProps,
}) => {
  const SelectItem = forwardRef<HTMLDivElement, UserItemProps>(
    ({ login, label, value, ...others }: UserItemProps, ref) => (
      <div className={styles.item} ref={ref}>
        <div
          onMouseDown={others.onMouseDown}
          onMouseEnter={others.onMouseEnter}
          className={styles.left}
        >
          <UserAvatar
            radius="md"
            size="md"
            login={login}
            alt={'User`s avatar'}
          />
          <div>
            <Text size="sm">{label}</Text>
            <Text size="xs" opacity={0.65}>
              {value}
            </Text>
          </div>
        </div>
        <div className={styles.itemIcon}>
          <Link href={`/profile/${value}`}>
            <Eye color={'var(--primary)'} />
          </Link>
        </div>
      </div>
    )
  );
  SelectItem.displayName = 'SelectItem';

  const { data } = useRequest<{}, IUserDisplay[], SelectItem[]>(
    url,
    'GET',
    undefined,
    (users) =>
      users.map(
        (item) =>
          ({
            label: item.shortName,
            value: item.login,
          } as SelectItem)
      ),
    undefined,
    undefined,
    2_000
  );

  return (
    <>
      <Select
        searchable
        data={data || []}
        itemComponent={SelectItem}
        label={label}
        placeholder={placeholder}
        clearable
        maxDropdownHeight={400}
        nothingFound={nothingFound}
        filter={(value, item) =>
          item.label
            ?.toLowerCase()
            .includes(value.toLowerCase().trim()) ||
          item.value
            .toLowerCase()
            .includes(value.toLowerCase().trim())
        }
        {...additionalProps}
        onChange={(login) => {
          select(login ? [login] : []);
          additionalProps?.onChange(login);
        }}
      />
    </>
  );
};

export default memo(UserSingleSelect);
