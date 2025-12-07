import { useContext } from 'react';
import ConsumerContext from '@website/context';

export const useConsumer = () => {
  // logic to retrieve and manage attributes
  const consumerResponse = useContext(ConsumerContext);
  const response = typeof consumerResponse === 'string' ? JSON.parse(consumerResponse) : null;
  return response && Object.keys(response).map((key) => response[key]);
};
