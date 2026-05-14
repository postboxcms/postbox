import React, { memo } from 'react';
import { first } from 'lodash';
import ConsumerContext from './context';
import { useSecureRoute } from '@app/hooks';
import { useScrollEffect } from '@website/hooks';

export const Consumer = ({ children, scroll, table, offset, limit }) => {
  const api = useSecureRoute();
  const hasCalledRef = React.useRef(false);
  const [end, setEnd] = React.useState(limit || 10);
  const [start, setStart] = React.useState(offset || 0);
  const [fetching, setFetching] = React.useState(false);
  const [blocked, setBlocked] = React.useState(false);
  const [consumer, setConsumer] = React.useState({});
  const [scrollbarHidden, setScrollbarHidden] = React.useState(false);
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

  const fetchData = React.useCallback(
    (fetchStart) => {
      if (!api || blocked) return;

      api.post(`/consumer`, { limit, offset: fetchStart, entity: table }).then((response) => {
        setFetching(false);

        if (first(response?.data?.data?.original)?.includes('Total limit crossed max records')) {
          setBlocked(true);
          return;
        }

        if (first(response?.data?.data?.original)?.includes('No data found')) {
          setBlocked(true);
          return;
        }
        const parsedResponse = generateParsedResponse(response);
        setConsumer(JSON.stringify(parsedResponse));
      });
    },
    [api, table, limit, blocked, consumer, fetching]
  );

  // Manual load more function for when scrollbar is hidden
  const loadMore = React.useCallback(() => {
    if (blocked || fetching) return;
    setFetching(true);
    setStart(Number(end));
    setEnd(Number(end) + Number(limit));
    fetchData(Number(end));
  }, [end, limit, blocked, fetching, fetchData]);

  // Detect if scrollbar is hidden (content fits on screen)
  const checkScrollbar = React.useCallback(() => {
    const hasScrollbar = document.body.scrollHeight > window.innerHeight;
    setScrollbarHidden(!hasScrollbar && !blocked);
  }, [blocked]);

  // Initial load on mount
  React.useEffect(() => {
    if (!hasCalledRef.current && api) {
      hasCalledRef.current = true;
      setFetching(true);
      fetchData(offset || 0);
    }
  }, [table, api, offset, fetchData]);

  // Check scrollbar status when data changes
  React.useEffect(() => {
    checkScrollbar();
    // Also check on window resize
    const handleResize = () => checkScrollbar();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [consumer, blocked, checkScrollbar]);

  useScrollEffect(() => {
    if (blocked) {
      setFetching(false);
      return;
    }
    if (scroll) {
      setFetching(true);
      setStart(Number(end));
      setEnd(Number(end) + Number(limit));
      fetchData(Number(end));
    }
  }, [start, end, scroll, blocked, limit, fetchData]);

  return (
    <ConsumerContext.Provider value={{ consumer, fetching, loadMore, scrollbarHidden, blocked }}>{children}</ConsumerContext.Provider>
  );
};

export default memo(Consumer);
