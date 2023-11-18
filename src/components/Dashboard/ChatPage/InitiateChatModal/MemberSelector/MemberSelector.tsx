import { FC, memo } from 'react';
import { UserSelect } from '@ui/selectors';
import { useLocale } from '@hooks/useLocale';

const MemberSelector: FC<{
  entity: string;
  type: 'tournament' | 'assignment';
  form: any;
  field: string;
}> = ({ entity, type, form, field }) => {
  const { locale } = useLocale();
  return (
    <>
      <UserSelect
        url={`${type}/bundle/users/${entity}`}
        label={locale.dashboard.chat.userModal.user.label}
        placeholder={locale.dashboard.chat.userModal.user.placeholder}
        nothingFound={
          locale.dashboard.chat.userModal.user.nothingFound
        }
        selectedUsers={[form.values[field]]}
        select={(logins: string[]) => {
          logins.length > 0 && form.setFieldValue(field, logins[0]);
        }}
        additionalProps={form.getInputProps(field)}
      />
    </>
  );
};

export default memo(MemberSelector);
