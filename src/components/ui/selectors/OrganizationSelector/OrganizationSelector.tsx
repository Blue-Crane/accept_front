import { useLocale } from '@hooks/useLocale';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import CustomTransferList from '@ui/basics/CustomTransferList/CustomTransferList';
import styles from './organizationSelector.module.css';
import { capitalize } from '@utils/capitalize';
import inputStyles from '@styles/ui/input.module.css';
import {
  ICustomTransferListData,
  ICustomTransferListItem,
  ICustomTransferListItemComponent,
} from '@custom-types/ui/basics/customTransferList';
import { setter } from '@custom-types/ui/atomic';
import { useRequest } from '@hooks/useRequest';
import { IOrganizationDisplay } from '@custom-types/data/IOrganization';

const OrganizationSelector: FC<{
  url: string;
  form: any;
  field: string;
  selectedOrganizations: string[];
  setOrganizations: setter<string[]>;
  shrink?: boolean;
  width?: string;
}> = ({
  url,
  form,
  selectedOrganizations,
  setOrganizations,
  field,
  shrink,
  width,
}) => {
  const { locale } = useLocale();

  const [data, setData] = useState([
    [],
    [],
  ] as ICustomTransferListData);

  const { data: allOrganizations, loading } = useRequest<
    {},
    IOrganizationDisplay[]
  >(url, 'GET', undefined, undefined, undefined, undefined, 10_000);

  useEffect(() => {
    if (!allOrganizations) return;
    let newData = [[], []] as ICustomTransferListData;
    for (let i = 0; i < allOrganizations.length; i++) {
      const item = {
        ...allOrganizations[i],
        value: allOrganizations[i].spec,
        sortValue: allOrganizations[i].title,
      } as ICustomTransferListItem;
      if (selectedOrganizations.includes(item.value)) {
        // @ts-ignore
        newData[1].push(item);
      } else {
        // @ts-ignore
        newData[0].push(item);
      }
    }
    setData(newData);
  }, [allOrganizations, selectedOrganizations]);

  const onChange = useCallback(
    (data: ICustomTransferListData) => {
      if (!!!data) return;
      form.setFieldValue(
        field,
        data[1].map((role) => role.spec)
      ),
        setOrganizations(data[1].map((item) => item.value));
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
          {capitalize(item.title)}
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
          locale.ui.organizationSelector.unselected,
          locale.ui.organizationSelector.selected,
        ]}
        itemComponent={itemComponent}
        searchKeys={['title', 'spec']}
        width={width}
      />
    </div>
  );
};

export default memo(OrganizationSelector);
