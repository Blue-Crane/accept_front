import {
  FC,
  ReactNode,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Table from '@ui/Table/Table';
import { ITableColumn } from '@custom-types/ui/ITable';
import tableStyles from '@styles/ui/customTable.module.css';
import { useLocale } from '@hooks/useLocale';
import { ILocale } from '@custom-types/ui/ILocale';
import { BaseSearch } from '@custom-types/data/request';

import Fuse from 'fuse.js';
import { customTableSort } from '@utils/customTableSort';
import { IStudentAddResponse } from '@custom-types/data/IStudent';

const DEFAULT_ON_PAGE = 10;

interface Item {
  value: any;
  display: string | ReactNode;
}

export interface IStudentAddResponseTable
  extends IStudentAddResponse {
  error: Item;
}

const StudentErrorList: FC<{
  data: IStudentAddResponse[];
  initialColumns: (_: ILocale) => ITableColumn[];
  classNames?: any;
  empty?: ReactNode;
  noDefault?: boolean;
  defaultRowsOnPage?: number;
}> = ({
  data,
  initialColumns,
  classNames,

  noDefault,
  empty,
  defaultRowsOnPage,
}) => {
  const { locale } = useLocale();

  const [users, setUsers] = useState<IStudentAddResponse[]>(data);

  const [total, setTotal] = useState(0);

  const defaultOnPage = useMemo(
    () => defaultRowsOnPage || DEFAULT_ON_PAGE,
    [defaultRowsOnPage]
  );

  const columns: ITableColumn[] = useMemo(
    () => initialColumns(locale),
    [locale, initialColumns]
  );

  const [searchParams, setSearchParams] = useState<BaseSearch>({
    pager: {
      skip: 0,
      limit: defaultOnPage,
    },
    sort_by: [{ field: 'error', order: -1 }],
    search_params: {
      search: '',
      keys: ['fullName', 'login'],
    },
  });

  const applyFilters = useCallback(
    (data: IStudentAddResponse[]) => {
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
      setUsers(paged);
    },
    [columns, searchParams, setTotal]
  );

  useEffect(() => {
    applyFilters(data);
  }, [applyFilters, data]);

  return (
    <div>
      <Table
        columns={columns}
        rows={users}
        total={total}
        loading={false}
        setSearchParams={setSearchParams}
        searchParams={searchParams}
        noDefault={noDefault}
        empty={empty || <>{locale.ui.table.emptyMessage}</>}
        isEmpty={data?.length == 0}
        nothingFound={<>{locale.ui.table.nothingFoundMessage}</>}
        withSearch
        classNames={
          classNames
            ? classNames
            : {
                wrapper: tableStyles.wrapper,
                table: tableStyles.table,
                author: tableStyles.author,
                grade: tableStyles.grade,
                verdict: tableStyles.verdict,
                headerCell: tableStyles.headerCell,
                cell: tableStyles.cell,
                even: tableStyles.even,
                odd: tableStyles.odd,
              }
        }
        defaultOnPage={defaultOnPage}
        onPage={[defaultOnPage, 30]}
      />
    </div>
  );
};

export default memo(StudentErrorList);
