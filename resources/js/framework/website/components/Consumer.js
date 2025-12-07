import React, { memo } from 'react';
import { Grid } from '@mui/material';
import ConsumerContext from '@website/context';
import { useSecureRoute } from '@app/hooks';
import { Loader } from '@ui/components/Placeholder';
import Panel from '@ui/components/Panel';

export const Consumer = ({ children, table, placeholder, start, end }) => {
  const api = useSecureRoute();
  const CustomPlaceholder = typeof placeholder === 'string' ? () => placeholder : placeholder;
  const BlankPlaceholder = () => (
    <>
      <div
        style={{ display: 'flex', gap: '20px', width: '100%', flex: '1 1 0', flexDirection: 'row' }}
      >
        <Loader style={{ flex: 1 }} variant="circular" height={60} width={60} />
        <div style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
          {Array.from({ length: 3 }).map((_, i) => (
            <Loader style={{ flex: 1 }} variant="text" height={20} width="80%" key={i} />
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', marginTop: '20px', width: '100%', flexDirection: 'column' }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Loader style={{ flex: 1 }} variant="text" height={25} width="100%" key={i} />
        ))}
      </div>
    </>
  );
  const [limit, setLimit] = React.useState(end || 10);
  const [offset, setOffset] = React.useState(start || 0);
  const [consumer, setConsumer] = React.useState(() =>
    placeholder ? <CustomPlaceholder /> : <BlankPlaceholder />
  );
  React.useEffect(() => {
    api &&
      api
        .get(`/consumer`, { limit, offset }, { headers: { 'X-Entity': table } })
        .then((response) => {
          setConsumer(JSON.stringify(response?.data?.data) || null);
          setLimit(response?.data?.data?.length || 0);
          setOffset(offset);
        });
  }, []);
  return <ConsumerContext.Provider value={consumer}>{children}</ConsumerContext.Provider>;
};

export default memo(Consumer);
