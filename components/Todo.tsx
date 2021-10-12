import React, { useState, useRef } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Animated,
    Appearance,
    ColorSchemeName
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import GestureRecognizer from 'react-native-swipe-gestures';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { SelectorState, NotificationState, RootStackParamList } from '../types';
import { deleteTodo } from '../store/actions/todo';
import { deleteNotifications } from '../store/actions/notifications';
import { DoneIcon } from '../components/icons';
import { cancelNotifications } from '../utils';

type Props = {
    id: string;
    title: string;
    time: Date;
    navigation: NativeStackNavigationProp<RootStackParamList, 'Root'>;
};

export const Todo: React.FC<Props> = ({
    id,
    title,
    time,
    navigation
}: Props) => {
    const colorScheme: ColorSchemeName = Appearance.getColorScheme();

    const animValue = useRef(new Animated.Value(0)).current;
    const [doneVisible, setDoneVisible] = useState<boolean>(false);

    const dispatch = useDispatch();
    const notifications = useSelector(
        (state: SelectorState) => state.notifications
    );

    const _onLeftSwipe = () => {
        Animated.timing(animValue, {
            toValue: 100,
            duration: 200,
            useNativeDriver: false
        }).start();
        setDoneVisible(true);
    };

    const _onRightSwipe = () => {
        Animated.timing(animValue, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false
        }).start();
        setTimeout(() => setDoneVisible(false), 200);
    };

    const _onPress = () => {
        if (!doneVisible) {
            navigation.navigate('Detail', { id });
        }
    };

    const _onPressDone = () => {
        Animated.timing(animValue, {
            toValue: 300,
            duration: 200,
            useNativeDriver: false
        }).start();
        setTimeout(() => dispatch(deleteTodo({ id, title, time })), 300);
        cancelNotifications(
            notifications.filter((e: NotificationState) => e.id == id)[0]
                .notificationIdentifiers
        );
        dispatch(deleteNotifications({ id, notificationIdentifiers: [] }));
    };

    const interpolatedValue = animValue.interpolate({
        inputRange: [0, 100, 300],
        outputRange: [0, -48, -wp(100) - 48]
    });

    return (
        <GestureRecognizer
            onSwipeLeft={() => {
                _onLeftSwipe();
            }}
            onSwipeRight={() => {
                _onRightSwipe();
            }}
        >
            <Animated.View
                style={{
                    ...styles.container,
                    left: interpolatedValue,
                    borderBottomColor: colorScheme == 'dark' ? '#111' : '#ccc'
                }}
            >
                <TouchableOpacity
                    style={styles.todoContainer}
                    containerStyle={styles.todoContainer}
                    onPress={() => _onPress()}
                    activeOpacity={1.0}
                >
                    <Text
                        style={{
                            ...styles.title,
                            color: colorScheme == 'dark' ? '#eee' : '#000'
                        }}
                    >
                        {title}
                    </Text>
                    <Text
                        style={{
                            ...styles.time,
                            color: colorScheme == 'dark' ? '#888' : '#777'
                        }}
                    >
                        {moment(time).format('HH:mm')}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.doneButton}
                    onPress={() => _onPressDone()}
                >
                    <DoneIcon />
                </TouchableOpacity>
                <View style={styles.swipeSpace} />
            </Animated.View>
        </GestureRecognizer>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 48,
        borderBottomWidth: 0.5,
        flexDirection: 'row'
    },
    todoContainer: {
        width: '100%',
        height: 48,
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        position: 'absolute',
        left: 8,
        fontSize: 14
    },
    time: {
        position: 'absolute',
        right: 8,
        fontSize: 12
    },
    doneButton: {
        width: 48,
        height: 48,
        backgroundColor: '#16EEC7',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: '#aaaaaa'
    },
    swipeSpace: {
        width: '100%',
        height: 48,
        backgroundColor: '#16EEC7',
        borderBottomWidth: 0.5,
        borderBottomColor: '#aaaaaa'
    }
});
