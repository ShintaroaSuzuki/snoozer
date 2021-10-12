import * as Notifications from 'expo-notifications';
import { notificationMessages } from './notificationMessages';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true
    })
});

export const createNotifications = async (text: string, time: Date) => {
    const notificationIdentifiers: string[] = [];
    for (let i = 0; i < 5; i++) {
        notificationIdentifiers.push(
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: text,
                    body: notificationMessages[
                        Math.floor(Math.random() * notificationMessages.length)
                    ]
                },
                trigger: new Date(time.getTime() + 60 * 15 * 1000 * i)
            })
        );
    }
    return notificationIdentifiers;
};

export const cancelNotifications = (notificationIdentifiers: string[]) => {
    for (let notificationIdentifier of notificationIdentifiers) {
        if (notificationIdentifier) {
            Notifications.cancelScheduledNotificationAsync(
                notificationIdentifier
            );
        }
    }
};
