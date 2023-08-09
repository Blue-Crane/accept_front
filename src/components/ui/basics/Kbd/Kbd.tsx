import { FC, memo } from 'react';
import {
  Kbd as MantineKbd,
  KbdProps as MantineKbdProps,
} from '@mantine/core';
// import styles from './Kbd.module.css'

const Kbd: FC<MantineKbdProps> = (props) => {
  return <MantineKbd {...props} />;
};

export default memo(Kbd);