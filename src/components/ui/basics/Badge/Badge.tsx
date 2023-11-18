import { FC, memo } from 'react';
import { Badge as MantineBadge } from '@mantine/core';
import { BadgeProps } from '@custom-types/ui/basics/badge';
import Tip from '../Tip/Tip';

const Badge: FC<BadgeProps> = ({
  color,
  tooltipProps = {
    disabled: true,
    label: '',
  },
  children,
  ...props
}) => {
  const styleProps = color
    ? {
        color: color,
        background: `${color}30`,
      }
    : {};
  return (
    <Tip {...tooltipProps}>
      <MantineBadge style={styleProps} {...props}>
        {children}
      </MantineBadge>
    </Tip>
  );
};

export default memo(Badge);
