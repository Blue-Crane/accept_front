import { IActivityData } from '@custom-types/data/atomic';
import { IPlotData } from '@custom-types/ui/IPlot';
import { sendRequest } from '@requests/request';
import { BarPlot } from '@ui/Plot';
import { SegmentedControl } from '@ui/basics';
import { FC, memo, useEffect, useMemo, useState } from 'react';
import styles from './activityGraph.module.css';
import { timezoneDate } from '@utils/datetime';

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 31 * DAY;
const YEAR = 365 * DAY;
const zeroesPad = (value: number, num: number) =>
  String(value).padStart(
    Math.max(num - String(value).length + 1, 0),
    '0'
  );

const TIME_SPANS = [
  () => ({
    from_date: new Date(new Date().getTime() - DAY),
    to_date: new Date(),
    segment_size: HOUR,
    convertToLabel: (date: Date) =>
      `${zeroesPad(date.getDate(), 2)}.${zeroesPad(
        date.getMonth() + 1,
        2
      )}.${zeroesPad(date.getFullYear(), 2)} ${zeroesPad(
        date.getHours(),
        2
      )}:00:00`,
  }),
  () => ({
    from_date: new Date(new Date().getTime() - WEEK),
    to_date: new Date(),
    segment_size: HOUR,
    convertToLabel: (date: Date) =>
      `${zeroesPad(date.getDate(), 2)}.${zeroesPad(
        date.getMonth() + 1,
        2
      )}.${zeroesPad(date.getFullYear(), 2)} ${zeroesPad(
        date.getHours(),
        2
      )}:00:00`,
  }),
  () => ({
    from_date: new Date(new Date().getTime() - MONTH),
    to_date: new Date(),
    segment_size: DAY,
    convertToLabel: (date: Date) =>
      `${zeroesPad(date.getDate(), 2)}.${zeroesPad(
        date.getMonth() + 1,
        2
      )}.${zeroesPad(date.getFullYear(), 2)}`,
  }),
  () => ({
    from_date: new Date(new Date().getTime() - YEAR),
    to_date: new Date(),
    segment_size: DAY,
    convertToLabel: (date: Date) =>
      `${zeroesPad(date.getDate(), 2)}.${zeroesPad(
        date.getMonth() + 1,
        2
      )}.${zeroesPad(date.getFullYear(), 2)}`,
  }),
  () => ({
    from_date: undefined,
    to_date: new Date(),
    segment_size: WEEK,
    convertToLabel: (date: Date) => {
      let startDate = new Date(date.getTime());
      let endDate = new Date(date.getTime() + WEEK);

      let combineDate = (date: Date) =>
        `${zeroesPad(date.getDate(), 2)}.${zeroesPad(
          date.getMonth() + 1,
          2
        )}.${zeroesPad(date.getFullYear(), 2)}`;

      return `${combineDate(startDate)}-${combineDate(endDate)}`;
    },
  }),
];

const mapActivityToPlotData = (
  activity: IActivityData[],
  index: number
): IPlotData[] => {
  const sorted_activity = activity
    .map((item) => ({
      count: item.count,
      date: timezoneDate(item.date).getTime(),
    }))
    .sort((a, b) => a.date - b.date);

  let timeSpan = TIME_SPANS[index]();
  timeSpan.from_date = new Date(
    Math.trunc(
      (timeSpan.from_date?.getTime() || sorted_activity[0].date) /
        timeSpan.segment_size
    ) * timeSpan.segment_size
  );

  let listSize = Math.trunc(
    (timeSpan.to_date.getTime() - timeSpan.from_date.getTime()) /
      timeSpan.segment_size
  );

  if (listSize == 0) {
    let amount = 0;
    for (let i = 0; i < sorted_activity.length; i++) {
      amount += sorted_activity[i].count;
    }
    return [
      {
        amount,
        label: timeSpan.convertToLabel(
          new Date(timeSpan.from_date?.getTime() || 0)
        ),
        color: 'var(--primary)',
      },
    ];
  }

  let full_activity = new Array(listSize)
    .fill(undefined)
    .map((item, index) => ({
      amount: 0,
      label: timeSpan.convertToLabel(
        new Date(
          (timeSpan.from_date?.getTime() || 0) +
            (index + 1) * timeSpan.segment_size
        )
      ),
      color: 'var(--primary)',
    }));

  for (let i = 0; i < sorted_activity.length; i++) {
    const currentIndex =
      Math.trunc(
        (sorted_activity[i].date - timeSpan.from_date.getTime()) /
          timeSpan.segment_size
      ) - 1;

    full_activity[currentIndex].amount += sorted_activity[i].count;
  }

  return full_activity;
};

const ActivityGraph: FC<{}> = ({}) => {
  const [activityData, setActivityData] = useState<IActivityData[]>(
    []
  );
  const [timeSpan, setTimeSpan] = useState('0');

  const data = useMemo(
    () => mapActivityToPlotData(activityData, +timeSpan),
    [activityData, timeSpan]
  );

  useEffect(() => {
    let dates = TIME_SPANS[+timeSpan]();
    dates.from_date = dates.from_date || new Date(0);
    sendRequest<
      { from_date: Date; to_date: Date; segment_size: number },
      IActivityData[]
    >(
      'analytics/activity',
      'POST',
      // @ts-ignore
      dates
    ).then((res) => {
      if (!res.error) {
        setActivityData(res.response);
      }
    });
  }, [timeSpan]);

  return (
    <div className={styles.wrapper}>
      <SegmentedControl
        className={styles.segmentControl}
        data={[
          { label: 'Day', value: '0' },
          { label: 'Week', value: '1' },
          { label: 'Month', value: '2' },
          { label: 'Year', value: '3' },
          { label: 'All Time', value: '4' },
        ]}
        value={timeSpan}
        onChange={setTimeSpan}
      />
      <div style={{ marginRight: '50px' }}>
        <BarPlot
          hideColorSwatch
          hideRowLabels
          hideLabels
          data={data}
          aspectRatio={0.1}
          hoverLabel={(item: IPlotData) => (
            <>
              <div>Requests: {item.amount}</div>
              <div>{item.label}</div>
            </>
          )}
        />
      </div>
    </div>
  );
};

export default memo(ActivityGraph);
