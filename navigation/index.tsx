/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
    NavigationContainer,
    DefaultTheme,
    DarkTheme
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import { TodoListScreen } from '../screens/TodoListScreen';
import ModalScreen from '../screens/ModalScreen';
import { RootStackParamList } from '../types';
import { TodoDetailScreen } from '../screens/TodoDetailScreen';

export default function Navigation({
    colorScheme
}: {
    colorScheme: ColorSchemeName;
}) {
    return (
        <NavigationContainer
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
            <RootNavigator />
        </NavigationContainer>
    );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Root"
                component={TodoListScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Detail"
                component={TodoDetailScreen}
                options={{ headerShown: false }}
            />
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen name="Modal" component={ModalScreen} />
            </Stack.Group>
        </Stack.Navigator>
    );
}
