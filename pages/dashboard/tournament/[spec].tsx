import { ReactNode } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { getApiUrl } from '@utils/getServerUrl';
import TournamentDashboard from '@components/Dashboard/TournamentDashboard';
import { useLocale } from '@hooks/useLocale';
import Title from '@ui/Title/Title';
import { REVALIDATION_TIME } from '@constants/PageRevalidation';

function TournamentDashboardPage(props: { spec: string }) {
  const { locale } = useLocale();
  return (
    <>
      <Title title={locale.titles.dashboard.tournament} />
      <TournamentDashboard spec={props.spec} />;
    </>
  );
}

TournamentDashboardPage.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default TournamentDashboardPage;

const API_URL = getApiUrl();

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || typeof params?.spec !== 'string') {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
  const response = await fetch(
    `${API_URL}/api/tournament/${params.spec}`
  );
  if (response.status === 200) {
    const tournament = await response.json();
    return {
      props: { spec: tournament.spec },
      revalidate: REVALIDATION_TIME.dashboard.tournament,
    };
  }
  return {
    redirect: {
      permanent: false,
      destination: '/404',
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
