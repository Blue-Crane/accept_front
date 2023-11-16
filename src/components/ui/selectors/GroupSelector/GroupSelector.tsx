import { useLocale } from '@hooks/useLocale';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import CustomTransferList from '@ui/basics/CustomTransferList/CustomTransferList';
import styles from './groupSelector.module.css';
import { IGroup } from '@custom-types/data/IGroup';
import inputStyles from '@styles/ui/input.module.css';
import {
  ICustomTransferListData,
  ICustomTransferListItem,
  ICustomTransferListItemComponent,
} from '@custom-types/ui/basics/customTransferList';
import { setter } from '@custom-types/ui/atomic';
import { useRequest } from '@hooks/useRequest';

const GroupSelector: FC<{
  form: any;
  selectedGroups: string[];
  setGroups: setter<string[]>;
  field: string;
  shrink?: boolean;
  width?: string;
}> = ({ form, selectedGroups, setGroups, field, shrink, width }) => {
  const { locale } = useLocale();

  const [data, setData] = useState([
    [],
    [],
  ] as ICustomTransferListData);

  const { data: allGroups } = useRequest<{}, IGroup[]>(
    'group/list',
    'GET',
    undefined,
    undefined,
    undefined,
    undefined,
    10_000
  );

  useEffect(() => {
    if (!allGroups) return;
    let newData = [[], []] as ICustomTransferListData;
    for (let i = 0; i < allGroups.length; i++) {
      const item = {
        ...allGroups[i],
        value: allGroups[i].spec.toString(),
        sortValue: allGroups[i].name,
      } as ICustomTransferListItem;
      if (selectedGroups.includes(item.value)) {
        // @ts-ignore
        newData[1].push(item);
      } else {
        // @ts-ignore
        newData[0].push(item);
      }
    }
    setData(newData);
  }, [allGroups, selectedGroups]);

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
          {item.name}
        </div>
      );
    },
    [shrink]
  );

  const onChange = useCallback(
    (data: ICustomTransferListData) => {
      if (!!!data) return;
      form.setFieldValue(
        field,
        data[1].map((item) => item.spec)
      );
      setGroups(data[1].map((item) => item.value));
    },
    [form.setFieldValue] // eslint-disable-line
  );

  return (
    <div>
      <CustomTransferList
        {...form.getInputProps(field)}
        width={width}
        value={data}
        onChange={onChange}
        titles={[
          locale.ui.groupSelector.unselected,
          locale.ui.groupSelector.selected,
        ]}
        itemComponent={itemComponent}
        searchKeys={['name']}
        shrink={shrink}
      />
    </div>
  );
};

export default memo(GroupSelector);
