import Table from '@ui/Table/Table';
import { ITableColumn } from '@custom-types/ui/ITable';
import {
  ReactNode,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import tableStyles from '@styles/ui/customTable.module.css';
import { useLocale } from '@hooks/useLocale';
import { Clock, Infinity, Lock, Plus, Run } from 'tabler-icons-react';
import { ITag } from '@custom-types/data/ITag';

import { BaseSearch } from '@custom-types/data/request';
import { useRequest } from '@hooks/useRequest';
import { ILocale } from '@custom-types/ui/ILocale';
import Fuse from 'fuse.js';
import { hasSubarray } from '@utils/hasSubarray';
import { MultiSelect } from '@ui/basics';
import { customTableSort } from '@utils/customTableSort';
import { getLocalDate } from '@utils/datetime';
import {
  IAssignmentDisplay,
  IAssignmentListBundle,
} from '@custom-types/data/IAssignment';
import styles from './assignmentList.module.css';
import { IGroup } from '@custom-types/data/IGroup';
import { colorGenerator } from '@utils/consistentColorGenerator';
import SingularSticky from '@ui/Sticky/SingularSticky';
import { useUser } from '@hooks/useUser';

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
    size: 2,
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
  assignment: IAssignmentDisplay
): ReactNode => {
  if (assignment.status.spec === 0) {
    return <Clock color="orange" />;
  }
  if (assignment.infinite) {
    return <Infinity color="purple" />;
  }
  if (assignment.status.spec === 1) {
    return <Run color="var(--positive)" />;
  }
  return <Lock color="black" />;
};

const processData = (
  data: IAssignmentListBundle,
  locale: ILocale
): {
  assignments: IAssignmentDisplayList[];
  tags: ITag[];
  groups: IGroup[];
} => {
  const assignments = data.assignments.map(
    (assignment: IAssignmentDisplay): any => ({
      ...assignment,
      state: {
        value: assignment.status.spec,
        display: getAssignmentIcon(assignment),
      },
      title: {
        value: assignment.title,
        display: (
          <div className={tableStyles.titleWrapper}>
            <a
              className={tableStyles.title}
              href={`/edu/assignment/${assignment.spec}`}
            >
              {assignment.title}
            </a>
            {assignment.tags.length > 0 && (
              <span className={tableStyles.tags}>
                {assignment.tags.map((tag, idx) => (
                  <div className={tableStyles.tag} key={idx}>
                    {tag.title +
                      (idx == assignment.tags.length - 1 ? '' : ', ')}
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
              <div
                className={styles.group}
                key={idx}
                style={{
                  color: colorGenerator(group.spec),
                }}
              >
                {group.name}
              </div>
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
    })
  );
  const tags = data.tags;
  const groups = data.groups;
  return { assignments, tags, groups };
};

const defaultOnPage = 10;

function AssignmentList() {
  const { locale } = useLocale();
  const [list, setList] = useState<IAssignmentDisplayList[]>([]);
  const [tags, setTags] = useState<ITag[]>([]);
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [currentTags, setCurrentTags] = useState<string[]>([]);
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

  const searchTags = useMemo(
    () =>
      tags.map((tag) => ({
        label: tag.title,
        value: tag.spec,
      })),
    [tags]
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
    IAssignmentListBundle,
    {
      assignments: IAssignmentDisplayList[];
      tags: ITag[];
      groups: IGroup[];
    }
  >('assignment/my', 'GET', undefined, (data) =>
    processData(data, locale)
  );

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

      const tagged =
        currentTags.length > 0
          ? searched.filter((assignment) =>
              hasSubarray(
                assignment.tags.map((tag: ITag) => tag.spec),
                currentTags
              )
            )
          : searched;

      const grouped =
        currentGroups.length > 0
          ? tagged.filter((assignment) =>
              hasSubarray(
                assignment.groups.value.map(
                  (group: IGroup) => group.spec
                ),
                currentGroups
              )
            )
          : tagged;

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
    [columns, currentTags, currentGroups, searchParams]
  );

  useEffect(() => {
    if (data) {
      applyFilters(data.assignments);
      setTags(data.tags);
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
                data={searchTags}
                onChange={setCurrentTags}
                placeholder={locale.placeholders.selectTags}
              />
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
        />
      )}
    </>
  );
}

export default memo(AssignmentList);
