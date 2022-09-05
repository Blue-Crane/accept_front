import { ReactNode, useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useUser } from '@hooks/useUser';
import { useWidth } from '@hooks/useWidth';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { getApiUrl } from '@utils/getServerUrl';
import Sticky from '@ui/Sticky/Sticky';
import DeleteModal from '@components/Assignment/DeleteModal/DeleteModal';
import Description from '@components/Assignment/Description/Description';
import { Pencil, Trash } from 'tabler-icons-react';
import { STICKY_SIZES } from '@constants/Sizes';
import {
  IAssignment,
  IAssignmentDisplay,
} from '@custom-types/data/IAssignment';
import ChatSticky from '@ui/ChatSticky/ChatSticky';

function Assignment(props: { assignment: IAssignment }) {
  const assignment = props.assignment;
  const [activeModal, setActiveModal] = useState(false);

  const { isTeacher } = useUser();
  const { width } = useWidth();

  const actions = [
    {
      color: 'green',
      icon: (
        <Pencil
          width={STICKY_SIZES[width] / 3}
          height={STICKY_SIZES[width] / 3}
        />
      ),
      href: `/edu/assignment/edit/${assignment.spec}`,
    },
    {
      color: 'red',
      icon: (
        <Trash
          width={STICKY_SIZES[width] / 3}
          height={STICKY_SIZES[width] / 3}
        />
      ),
      onClick: () => setActiveModal(true),
    },
  ];

  return (
    <>
      <DeleteModal
        active={activeModal}
        setActive={setActiveModal}
        assignment={
          {
            ...assignment,
            taskNumber: assignment.tasks.length,
          } as IAssignmentDisplay
        }
      />
      {isTeacher && <Sticky actions={actions} />}
      <ChatSticky spec={assignment.spec} />
      <Description assignment={assignment} />
    </>
  );
}

Assignment.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Assignment;

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
    `${API_URL}/api/assignment/${params.spec}`
  );
  if (response.status === 200) {
    const assignment = await response.json();
    return {
      props: {
        assignment,
      },
      revalidate: 10 * 60,
    };
  }
  return {
    redirect: {
      permanent: false,
      destination: '/Not-Found',
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
