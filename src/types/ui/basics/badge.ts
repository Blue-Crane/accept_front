import {
  BadgeProps as MantineBadgeProps,
  TooltipProps,
} from '@mantine/core';

export interface BadgeProps extends MantineBadgeProps {
  color?: string;
  tooltipProps?: Omit<TooltipProps, 'children'>;
}
