import { useCallback, useContext } from 'react';
import ConsumerContext from '@website/context';
import { first } from 'lodash';

export const useConsumer = () => {
  // logic to retrieve and manage attributes
  const { consumer: consumerResponse, fetching } = useContext(ConsumerContext);
  const data =
    typeof consumerResponse === 'string' ? JSON.parse(consumerResponse)?.data?.data : null;
  const meta =
    typeof consumerResponse === 'string' ? JSON.parse(consumerResponse)?.data?.meta : null;
  const errorMessages = ['Total limit crossed max records', 'No data found'];

  if (data && errorMessages.includes(data?.original?.[0])) {
    return {
      meta: {
        icon: first(meta)?.icon || 'fa-square',
      },
      data: [],
    };
  }

  return {
    data: data && Object.keys(data).map((key) => data[key]),
    meta: { icon: first(meta)?.icon || 'fa-square' },
    isFetching: fetching,
    renderCollection: useCallback(
      (fn, renderFallback, renderPlaceholder, renderLoading) => {
        // Show placeholder only on initial load (no data yet, but fetching)
        if (fetching && (!data || Object.keys(data).length === 0) && renderPlaceholder) {
          return renderPlaceholder();
        }
        // Show existing posts with loading indicator at bottom (for infinite scroll)
        if (data && Object.keys(data)?.length > 0) {
          const posts = Object.keys(data).map((key) => fn(data[key], key));
          if (fetching && renderLoading) {
            posts.push(renderLoading());
          }
          return posts;
        }
        // Show no posts message only when not fetching and no data
        if (!fetching && data && Object.keys(data)?.length === 0 && renderFallback) {
          return renderFallback();
        }
      },
      [data, fetching]
    ),
  };
};
