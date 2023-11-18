import { IUser } from '@custom-types/data/IUser';
import { FC, memo } from 'react';
import styles from './mainInfo.module.css';
import { Medal2 } from 'tabler-icons-react';
import { Badge, UserAvatar } from '@ui/basics';
import { IOrganizationDisplayWithRole } from '@custom-types/data/IOrganization';
import { getRatingColor, getRoleColor } from '@utils/color';

const MainInfo: FC<{
  user: IUser;
  organizations: IOrganizationDisplayWithRole[];
  place?: number;
}> = ({ user, organizations, place }) => {
  return (
    <div className={styles.main}>
      <div className={styles.avatarWrapper}>
        <UserAvatar login={user.login} size="xl" />
        {place && place < 4 && (
          <Medal2
            strokeWidth={0.8}
            size={'45px'}
            fill={getRatingColor(place)}
            className={styles.medal}
          />
        )}
      </div>
      <div className={styles.text}>
        <div className={styles.nameWrapper}>
          <div className={styles.fullName}>
            <span className={styles.name}>{user.surname}</span>
            <span className={styles.name}>{user.name}</span>
            {user.patronymic.length > 0 && (
              <span className={styles.name}>{user.patronymic}</span>
            )}
          </div>
          <div className={styles.organizations}>
            {organizations.map((organizationWithRole, index) => (
              <Badge
                key={index}
                color={getRoleColor(
                  organizationWithRole.role.accessLevel
                )}
                tooltipProps={{
                  label: organizationWithRole.organization.title,
                }}
              >
                {organizationWithRole.role.name}
              </Badge>
            ))}
          </div>
        </div>
        <div className={styles.login}>{user.login}</div>
      </div>
    </div>
  );
};

export default memo(MainInfo);
