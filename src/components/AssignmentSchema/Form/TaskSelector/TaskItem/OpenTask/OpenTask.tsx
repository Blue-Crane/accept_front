import { ActionIcon } from '@mantine/core';
import { EyeOpenIcon } from '@modulz/radix-icons';
import { FC, memo } from 'react';

const OpenTask: FC<{ spec: string }> = ({ spec }) => {
  return (
    <ActionIcon<'a'>
      component="a"
      href={`/edu/task/${spec}`}
      target="_blank"
      tabIndex={5}
      color="blue"
      variant="hover"
      size="lg"
    >
      <EyeOpenIcon width={20} height={20} />
    </ActionIcon>
  );
};

export default memo(OpenTask);