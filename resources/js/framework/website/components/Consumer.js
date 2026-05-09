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
  const [blocked, setBlocked] = React.useState(false);
  const [calling, setCalling] = React.useState(true);
  const [consumer, setConsumer] = React.useState({});
  const apiCheckOK = api && calling && !blocked;
  const generateParsedResponse = (response) => {
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
    return parsedResponse;
  };

  useScrollEffect(() => {
    if (blocked) {
      setFetching(false);
      setCalling(false);
      return;
    }
    if (scroll) {
      setFetching(true);
      setCalling(true);
      setStart(Number(end));
      setEnd(Number(end) + Number(limit));
    }
  }, [start, end]);

  React.useEffect(() => {
    apiCheckOK &&
      api.post(`/consumer`, { limit, offset: start, entity: table }).then((response) => {
        setCalling(false);
        setFetching(false);

        if (first(response?.data?.data?.original)?.includes('Total limit crossed max records')) {
          setBlocked(true);
          setFetching(false);
          setConsumer(
            JSON.stringify({
              data: {
                data: [],
                meta: [{ icon: response?.data?.meta?.[0]?.icon || 'fa-square' }],
              },
            })
          );
          return;
        }

        if (first(response?.data?.data?.original)?.includes('No data found')) {
          setFetching(false);
          setConsumer(
            JSON.stringify({
              data: {
                data: [],
                meta: [{ icon: response?.data?.meta?.[0]?.icon || 'fa-square' }],
              },
            })
          );
          return;
        }
        const parsedResponse = generateParsedResponse(response);

        setConsumer(JSON.stringify(parsedResponse));
        setStart(start);
        setEnd(end);
      });
  }, []);

  return (
    <ConsumerContext.Provider value={{ consumer, fetching }}>{children}</ConsumerContext.Provider>
  );
};

export default memo(Consumer);
