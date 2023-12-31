import { FC, ReactNode, memo } from 'react';
import styles from './radio.module.css';
import {
  Radio as MantineRadio,
  RadioGroupProps,
  RadioProps,
} from '@mantine/core';
import { Item } from '@ui/CustomTransferList/CustomTransferList';
import { setter } from '@custom-types/ui/atomic';
import { Helper } from '@ui/basics';
import inputStyles from '@styles/ui/input.module.css';
import { IDropdownContent } from '@custom-types/ui/basics/helper';

const Radio: FC<{
  label: ReactNode;
  field: string;
  items: Item[];
  form: any;
  onChange?: setter<string>;
  onBlur?: () => void;
  groupProps?: RadioGroupProps;
  radioProps?: RadioProps;
  helperContent?: IDropdownContent;
  required?: boolean;
  shrink?: boolean;
}> = ({
  label,
  field,
  items,
  form,
  onChange,
  onBlur,
  groupProps,
  radioProps,
  helperContent,
  required,
  shrink,
}) => {
  return (
    <div
      className={`${styles.wrapper} ${
        shrink ? inputStyles.shrink : ''
      }`}
    >
      <div className={inputStyles.labelWrapper}>
        <div className={inputStyles.label}>
          {label}
          {required && (
            <div className={inputStyles.labelRequired}>*</div>
          )}
        </div>
        {helperContent && <Helper dropdownContent={helperContent} />}
      </div>

      <MantineRadio.Group
        size={shrink ? 'sm' : 'md'}
        {...groupProps}
        {...form.getInputProps(field)}
        onChange={onChange}
        onBlur={onBlur}
      >
        {items.map((item: Item, index: number) => (
          <MantineRadio
            key={index}
            classNames={{
              label: inputStyles.subLabel,
            }}
            {...radioProps}
            value={item.value}
            label={item.label}
          />
        ))}
      </MantineRadio.Group>
    </div>
  );
};

export default memo(Radio);
