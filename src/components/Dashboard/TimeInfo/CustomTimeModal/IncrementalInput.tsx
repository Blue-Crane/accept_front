import { FC, memo, useRef, useState } from 'react';
import {
  ActionIcon,
  Group,
  NumberInput,
  NumberInputHandlers,
} from '@mantine/core';

const IncrementalInput: FC<{
  initialValue: number;
  onChange: (_: number) => void;
  title: string;
}> = ({ onChange, initialValue, title }) => {
  const [value, setValue] = useState(initialValue);
  const handlers = useRef<NumberInputHandlers>();

  return (
    <Group spacing={20} dir="row">
      <Group spacing={5}>
        <ActionIcon
          size={42}
          variant="default"
          onClick={() =>
            handlers.current && handlers.current.decrement()
          }
        >
          –
        </ActionIcon>

        <NumberInput
          hideControls
          value={value}
          onChange={(val) => {
            setValue(val || 0);
            onChange(val || 0);
          }}
          handlersRef={handlers}
          styles={{ input: { width: 60, textAlign: 'center' } }}
        />

        <ActionIcon
          size={42}
          variant="default"
          onClick={() =>
            handlers.current && handlers.current.increment()
          }
        >
          +
        </ActionIcon>
      </Group>
      <div>{title}</div>
    </Group>
  );
};

export default memo(IncrementalInput);
