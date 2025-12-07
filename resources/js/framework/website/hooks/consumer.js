import { useContext } from 'react';
import ConsumerContext from '@website/context';

export const useConsumer = () => {
  // logic to retrieve and manage attributes
  const consumerResponse = useContext(ConsumerContext);
  console.log('Consumer Response:', consumerResponse);
  const data =
    typeof consumerResponse === 'string' ? JSON.parse(consumerResponse)?.data?.data : null;
  const meta =
    typeof consumerResponse === 'string' ? JSON.parse(consumerResponse)?.data?.meta : null;
  if (data && data?.original?.[0].includes('No data found')) {
    return {
      meta: {
        icon: meta?.[0]?.icon || 'fa-square',
      },
      data: [],
    };
  }
  return (
    data && {
      data: Object.keys(data).map((key) => data[key]),
      meta: { icon: meta?.[0]?.icon || 'fa-square' },
    }
  );
};
