import { FC, memo, useCallback, useMemo } from 'react';
import { IUserDisplay } from '@custom-types/data/IUser';
import { UserSelector } from '@ui/selectors';
// import styles from './moderators.module.css'

const Moderators: FC<{ form: any; users: IUserDisplay[] }> = ({
  form,
  users,
}) => {
  const setFieldValue = useCallback(
    (users: string[]) => form.setFieldValue('moderators', users),
    [] // eslint-disable-line
  );
  const initialProps = useMemo(() => {
    form.getInputProps('moderators');
  }, []); // eslint-disable-line
  return (
    <>
      <UserSelector
        setUsers={setFieldValue}
        inputProps={initialProps}
        selectedUsers={form.values.moderators}
      />
    </>
  );
};

export default memo(Moderators);
