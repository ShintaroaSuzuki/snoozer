export * from './todo';
export * from './notifications';
export * from './types';

import { TodoState } from './todo';
import { Notifications } from './notifications';

export type SelectorState = {
    todo: TodoState[];
    notifications: Notifications;
};
