import Table from '@ui/Table/Table';
import { ITableColumn } from '@custom-types/ui/ITable';
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
import { useLocale } from '@hooks/useLocale';
import {
  Clock,
  Confetti,
  Infinity as InfinityIcon,
  Plus,
  Run,
} from 'tabler-icons-react';
import { BaseSearch } from '@custom-types/data/request';
import { useRequest } from '@hooks/useRequest';
import { ILocale } from '@custom-types/ui/ILocale';
import Fuse from 'fuse.js';
import { hasSubarray } from '@utils/hasSubarray';
import { Badge, MultiSelect } from '@ui/basics';
import { customTableSort } from '@utils/customTableSort';
import { getLocalDate } from '@utils/datetime';
import { IAssignmentDisplay } from '@custom-types/data/IAssignment';
import styles from './assignmentList.module.css';
import { IGroupDisplay } from '@custom-types/data/IGroup';
import { colorGenerator } from '@utils/consistentColorGenerator';
import SingularSticky from '@ui/Sticky/SingularSticky';
import { useUser } from '@hooks/useUser';
import { Tip } from '@ui/basics';
import Link from 'next/link';

interface Item {
  value: any;
  display: string | ReactNode;
}

interface IAssignmentDisplayList
  extends Omit<
    IAssignmentDisplay,
    'title' | 'author' | 'taskNumber' | 'start' | 'end' | 'groups'
  > {
  title: Item;
  author: Item;
  taskNumber: Item;
  start: Item;
  end: Item;
  groups: Item;
  state: Item;
}

