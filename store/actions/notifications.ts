import { NotificationState, NotificationAction } from '../../types';

export const addNotifications = ({
    id,
    notificationIdentifiers
}: NotificationState): NotificationAction => {
    return {
        type: 'ADD_NOTIFICATIONS',
        id,
        notificationIdentifiers
    };
};

export const deleteNotifications = ({
    id,
    notificationIdentifiers
}: NotificationState): NotificationAction => {
    return {
        type: 'DELETE_NOTIFICATIONS',
        id,
        notificationIdentifiers
    };
};
