import React, { useEffect, useState, useRef } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    TextInput,
    Text,
    TouchableOpacity,
    ScrollView,
    Appearance,
    ColorSchemeName
} from 'react-native';
import { Todo } from '../components/Todo';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from '../store/actions/todo';
import { RootStackParamList, SelectorState } from '../types';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { addNotifications } from '../store/actions/notifications';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getRoundTime, createNotifications } from '../utils';

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Root'>;
};

export const TodoListScreen: React.FC<Props> = ({ navigation }: Props) => {
    useEffect(() => {
        setNowTime(getRoundTime());
        textInputRef.current?.focus();
    }, []);

    const colorScheme: ColorSchemeName = Appearance.getColorScheme();

    const [nowTime, setNowTime] = useState<Date>(new Date());
    const [text, setText] = useState<string>('');

    const textInputRef = useRef<TextInput>(null);

    const dispatch = useDispatch();
    const todo = useSelector((state: SelectorState) => state.todo);

    const _onChangeText = (value: string) => {
        setText(value);
        setNowTime(getRoundTime());
    };

    const _onSubmitEditing = async () => {
        if (text) {
            const newTime = getRoundTime();
            const id = uuidv4();
            dispatch(
                addTodo({
                    id,
                    title: text,
                    time: newTime
                })
            );
            _onChangeText('');
            textInputRef.current?.focus();
            dispatch(
                addNotifications({
                    id,
                    notificationIdentifiers: await createNotifications(
                        text,
                        newTime
                    )
                })
            );
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
                style={{
                    ...styles.textInputContainer,
                    backgroundColor: colorScheme == 'dark' ? '#444' : '#eee',
                    borderBottomColor: colorScheme == 'dark' ? '#111' : '#ccc'
                }}
                onPress={() => {
                    setNowTime(getRoundTime());
                    textInputRef.current?.focus();
                }}
                activeOpacity={1.0}
            >
                <TextInput
                    ref={textInputRef}
                    style={{
                        ...styles.textInput,
                        color: colorScheme == 'dark' ? '#eee' : '#000'
                    }}
                    placeholder="リマインダーを追加"
                    value={text}
                    onChangeText={(value) => _onChangeText(value)}
                    maxLength={20}
                    onSubmitEditing={() => _onSubmitEditing()}
                    returnKeyType="done"
                    autoFocus={true}
                />
                <Text
                    style={{
                        ...styles.nowTime,
                        color: colorScheme == 'dark' ? '#888' : '#777'
                    }}
                >
                    {moment(nowTime).format('HH:mm')}
                </Text>
            </TouchableOpacity>
            <ScrollView>
                {todo.map(({ id, title, time }) => {
                    return (
                        <Todo
                            id={id}
                            title={title}
                            time={time}
                            navigation={navigation}
                            key={`todo_${id}`}
                        />
                    );
                })}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
    textInputContainer: {
        alignSelf: 'center',
        width: '98%',
        height: 56,
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        borderBottomWidth: 1,
        marginBottom: 8
    },
    textInput: {
        fontSize: 14,
        height: 48
    },
    nowTime: {
        position: 'absolute',
        right: 8,
        fontSize: 12
    }
});
