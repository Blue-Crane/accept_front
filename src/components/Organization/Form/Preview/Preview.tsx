import SpecView from '@components/Organization/SpecView';
import {
  IOrganizationAdd,
  IOrganizationFull,
} from '@custom-types/data/IOrganization';
import { UseFormReturnType } from '@mantine/form';
import { FC, memo } from 'react';

const Preview: FC<{
  form: UseFormReturnType<IOrganizationAdd>;
}> = ({ form }) => {
  return (
    <>
      <SpecView
        organization={
          {
            ...form.values,
            principal: {
              login: form.values.principal,
              shortName: 'Иванов И.И.',
            },
          } as IOrganizationFull
        }
        preview
      />
    </>
  );
};

export default memo(Preview);
