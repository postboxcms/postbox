import React, { memo } from 'react';
import { first } from 'lodash';
import ConsumerContext from '@website/context';
import { useSecureRoute } from '@app/hooks';
import { useScrollEffect } from '@website/hooks';

export const Consumer = ({ children, scroll, table, offset, limit }) => {
  const api = useSecureRoute();
  const [end, setEnd] = React.useState(limit || 10);
  const [start, setStart] = React.useState(offset || 0);
  const [fetching, setFetching] = React.useState(false);
  const [consumer, setConsumer] = React.useState({});

  useScrollEffect(() => {
    if (scroll) {
      setFetching(true);
      setStart(Number(end));
      setEnd(Number(end) + Number(limit));
    }
  }, [start, end]);

  React.useEffect(() => {
    api &&
      api
        .get(`/consumer`, { limit: end, offset: start }, { headers: { 'X-Entity': table } })
        .then((response) => {
          if (first(response?.data?.data?.original)?.includes('No data found')) {
            setFetching(false);
            return;
          }
          const parsedConsumer = typeof consumer === 'string' ? JSON.parse(consumer) : {};
          let data = {};
          let consumerLength = parsedConsumer?.data?.data
            ? Object.keys(parsedConsumer?.data?.data).length
            : 0;
          for (const key in response?.data?.data) {
            data[consumerLength++] = response?.data?.data[key];
          }
          const parsedResponse = {
            ...parsedConsumer,
            data: { data: { ...parsedConsumer?.data?.data, ...data } },
          };
          setConsumer(JSON.stringify(parsedResponse));
          setStart(start);
          setEnd(end);
          setFetching(false);
        });
  }, [fetching]);

  return (
    <ConsumerContext.Provider value={{ consumer, fetching }}>{children}</ConsumerContext.Provider>
  );
};

export default memo(Consumer);
