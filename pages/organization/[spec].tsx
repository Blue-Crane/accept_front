import { DefaultLayout } from '@layouts/DefaultLayout';
import { ReactNode, useState } from 'react';
import { GetServerSideProps } from 'next';
import { getApiUrl } from '@utils/getServerUrl';
import { IOrganizationFull } from '@custom-types/data/IOrganization';
import Title from '@ui/Title/Title';
import { useLocale } from '@hooks/useLocale';
import { useUser } from '@hooks/useUser';
import Sticky, { IStickyAction } from '@ui/Sticky/Sticky';
import { Pencil, PigMoney, Trash } from 'tabler-icons-react';
import { STICKY_SIZES } from '@constants/Sizes';
import { useWidth } from '@hooks/useWidth';
import SpecView from '@components/Organization/SpecView';
import DeleteModal from '@components/Organization/DeleteModal/DeleteModal';
import SubscriptionModal from '@components/Organization/SubscriptionModal/SubscriptionModal';
import { useRequest } from '@hooks/useRequest';

function Organization(organization: IOrganizationFull) {
  const { locale } = useLocale();
  const { isDeveloper } = useUser();
  const { width } = useWidth();

  const [hasWriteRights, setHasWriteRights] = useState(false);

  const [activeDeleteModal, setActiveDeleteModal] = useState(false);
  const [activeSubscriptionModal, setActiveSubscriptionModal] =
    useState(false);

  useRequest<{}, boolean>(
    `rights_organization/${organization.spec}/write/organization_modification`,
    'GET',
    undefined,
    undefined,
    (res) => {
      setHasWriteRights(res.response);
    }
  );

  const stickyActions: IStickyAction[] = [
    {
      color: 'green',
      href: `/organization/edit/${organization.spec}`,
      icon: (
        <Pencil
          width={STICKY_SIZES[width] / 3}
          height={STICKY_SIZES[width] / 3}
        />
      ),
      description: locale.tip.sticky.organization.edit,
    } as IStickyAction,
  ].concat(
    isDeveloper
      ? ([
          {
            color: 'red',
            icon: (
              <Trash
                width={STICKY_SIZES[width] / 3}
                height={STICKY_SIZES[width] / 3}
              />
            ),
            onClick: () => setActiveDeleteModal(true),
            description: locale.tip.sticky.organization.delete,
          },

          {
            color: 'grape',
            icon: (
              <PigMoney
                width={STICKY_SIZES[width] / 3}
                height={STICKY_SIZES[width] / 3}
              />
            ),
            onClick: () => setActiveSubscriptionModal(true),
            description: locale.tip.sticky.organization.delete,
          },
        ] as IStickyAction[])
      : []
  );

  return (
    <>
      <Title
        title={`${locale.titles.organization.spec} ${organization.title}`}
      />
      <DeleteModal
        active={activeDeleteModal}
        setActive={setActiveDeleteModal}
        organization={organization}
      />
      <SubscriptionModal
        active={activeSubscriptionModal}
        setActive={setActiveSubscriptionModal}
        organization={organization}
      />
      {(isDeveloper || hasWriteRights) && (
        <Sticky actions={stickyActions} />
      )}
      <SpecView organization={organization} />
    </>
  );
}

Organization.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Organization;

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
