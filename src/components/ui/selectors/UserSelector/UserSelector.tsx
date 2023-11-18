import { useLocale } from '@hooks/useLocale';
import { ILocale } from '@custom-types/ui/ILocale';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import CustomTransferList from '@ui/basics/CustomTransferList/CustomTransferList';
import styles from './userSelector.module.css';
import { IUserDisplay } from '@custom-types/data/IUser';
import { Icon, SegmentedControl } from '@ui/basics';
import { Eye } from 'tabler-icons-react';
import inputStyles from '@styles/ui/input.module.css';
import {
  ICustomTransferListData,
  ICustomTransferListItem,
  ICustomTransferListItemComponent,
} from '@custom-types/ui/basics/customTransferList';
import { setter } from '@custom-types/ui/atomic';
import { useRequest } from '@hooks/useRequest';

const UserSelector: FC<{
  selectedUsers: string[];
  setUsers: setter<string[]>;
  shrink?: boolean;
  titles?: (_: ILocale) => [string, string];
  width?: string;
  height?: string;
  inputProps?: any;
  url?: string;
}> = ({
  url = 'user/list-display',
  selectedUsers,
  setUsers,
  shrink,
  titles = (locale: ILocale) => [
    locale.ui.userSelector.unselected,
    locale.ui.userSelector.selected,
  ],
  width,
  height,
  inputProps,
}) => {
  const { locale } = useLocale();

  const [data, setData] = useState([
    [],
    [],
  ] as ICustomTransferListData);

  const { data: allUsers } = useRequest<{}, IUserDisplay[]>(
    url,
    'GET',
    undefined,
    undefined,
    undefined,
    undefined,
    10_000
  );
  const onChange = useCallback(
    (data: ICustomTransferListData) => {
      if (!!!data) return;
      setUsers(data[1].map((item) => item.value));
    },
    [setUsers]
  );

  useEffect(() => {
    if (!allUsers) return;
    let newData = [[], []] as ICustomTransferListData;
    for (let i = 0; i < allUsers.length; i++) {
      const item = {
        ...allUsers[i],
        value: allUsers[i].login,
        sortValue: allUsers[i].login,
      } as ICustomTransferListItem;
      if (selectedUsers.includes(item.value)) {
        // @ts-ignore
        newData[1].push(item);
      } else {
        // @ts-ignore
        newData[0].push(item);
      }
    }
    setData(newData);
  }, [allUsers, selectedUsers]);

  const [displayedField, setDisplayedField] = useState<
    'shortName' | 'login'
  >('shortName');

  const itemComponent: ICustomTransferListItemComponent = useCallback(
    ({ item, onClick, index }) => {
      return (
        <div
          key={index}
          className={`${styles.itemWrapper} ${
            shrink ? inputStyles.shrink : ''
          }`}
        >
          <div className={styles.item} onClick={onClick}>
            {item[displayedField]}
          </div>
          <div className={styles.actions}>
            <Icon
              href={`/profile/${item.login}`}
              target="_blank"
              tabIndex={5}
              color="var(--primary)"
              variant="transparent"
              size="xs"
            >
              <Eye />
            </Icon>
          </div>
        </div>
      );
    },
    [displayedField, shrink]
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
      <CustomTransferList
        titles={titles(locale)}
        itemComponent={itemComponent}
        searchKeys={['login', 'name', 'shortName']}
        value={data}
        onChange={onChange}
        width={width}
        height={height}
        {...inputProps}
      />
    </div>
  );
};

export default memo(UserSelector);
