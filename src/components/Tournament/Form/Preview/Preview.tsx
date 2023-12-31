import { ITournament } from '@custom-types/data/ITournament';
import { FC, memo } from 'react';
import Description from '@components/Tournament/Description/Description';

const Preview: FC<{ tournament: ITournament }> = ({ tournament }) => {
  return (
    <div style={{ zoom: '80%' }}>
      <Description tournament={tournament} />
    </div>
  );
};

export default memo(Preview);
