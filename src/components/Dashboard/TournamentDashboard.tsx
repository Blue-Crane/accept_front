import { FC, memo, useEffect, useMemo, useState } from 'react';
import {
  AddressBook,
  AlignRight,
  Ban,
  BellPlus,
  Messages,
  Pencil,
  Puzzle,
  Table,
  Trash,
  Users,
  Vocabulary,
} from 'tabler-icons-react';
import { useLocale } from '@hooks/useLocale';
import { ITournament } from '@custom-types/data/ITournament';
import { IMenuLink } from '@custom-types/ui/IMenuLink';
import LeftMenu from '@ui/LeftMenu/LeftMenu';
import { useUser } from '@hooks/useUser';
import { useWidth } from '@hooks/useWidth';
import { STICKY_SIZES } from '@constants/Sizes';
import DeleteModal from '@components/Tournament/DeleteModal/DeleteModal';
import Sticky from '@ui/Sticky/Sticky';
import { useRequest } from '@hooks/useRequest';
import { useInterval } from '@mantine/hooks';
import TimeInfo from '@components/Dashboard/TimeInfo/TimeInfo';
import TaskList from './TaskList/TaskList';
import AttemptsList from '@components/Dashboard/AttemptsList/AttemptsList';
import CreateNotification from './CreateNotification/CreateNotification';
import Results from './Results/Results';
import ParticipantsListWithBan from './ParticipantsList/ParticipantsListWithBan';
import ChatPage from './ChatPage/ChatPage';
import RegistrationManagement from './RegistrationManagement/RegistrationManagement';

const TournamentDashboard: FC<{
  spec: string;
}> = ({ spec }) => {
  const { locale } = useLocale();

  const [tournament, setTournament] = useState<ITournament>();

  const { data, refetch } = useRequest<undefined, ITournament>(
    `tournament/${spec}`,
    'GET'
  );

  const refetchTournament = useInterval(
    () => refetch(false),
    60 * 1000
  );

  useEffect(() => {
    refetchTournament.start();
    return refetchTournament.stop;
  }, []); // eslint-disable-line

  useEffect(() => {
    if (data) setTournament(data);
  }, [data]);

  const links: IMenuLink[] = useMemo(
    () => [
      {
        page: tournament && (
          <TimeInfo
            type={'tournament'}
            entity={{
              title: tournament.title,
              spec: tournament.spec,
              creator: tournament.author,
            }}
            timeInfo={{
              start: tournament.start,
              end: tournament.end,
              froze: tournament.frozeResults,
              status: tournament.status.spec as 0 | 1 | 2,
            }}
            refetch={refetch}
          />
        ),
        icon: <Vocabulary color="var(--secondary)" />,
        title: locale.dashboard.tournament.mainInfo,
      },
      {
        page: <ChatPage entity={spec} type="tournament" />,
        icon: <Messages color="var(--secondary)" />,
        title: locale.dashboard.tournament.chat,
      },
      {
        page: tournament && (
          <Results
            spec={spec}
            isFinished={tournament.status.spec == 2}
            endDate={tournament.end}
            type={'tournament'}
            full
          />
        ),
        icon: <Table color="var(--secondary)" />,
        title: locale.dashboard.tournament.results,
      },
      {
        page: tournament && (
          <AttemptsList
            key={'all'}
            type={'tournament'}
            spec={tournament.spec}
            shouldNotRefetch={tournament.status.spec != 1}
            isFinished={tournament.status.spec == 2}
            endDate={tournament.end}
          />
        ),
        icon: <AlignRight color="var(--secondary)" />,
        title: locale.dashboard.tournament.attempts,
      },
      {
        page: (
          <ParticipantsListWithBan type={'tournament'} spec={spec} />
        ),
        icon: <Users color="var(--secondary)" />,
        title: locale.dashboard.tournament.participants,
      },
      {
        page: <TaskList type={'tournament'} spec={spec} />,
        icon: <Puzzle color="var(--secondary)" />,
        title: locale.dashboard.tournament.tasks,
      },
      {
        page: <RegistrationManagement spec={spec} />,
        icon: <AddressBook color="var(--secondary)" />,
        title: locale.dashboard.tournament.registrationManagement,
      },
      {
        page: tournament && (
          <CreateNotification
            logins={[
              ...tournament.participants,
              ...tournament.moderators,
              tournament.author,
            ]}
          />
        ),
        icon: <BellPlus color="var(--secondary)" />,
        title: locale.dashboard.tournament.createNotification,
      },
      {
        page: tournament && (
          <AttemptsList
            key={'banned'}
            type={'tournament'}
            banned
            spec={tournament.spec}
            shouldNotRefetch={tournament.status.spec != 1}
            isFinished={tournament.status.spec == 2}
            endDate={tournament.end}
          />
        ),
        icon: <Ban color="var(--secondary)" />,
        title: locale.dashboard.tournament.bannedAttempts,
      },
    ],
    [tournament, locale, refetch, spec]
  );

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
      href: `/tournament/edit/${spec}`,
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
      {isTeacher && (
        <>
          {tournament && (
            <DeleteModal
              active={activeModal}
              setActive={setActiveModal}
              tournament={tournament}
            />
          )}
          <Sticky actions={actions} />
        </>
      )}
      <LeftMenu links={links} />
    </>
  );
};

export default memo(TournamentDashboard);
