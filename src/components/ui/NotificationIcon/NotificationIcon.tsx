import { useBackNotifications } from '@hooks/useBackNotifications';
import { Indicator } from '@ui/basics';
import { FC, memo } from 'react';
import { BellRinging } from 'tabler-icons-react';

const NotificationIcon: FC<{
  iconSize?: number;
  indicatorSize?: number;
  color?: string;
}> = ({ iconSize, indicatorSize, color }) => {
  const { unviewed } = useBackNotifications();
  return (
    <Indicator size={indicatorSize || 7} disabled={unviewed <= 0}>
      <BellRinging
        color={color || 'var(--secondary)'}
        size={iconSize || 20}
      />
    </Indicator>
  );
};

export default memo(NotificationIcon);
