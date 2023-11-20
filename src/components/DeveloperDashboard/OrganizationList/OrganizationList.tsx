import {
  FC,
  ReactNode,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import tableStyles from '@styles/ui/customTable.module.css';
import { ILocale } from '@custom-types/ui/ILocale';
import { IOrganization } from '@custom-types/data/IOrganization';
import { ITableColumn } from '@custom-types/ui/ITable';
import { BaseSearch } from '@custom-types/data/request';
import { useLocale } from '@hooks/useLocale';
import { useRequest } from '@hooks/useRequest';
import { customTableSort } from '@utils/customTableSort';
import Table from '@ui/Table/Table';
import SingularSticky from '@ui/Sticky/SingularSticky';
import { Plus } from 'tabler-icons-react';
import Link from 'next/link';
import Image from 'next/image';
import { getLocalDate } from '@utils/datetime';

import Fuse from 'fuse.js';

interface Item {
  value: any;
  display: string | ReactNode;
}

interface IOrganizationList
  extends Omit<
    IOrganization,
    'title' | 'logo' | 'principal' | 'spec' | 'active_until'
  > {
  spec: Item;
  title: Item;
  logo: Item;
  principal: Item;
  activeUntil: Item;
}

const initialColumns = (locale: ILocale): ITableColumn[] => [
  {
    label: '',
    key: 'logo',
    sortable: false,
    sortFunction: (a: IOrganizationList, b: IOrganizationList) => 1,
    sorted: 0,
    allowMiddleState: true,
    hidable: false,
    hidden: false,
    size: 1,
  },
  {
    label: locale.organization.list.spec,
    key: 'spec',
    sortable: true,
    sortFunction: (a: IOrganizationList, b: IOrganizationList) =>
      a.spec.value > b.spec.value
        ? 1
        : a.spec.value == b.spec.value
        ? 0
        : -1,
    sorted: 0,
    allowMiddleState: true,
    hidable: false,
    hidden: false,
    size: 3,
  },
  {
    label: locale.organization.list.title,
    key: 'title',
    sortable: true,
    sortFunction: (a: IOrganizationList, b: IOrganizationList) =>
      a.title.value > b.title.value
        ? 1
        : a.title.value == b.title.value
        ? 0
        : -1,
    sorted: 0,
    allowMiddleState: true,
    hidable: false,
    hidden: false,
    size: 8,
  },
  {
    label: locale.organization.list.principal,
    key: 'principal',
    sortable: true,
    sortFunction: (a: IOrganizationList, b: IOrganizationList) => {
      return a.principal.value > b.principal.value
        ? 1
        : a.principal.value == b.principal.value
        ? 0
        : -1;
    },
    sorted: 0,
    allowMiddleState: true,
    hidable: true,
    hidden: false,
    size: 3,
  },
  {
    label: locale.organization.list.activeUntil,
    key: 'activeUntil',
    sortable: true,
    sortFunction: (a: IOrganizationList, b: IOrganizationList) => {
      return a.activeUntil.value > b.activeUntil.value
        ? 1
        : a.activeUntil.value == b.activeUntil.value
        ? 0
        : -1;
    },
    sorted: 0,
    allowMiddleState: true,
    hidable: true,
    hidden: false,
    size: 4,
  },
];

const processData = (
  organizations: IOrganization[]
): IOrganizationList[] => {
  return organizations.map((organization: IOrganization): any => ({
    ...organization,
    principal: {
      value: organization.principal,
      display: organization.principal,
    },
    spec: {
      value: organization.spec,
      display: (
        <div className={tableStyles.titleWrapper}>
          <Link
            className={tableStyles.title}
            href={`/organization/${organization.spec}`}
          >
            {organization.spec}
          </Link>
        </div>
      ),
    },
    title: {
      value: organization.title,
      display: (
        <div className={tableStyles.titleWrapper}>
          <Link
            className={tableStyles.title}
            href={`/organization/${organization.spec}`}
          >
            {organization.title}
          </Link>
        </div>
      ),
    },
    logo: {
      value: organization.spec,
      display: (
        <div>
          <Image
            width={30}
            height={30}
            src={organization.logo}
            alt={''}
          />
        </div>
      ),
    },
    activeUntil: {
      value: organization.active_until,
      display: <div>{getLocalDate(organization.active_until)}</div>,
    },
  }));
};

const defaultOnPage = 10;

const OrganizationList: FC<{ noDefault?: boolean }> = ({
  noDefault,
}) => {
  const { locale } = useLocale();

  const [list, setList] = useState<IOrganizationList[]>([]);

  const [total, setTotal] = useState(0);

  const [searchParams, setSearchParams] = useState<BaseSearch>({
    pager: {
      skip: 0,
      limit: defaultOnPage,
    },
    sort_by: [],
    search_params: {
      search: '',
      keys: ['spec.value', 'title.value', 'principal.value'],
    },
  });

  const columns: ITableColumn[] = useMemo(
    () => initialColumns(locale),
    [locale]
  );

  const { data, loading } = useRequest<
    {},
    IOrganization[],
    IOrganizationList[]
  >('organization/list', 'GET', undefined, processData);

  const applyFilters = useCallback(
    (data: IOrganizationList[]) => {
      var list = [...data];
      const fuse = new Fuse(list, {
        keys: searchParams.search_params.keys,
        findAllMatches: true,
      });

      const searched =
        searchParams.search_params.search == ''
          ? list
          : fuse
              .search(searchParams.search_params.search)
              .map((result) => result.item);

      const sorted = searched.sort((a, b) =>
        customTableSort(a, b, searchParams.sort_by, columns)
      );

      setTotal(sorted.length);

      const paged = sorted.slice(
        searchParams.pager.skip,
        searchParams.pager.limit > 0
          ? searchParams.pager.skip + searchParams.pager.limit
          : undefined
      );
      setList(paged);
    },
    [columns, searchParams]
  );

  useEffect(() => {
    if (data) {
      applyFilters(data);
    }
  }, [data, applyFilters]);

  const resetPage = useCallback(() => {
    setSearchParams((searchParams: BaseSearch) => ({
      ...searchParams,
      pager: {
        ...searchParams.pager,
        skip: 0,
      },
    }));
  }, []);

  return (
    <div>
      <Table
        columns={columns}
        rows={list}
        classNames={{
          wrapper: tableStyles.wrapper,
          table: tableStyles.table,
          principal: tableStyles.author,
          headerCell: tableStyles.headerCell,
          cell: tableStyles.cell,
          even: tableStyles.even,
          odd: tableStyles.odd,
        }}
        defaultOnPage={10}
        onPage={[5, 10]}
        total={total}
        empty={<>{locale.ui.table.emptyMessage}</>}
        isEmpty={data?.length == 0}
        nothingFound={<>{locale.ui.table.nothingFoundMessage}</>}
        loading={loading}
        setSearchParams={setSearchParams}
        searchParams={searchParams}
        withSearch
        noDefault={noDefault}
      />
      <SingularSticky
        href={`/organization/add`}
        icon={<Plus height={25} width={25} />}
        description={locale.tip.sticky.organization.add}
      />
    </div>
  );
};

export default memo(OrganizationList);
