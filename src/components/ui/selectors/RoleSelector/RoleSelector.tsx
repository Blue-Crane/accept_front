import { useLocale } from '@hooks/useLocale';
import {
  FC,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import CustomTransferList from '@ui/basics/CustomTransferList/CustomTransferList';
import styles from './roleSelector.module.css';
import { IRole } from '@custom-types/data/atomic';
import { capitalize } from '@utils/capitalize';
import inputStyles from '@styles/ui/input.module.css';
import {
  ICustomTransferListData,
  ICustomTransferListItem,
  ICustomTransferListItemComponent,
} from '@custom-types/ui/basics/customTransferList';
import { setter } from '@custom-types/ui/atomic';
import { useRequest } from '@hooks/useRequest';

const RoleSelector: FC<{
  form: any;
  selectedRoles: string[];
  setRoles: setter<string[]>;
  field: string;
  shrink?: boolean;
  width?: string;
}> = ({ form, selectedRoles, setRoles, field, shrink, width }) => {
  const { locale } = useLocale();

  const [data, setData] = useState([
    [],
    [],
  ] as ICustomTransferListData);

  const { data: allRoles, loading } = useRequest<{}, IRole[]>(
    'role',
    'GET',
    undefined,
    undefined,
    undefined,
    undefined,
    10_000
  );

  useEffect(() => {
    if (!allRoles) return;
    let newData = [[], []] as ICustomTransferListData;
    for (let i = 0; i < allRoles.length; i++) {
      const item = {
        ...allRoles[i],
        value: allRoles[i].spec.toString(),
        sortValue: allRoles[i].accessLevel,
      } as ICustomTransferListItem;
      if (selectedRoles.includes(item.value)) {
        // @ts-ignore
        newData[1].push(item);
      } else {
        // @ts-ignore
        newData[0].push(item);
      }
    }
    setData(newData);
  }, [allRoles, selectedRoles]);

  const onChange = useCallback(
    (data: ICustomTransferListData) => {
      if (!!!data) return;
      form.setFieldValue(
        field,
        data[1].map((role) => role.spec)
      ),
        setRoles(data[1].map((item) => item.value));
    },
    [field, form.setFieldValue] //eslint-disable-line
  );

  const itemComponent: ICustomTransferListItemComponent = useCallback(
    ({ item, onClick, index }) => {
      return (
        <div
          key={index}
          className={`${styles.itemWrapper} ${
            shrink ? inputStyles.shrink : ''
          }`}
          onClick={onClick}
        >
          {capitalize(item.name)}
        </div>
      );
    },
    [shrink]
  );

  return (
    <div>
      <CustomTransferList
        {...form.getInputProps(field)}
        value={data}
        onChange={onChange}
        shrink={shrink}
        titles={[
          locale.ui.roleSelector.unselected,
          locale.ui.roleSelector.selected,
        ]}
        itemComponent={itemComponent}
        searchKeys={['name']}
        width={width}
      />
    </div>
  );
};

export default memo(RoleSelector);
