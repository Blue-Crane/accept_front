import { IOrganizationFull } from '@custom-types/data/IOrganization';
import { FC, memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@styles/organization.module.css';
import { useLocale } from '@hooks/useLocale';

const SpecView: FC<{
  organization: IOrganizationFull;
  preview?: boolean;
}> = ({ organization, preview }) => {
  const { locale } = useLocale();

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Image
            src={organization.logo}
            width={100}
            height={100}
            alt={`logo of ${organization.spec}`}
          />
        </div>
        <div className={styles.name}>
          <div className={styles.title}>{organization.title}</div>
          <div className={styles.spec}>{organization.spec}</div>
          {!!!preview && (
            <div className={styles.adminWrapper}>
              {`${locale.organization.form.principal}: `}
              <Link
                href={`/profile/${organization.principal.login}`}
                className={styles.admin}
              >
                {organization.principal.shortName}
              </Link>
            </div>
          )}
        </div>
      </div>
      <div
        className={styles.description}
        dangerouslySetInnerHTML={{
          __html: organization.description,
        }}
      />
    </div>
  );
};

export default memo(SpecView);
