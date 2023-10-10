import { Tooltip, TooltipProps } from '@mantine/core';
import { FC, memo, useMemo } from 'react';

interface CustomTipProps extends TooltipProps {
  floating?: boolean;
}

const Tip: FC<CustomTipProps> = ({
  children,
  floating,
  ...tipProps
}) => {
  const componentProps: Omit<TooltipProps, 'children'> = useMemo(
    () => ({
      withArrow: true,
      arrowSize: 7,
      withinPortal: true,
      disabled: tipProps.label === undefined,
      styles: {
        tooltip: {
          backgroundColor: 'white',
          color: 'black',
          outline: '1px solid var(--dark5)',
        },
        arrow: {
          border: '1px solid var(--dark5)',
        },
      },
      ...tipProps,
    }),
    [tipProps]
  );

  if (floating)
    return (
      <Tooltip.Floating {...componentProps}>
        <span>{children}</span>
      </Tooltip.Floating>
    );

  return (
    <Tooltip {...componentProps}>
      <span>{children}</span>
    </Tooltip>
  );
};

export default memo(Tip);
