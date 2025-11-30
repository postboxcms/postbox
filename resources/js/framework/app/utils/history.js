import { createBrowserHistory, createMemoryHistory } from 'history';

export const history = typeof document !== typeof undefined ? createBrowserHistory() : createMemoryHistory();