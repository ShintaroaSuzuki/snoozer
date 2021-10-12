import { initialNotificationState } from '../initialState';
import { NotificationState, NotificationAction } from '../../types';

export const notificationReducer = (
    state = initialNotificationState,
    action: NotificationAction
): NotificationState[] => {
    switch (action.type) {
        case 'ADD_NOTIFICATIONS':
            return [
                ...state,
                {
                    id: action.id,
                    notificationIdentifiers: action.notificationIdentifiers
                }
            ];
        case 'DELETE_NOTIFICATIONS':
            return state.filter((e) => e.id != action.id);
        default:
            return state;
    }
};
