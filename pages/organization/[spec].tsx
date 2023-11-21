import { DefaultLayout } from '@layouts/DefaultLayout';
import { ReactNode } from 'react';
import { GetServerSideProps } from 'next';
import { getApiUrl } from '@utils/getServerUrl';
import { IOrganizationFull } from '@custom-types/data/IOrganization';
import styles from '@styles/organization.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Title from '@ui/Title/Title';

function Task(organization: IOrganizationFull) {
  return (
    <>
      <Title title={`Организация ${organization.title}`} />
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <Image
              src={organization.logo}
              width={125}
              height={125}
              alt={`logo of ${organization.spec}`}
            />
          </div>
          <div className={styles.name}>
            <h1 className={styles.title}>{organization.title}</h1>
            <div className={styles.spec}>{organization.spec}</div>

            <div className={styles.adminWrapper}>
              {'Admin: '}
              <Link
                href={`/profile/${organization.principal.login}`}
                className={styles.admin}
              >
                {organization.principal.shortName}
              </Link>
            </div>
          </div>
        </div>
        <div
          className={styles.description}
          dangerouslySetInnerHTML={{
            __html: organization.description,
          }}
        />
      </div>
    </>
  );
}

Task.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Task;

const API_URL = getApiUrl();

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  if (!query.spec) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
    };
  }
  const spec = query.spec;

  const response = await fetch(
    `${API_URL}/api/organization/${spec}`,
    {
      method: 'GET',
      headers: {
        cookie: req.headers.cookie,
      } as { [key: string]: string },
    }
  );
  if (response.status === 200) {
    const response_json = await response.json();

    return {
      props: response_json,
    };
  }
  return {
    redirect: {
      permanent: false,
      destination: '/404',
    },
  };
};
