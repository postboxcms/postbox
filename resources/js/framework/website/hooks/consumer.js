import { useContext } from 'react';
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
        icon: first(meta?.icon) || 'fa-square',
      },
      data: [],
    };
  }

  return {
    data: data && Object.keys(data).map((key) => data[key]),
    meta: { icon: first(meta?.icon) || 'fa-square' },
    isFetching: fetching,
    responsePayload: () => (data && data?.data?.length > 0 ? data?.data?.map : []),
  };
};
