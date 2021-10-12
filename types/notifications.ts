export type NotificationState = {
    id: string;
    notificationIdentifiers: string[];
};

export type NotificationAction = {
    type: string;
    id: string;
    notificationIdentifiers: string[];
};
