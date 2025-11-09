import { createBrowserHistory } from 'history';

export const history = typeof document !== typeof undefined ? createBrowserHistory() : null;