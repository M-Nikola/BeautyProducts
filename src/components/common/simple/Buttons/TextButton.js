import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

import { fontSize, spacing, colors } from '../../../../utils/constants'; 

// Text Button component
// pass text prop to set text
// pass onPress handle function
// pass style, textStyle to style it

const TextButton = (props) => (
    <TouchableOpacity
        onPress={props.onPress}
        style={[styles.container, props.style]}
    >           
        <Text style={[styles.text, props.textStyle]}>
            {props.text}
        </Text>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.small
    },
    text: {
        fontSize: fontSize.medium,
        color: colors.darkGray
    },
});

export default TextButton;

