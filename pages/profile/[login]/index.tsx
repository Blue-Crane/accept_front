import { DefaultLayout } from '@layouts/DefaultLayout';
import { getApiUrl } from '@utils/getServerUrl';
import { GetServerSideProps } from 'next';
import { ReactNode } from 'react';
import ProfileInfo from '@components/Profile/ProfileInfo/ProfileInfo';
import styles from '@styles/profile/login.module.css';
import { useUser } from '@hooks/useUser';
import Title from '@ui/Title/Title';
import ProfileSticky from '@components/Profile/ProfileSticky/ProfileSticky';
import { IFullProfileBundle } from '@custom-types/data/IProfileInfo';

function UserProfile(props: IFullProfileBundle) {
  const { isAdmin, accessLevel } = useUser();
  return (
    <div className={styles.wrapper}>
      <Title title={props.user.shortName} />
      {isAdmin && accessLevel >= props.user.role.accessLevel && (
        <>
          <ProfileSticky {...props} />
        </>
      )}
      <ProfileInfo {...props} />
    </div>
  );
}

UserProfile.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default UserProfile;

const API_URL = getApiUrl();

export const getServerSideProps: GetServerSideProps = async (
  context
) => {
  const req = context.req;
  if (!req || !req.url)
    return {
      redirect: {
        permanent: false,
        destination: '/profile/me',
      },
    };

  const login = req.url
    .slice(req.url.lastIndexOf('/') + 1)
    .split('.')[0];

  const response = await fetch(
    `${API_URL}/api/bundle/profile/${login}`,
    {
      headers: {
        cookie: req.headers.cookie,
      } as { [key: string]: string },
    }
  );

  if (response.status === 307) {
    return {
      redirect: {
        permanent: false,
        destination: '/profile/me',
      },
    };
  }

  if (response.status === 200) {
    const profileData = await response.json();
    return {
      props: {
        user: profileData.user,
        attempt_info: profileData.attempt_info,
        task_info: profileData.task_info,
        rating_info: profileData.rating_info,
      },
    };
  }
  return {
    redirect: {
      permanent: false,
      destination: '/404',
    },
  };
};
