import { useCallback, useContext } from 'react';
import ConsumerContext from '@website/providers/Consumer/context';
import { first } from 'lodash';

export const useConsumer = () => {
  // logic to retrieve and manage attributes
  const { consumer: consumerResponse, fetching, loadMore, scrollbarHidden } = useContext(ConsumerContext);
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
      loadMore,
      scrollbarHidden,
    };
  }

  return {
    data: data && Object.keys(data).map((key) => data[key]),
    meta: { icon: first(meta)?.icon || 'fa-square' },
    isFetching: fetching,
    loadMore,
    scrollbarHidden,
    renderCollection: useCallback(
      (fn, renderFallback, renderPlaceholder, renderLoading, renderViewMore) => {
        // Show placeholder only on initial load (no data yet, but fetching)
        if (fetching && (!data || Object.keys(data).length === 0) && renderPlaceholder) {
          return renderPlaceholder();
        }
        // Show existing posts with loading indicator at bottom (for infinite scroll)
        if (data && Object.keys(data)?.length > 0) {
          const posts = Object.keys(data).map((key) => fn(data[key], key));
          if (fetching && renderLoading) {
            posts.push(renderLoading());
          } else if (scrollbarHidden && renderViewMore && !fetching) {
            posts.push(renderViewMore());
          }
          return posts;
        }
        // Show no posts message only when not fetching and no data
        if (!fetching && data && Object.keys(data)?.length === 0 && renderFallback) {
          return renderFallback();
        }
      },
      [data, fetching, scrollbarHidden]
    ),
  };
};
