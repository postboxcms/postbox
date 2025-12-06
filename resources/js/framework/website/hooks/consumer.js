import { useContext } from 'react';
import ConsumerContext from '@website/context';

export const useConsumer = () => {
  // logic to retrieve and manage attributes
  const consumerResponse = useContext(ConsumerContext);
  return consumerResponse || null;
};