const initialColumns = (locale: ILocale): ITableColumn[] => [
  {
    label: '',
    key: 'state',
    sortable: true,
    sortFunction: (a: any, b: any) =>
      a.infinite || a.state.value > b.state.value
        ? 1
        : a.state.value == b.state.value
        ? 0
        : -1,
    sorted: 0,
    allowMiddleState: true,
    hidable: false,
    hidden: false,
    size: 1,
  },
  {
    label: locale.assignment.list.title,
    key: 'title',
    sortable: true,
    sortFunction: (a: any, b: any) =>
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
    label: locale.assignment.list.groups,
    key: 'groups',
    sortable: false,
    sortFunction: (a: any, b: any) =>
      a.groups.value > b.groups.value
        ? 1
        : a.groups.value == b.groups.value
        ? 0
        : -1,
    sorted: 0,
    allowMiddleState: true,
    hidable: true,
    hidden: false,
    size: 5,
  },
  {
    label: locale.assignment.list.author,
    key: 'author',
    sortable: true,
    sortFunction: (a: any, b: any) =>
      a.author.value > b.author.value
        ? 1
        : a.author.value == b.author.value
        ? 0
        : -1,
    sorted: 0,
    allowMiddleState: true,
    hidable: true,
    hidden: true,
    size: 2,
  },
  {
    label: locale.assignment.list.start,
    key: 'start',
    sortable: true,
    sortFunction: (a: any, b: any) => {
      return a.start.value > b.start.value
        ? 1
        : a.start.value == b.start.value
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
    label: locale.assignment.list.end,
    key: 'end',
    sortable: true,
    sortFunction: (a: any, b: any) => {
      return a.infinite || a.end.value > b.end.value
        ? 1
        : a.end.value == b.end.value
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
    label: locale.assignment.list.taskNumber,
    key: 'taskNumber',
    sortable: true,
    sortFunction: (a: any, b: any) =>
      a.taskNumber.value > b.taskNumber.value
        ? 1
        : a.taskNumber.value == b.taskNumber.value
        ? 0
        : -1,
    sorted: 0,
    allowMiddleState: true,
    hidable: true,
    hidden: true,
    size: 3,
  },
];

const getAssignmentIcon = (
  assignment: IAssignmentDisplay,
  locale: ILocale
): ReactNode => {
  if (assignment.infinite) {
    return (
      <Tip position="bottom" label={locale.tip.status.infinite}>
        <InfinityIcon color="purple" />
      </Tip>
    );
  }
  if (assignment.status.spec === 0) {
    return (
      <Tip position="bottom" label={locale.tip.status.pending}>
        <Clock color="orange" />
      </Tip>
    );
  }
  if (assignment.status.spec === 1) {
    return (
      <Tip position="bottom" label={locale.tip.status.running}>
        <Run color="var(--positive)" />
      </Tip>
    );
  }
  return (
    <Tip position="bottom" label={locale.tip.status.finished}>
      <Confetti color="black" />
    </Tip>
  );
};

const processData = (
  data: IAssignmentDisplay[],
  locale: ILocale
): {
  assignments: IAssignmentDisplayList[];
  groups: IGroupDisplay[];
} => {
  const groupsMap = new Map();

  const assignments = data.map(
    (assignment: IAssignmentDisplay): any => {
      assignment.groups.map((group: IGroupDisplay) =>
        groupsMap.set(group.spec, group)
      );
      return {
        ...assignment,
        state: {
          value: assignment.status.spec,
          display: getAssignmentIcon(assignment, locale),
        },
        title: {
          value: assignment.title,
          display: (
            <div className={tableStyles.titleWrapper}>
              <Link
                className={tableStyles.title}
                href={`/edu/assignment/${assignment.spec}`}
              >
                {assignment.title}
              </Link>
              {assignment.tags.length > 0 && (
                <span className={tableStyles.tags}>
                  {assignment.tags.map((tag, idx) => (
                    <div className={tableStyles.tag} key={idx}>
                      {tag.title +
                        (idx == assignment.tags.length - 1
                          ? ''
                          : ', ')}
                    </div>
                  ))}
                </span>
              )}
            </div>
          ),
        },
        groups: {
          value: assignment.groups,
          display: (
            <div className={tableStyles.groups}>
              {assignment.groups.map((group, idx) => (
                <Badge
                  key={idx}
                  color={colorGenerator(group.spec)}
                  size="sm"
                  tooltipProps={{ label: group.organization.title }}
                >
                  {group.name}
                </Badge>
              ))}
            </div>
          ),
        },
        author: {
          value: assignment.author,
          display: assignment.author,
        },
        taskNumber: {
          value: assignment.taskNumber,
          display: assignment.taskNumber,
        },
        start: {
          value: new Date(assignment.start),
          display: <>{getLocalDate(assignment.start)}</>,
        },
        end: {
          value: new Date(assignment.end),
          display: assignment.infinite ? (
            locale.assignment.form.infinite
          ) : (
            <>{getLocalDate(assignment.end)}</>
          ),
        },
      };
    }
  );
  const groups = Array.from(groupsMap.values()) as IGroupDisplay[];
  return { assignments, groups };
};

const defaultOnPage = 10;

const AssignmentList: FC<{ url?: string }> = ({
  url = 'assignment/my',
}) => {
  const { locale } = useLocale();
  const [list, setList] = useState<IAssignmentDisplayList[]>([]);
  const [groups, setGroups] = useState<IGroupDisplay[]>([]);
  const [currentGroups, setCurrentGroups] = useState<string[]>([]);

  const [total, setTotal] = useState(0);

  const { isTeacher } = useUser();

  const [searchParams, setSearchParams] = useState<BaseSearch>({
    pager: {
      skip: 0,
      limit: defaultOnPage,
    },
    sort_by: [],
    search_params: {
      search: '',
      keys: ['title.value', 'author.value'],
    },
  });

  const columns: ITableColumn[] = useMemo(
    () => initialColumns(locale),
    [locale]
  );

  const searchGroups = useMemo(
    () =>
      groups.map((group) => ({
        label: group.name,
        value: group.spec,
      })),
    [groups]
  );

  const { data, loading } = useRequest<
    {},
    IAssignmentDisplay[],
    {
      assignments: IAssignmentDisplayList[];
      groups: IGroupDisplay[];
    }
  >(url, 'GET', undefined, (data) => processData(data, locale));

  const applyFilters = useCallback(
    (data: IAssignmentDisplayList[]) => {
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

      const grouped =
        currentGroups.length > 0
          ? searched.filter((assignment) =>
              hasSubarray(
                assignment.groups.value.map(
                  (group: IGroupDisplay) => group.spec
                ),
                currentGroups
              )
            )
          : searched;

      const sorted = grouped.sort((a, b) =>
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
    [columns, currentGroups, searchParams]
  );

  useEffect(() => {
    if (data) {
      applyFilters(data.assignments);
      setGroups(data.groups);
    }
  }, [data, applyFilters]);

  return (
    <>
      <div style={{ position: 'relative' }}>
        <Table
          columns={columns}
          rows={list}
          classNames={{
            wrapper: tableStyles.wrapper,
            table: tableStyles.table,
            author: tableStyles.author,
            grade: tableStyles.grade,
            verdict: tableStyles.verdict,
            headerCell: styles.headerCell,
            cell: styles.cell,
            even: tableStyles.even,
            odd: tableStyles.odd,
          }}
          defaultOnPage={10}
          onPage={[5, 10]}
          noDefault
          total={total}
          loading={loading}
          setSearchParams={setSearchParams}
          searchParams={searchParams}
          withSearch
          empty={<>{locale.profile.empty.assignments}</>}
          isEmpty={data?.assignments.length == 0}
          nothingFound={<>{locale.ui.table.nothingFoundMessage}</>}
          additionalSearch={
            <div className={styles.searchWrapper}>
              <MultiSelect
                searchable
                data={searchGroups}
                onChange={setCurrentGroups}
                placeholder={locale.placeholders.selectGroups}
              />
            </div>
          }
        />
      </div>
      {isTeacher && (
        <SingularSticky
          color={'var(--positive)'}
          href={'/edu/assignment/add'}
          icon={<Plus height={20} width={20} />}
          description={locale.tip.sticky.assignment.add}
        />
      )}
    </>
  );
};

export default memo(AssignmentList);
