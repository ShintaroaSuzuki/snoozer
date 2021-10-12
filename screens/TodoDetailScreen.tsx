import React, { useState } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    TouchableOpacity,
    TextInput,
    Dimensions,
    Alert,
    Appearance,
    ColorSchemeName
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, SelectorState, NotificationState } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { BackIcon } from '../components/icons';
import { updateTodo } from '../store/actions/todo';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
    deleteNotifications,
    addNotifications
} from '../store/actions/notifications';
import { createNotifications, cancelNotifications } from '../utils';

type Props = {
    route: RouteProp<RootStackParamList, 'Detail'>;
    navigation: NativeStackNavigationProp<RootStackParamList, 'Detail'>;
};

export const TodoDetailScreen: React.FC<Props> = ({
    route,
    navigation
}: Props) => {
    const colorScheme: ColorSchemeName = Appearance.getColorScheme();

    const { id } = route.params;

    const dispatch = useDispatch();

    const { title, time } = useSelector(
        (state: SelectorState) => state.todo
    ).filter((e) => e.id == id)[0];
    const notifications = useSelector(
        (state: SelectorState) => state.notifications
    );

    const [update, setUpdate] = useState<boolean>(false);

    const onChange = async (event: Event, date?: Date) => {
        if (!!date && date > new Date()) {
            cancelNotifications(
                notifications.filter((e: NotificationState) => e.id == id)[0]
                    .notificationIdentifiers
            );
            dispatch(deleteNotifications({ id, notificationIdentifiers: [] }));
            dispatch(updateTodo({ id, title, time: date || time }));
            dispatch(
                addNotifications({
                    id,
                    notificationIdentifiers: await createNotifications(
                        title,
                        date || time
                    )
                })
            );
        } else {
            Alert.alert('過去の日付は指定できません');
            setUpdate(!update);
        }
    };

    return (
        <SafeAreaView
            style={{
                ...styles.container,
                backgroundColor: colorScheme == 'dark' ? '#333' : '#fff'
            }}
        >
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => {
                    navigation.goBack();
                }}
                activeOpacity={1.0}
            >
                <BackIcon colorScheme={colorScheme} />
            </TouchableOpacity>
            <TextInput
                style={{
                    ...styles.title,
                    color: colorScheme == 'dark' ? '#eee' : '#000'
                }}
                value={title}
                onChangeText={(text) =>
                    dispatch(updateTodo({ id, title: text, time }))
                }
                autoCapitalize="none"
                autoCorrect={false}
                autoFocus={true}
            />
            <View style={styles.dateTimePickerContainer}>
                <DateTimePicker
                    style={{
                        width: Dimensions.get('window').width * 0.35,
                        marginVertical: 24,
                        marginLeft: 16
                    }}
                    value={new Date(time)}
                    mode="date"
                    display="default"
                    onChange={(event: Event, date?: Date) =>
                        onChange(event, date)
                    }
                />
                <DateTimePicker
                    style={{
                        width: Dimensions.get('window').width * 0.3,
                        marginVertical: 24,
                        marginLeft: 8
                    }}
                    value={new Date(time)}
                    mode="time"
                    display="default"
                    minuteInterval={15}
                    is24Hour={true}
                    onChange={(event: Event, date?: Date) =>
                        onChange(event, date)
                    }
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    backButton: {
        marginLeft: 8
    },
    title: {
        marginTop: 16,
        marginLeft: 16,
        fontSize: 28
    },
    dateTimePickerContainer: {
        flexDirection: 'row'
    },
    snoozeTimesContainer: {
        marginLeft: 16,
        marginTop: 16,
        flexDirection: 'row',
        alignItems: 'center'
    },
    snoozeTimesLabel: {
        fontSize: 20
    },
    snoozeTimes: {
        fontSize: 24,
        marginLeft: 16
    }
});
