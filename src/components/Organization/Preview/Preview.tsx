import { IOrganizationAdd } from '@custom-types/data/IOrganization';
import { UseFormReturnType } from '@mantine/form';
import { FC, memo } from 'react';

const Preview: FC<{
  form: UseFormReturnType<IOrganizationAdd>;
}> = ({ form }) => {
  return <div></div>;
};

export default memo(Preview);
