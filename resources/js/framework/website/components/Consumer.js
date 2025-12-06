import React, { memo } from 'react';
import { Grid } from '@mui/material';
import ConsumerContext from '@website/context';
import { useSecureRoute } from '@app/hooks';
import { Loader } from '@ui/components/Placeholder';
import Panel from '@ui/components/Panel';

export const Consumer = ({ children, entity }) => {
  const api = useSecureRoute();
  const [consumer, setConsumer] = React.useState(() => (
    <>
      <Loader variant="circular" height={40} width={40} />
      {Array.from({ length: 2 }).map((_, i) => (
        <Loader variant="text" height={30} width="50%" key={i} />
      ))}
    </>
  ));
  React.useEffect(() => {
    api &&
      api.get(`/consumer`, {}, { headers: { 'X-Entity': entity } }).then((response) => {
        setConsumer(JSON.stringify(response?.data?.data) || null);
      });
  }, []);
  return <ConsumerContext.Provider value={consumer}>{children}</ConsumerContext.Provider>;
};

export default memo(Consumer);
