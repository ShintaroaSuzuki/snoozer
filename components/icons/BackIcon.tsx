import React from 'react';
import { ColorSchemeName } from 'react-native';
import Svg, { Line } from 'react-native-svg';

export const BackIcon = ({ colorScheme }: { colorScheme: ColorSchemeName }) => {
    return (
        <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <Line
                x1="19.3536"
                y1="8.35355"
                x2="11.3536"
                y2="16.3536"
                stroke={colorScheme == 'dark' ? '#eee' : '#000'}
            />
            <Line
                x1="11.3536"
                y1="15.6464"
                x2="19.3536"
                y2="23.6464"
                stroke={colorScheme == 'dark' ? '#eee' : '#000'}
            />
        </Svg>
    );
};
