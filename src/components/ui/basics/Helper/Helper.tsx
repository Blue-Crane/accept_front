import { Help } from 'tabler-icons-react';
import { FC, memo } from 'react';
import styles from './helper.module.css';
import { Icon } from '@ui/basics';
import { MyHelperProps } from '@custom-types/ui/basics/helper';
import { HoverCard } from '@mantine/core';

const Helper: FC<MyHelperProps> = ({
  dropdownContent,
  hoverCardProps,
  hoverCardTargetProps,
  hoverCardDropdownProps,
  customIcon,
  iconColor,
  size,
}) => {
  return (
    <HoverCard
      withArrow
      position="bottom"
      arrowSize={5}
      transition={'scale'}
      transitionDuration={300}
      {...hoverCardProps}
    >
      <HoverCard.Target {...hoverCardTargetProps}>
        <div>
          <Icon size={size || 'xs'}>
            {customIcon || (
              <Help color={iconColor || 'var(--dark4)'} />
            )}
          </Icon>
        </div>
      </HoverCard.Target>
      <HoverCard.Dropdown {...hoverCardDropdownProps}>
        <div className={styles.contentWrapper}>
          {typeof dropdownContent == 'string' ? (
            dropdownContent
          ) : dropdownContent instanceof Array ? (
            <div>
              {dropdownContent.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          ) : (
            dropdownContent || ''
          )}
        </div>
      </HoverCard.Dropdown>
    </HoverCard>
  );
};

export default memo(Helper);
