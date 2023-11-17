import Form from '@components/Notification/Form/Form';
import { FC, memo } from 'react';

const CrateNotification: FC<{}> = ({}) => {
  return (
    <div
      style={{
        minHeight: '300px',
        margin: 'var(--spacer-xl) var(--spacer-l) 0 0',
      }}
    >
      <Form noDefault />
    </div>
  );
};

export default memo(CrateNotification);
