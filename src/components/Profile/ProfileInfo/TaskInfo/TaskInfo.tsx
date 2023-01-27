import { getColor } from '@constants/Colors';
import { ITaskInfo } from '@custom-types/data/IProfileInfo';
import { IPlotData } from '@custom-types/ui/IPlot';
import { useLocale } from '@hooks/useLocale';
import { BarPiePlot } from '@ui/Plot';
import { FC, memo, useMemo } from 'react';
import DefaultCentralText from '@ui/Plot/PiePlot/DefaultCentralText/DefaultCentralText';
import styles from './taskInfo.module.css';

const TaskInfo: FC<ITaskInfo> = ({
  total,
  verdict_distribution,
  complexity_distribution,
}) => {
  const { locale } = useLocale();

  const complexity_data = useMemo(
    () =>
      complexity_distribution.map(
        (item, index) =>
          ({
            label: `${item.start}-${item.end}%`,
            amount: item.amount,
            color: getColor(index, 0), // 'var(--secondary)',
          } as IPlotData)
      ),
    [complexity_distribution]
  );

  const verdict_data = useMemo(
    () =>
      verdict_distribution.map(
        (item) =>
          ({
            label: item.name,
            amount: item.amount,
            color: item.name === 'OK' ? '#37B24D' : '#FA5252',
          } as IPlotData)
      ),
    [verdict_distribution]
  );

  return (
    <div className={styles.wrapper}>
      <BarPiePlot
        title={locale.profile.info.task.complexity}
        data={complexity_data}
        centralLabel={(props) => <DefaultCentralText {...props} />}
        defaultText={{
          color: '',
          label: locale.total,
          amount: total,
        }}
      />
      <BarPiePlot
        title={locale.profile.info.task.verdicts}
        data={verdict_data}
        centralLabel={(props) => <DefaultCentralText {...props} />}
        defaultText={{
          label: locale.total,
          amount: total,
          color: '',
        }}
      />
    </div>
  );
};

export default memo(TaskInfo);
