import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

import Icon from '../Icons/Icon';

import { spacing, fontSize, colors } from '../../../../utils/constants';

// Icon Text Component
// pass placeholder to set placeholder for input
// pass iconName, iconSize, iconColor, iconFont to style icon
// pass inputStyle to style input

const IconTextInput = (props) => {
    const { style, iconName, iconSize, iconColor, iconFont, value, placeholder, 
        keyboardType, secureTextEntry, inputStyle, children } = props;
    return (
        <View style={[styles.container, style]}>
            <Icon 
                name={iconName}
                size={iconSize}
                color={iconColor}
                font={iconFont}
            />

            <TextInput
                style={[styles.input, inputStyle]}
                value={value}
                onChangeText={props.onChangeText}
                placeholder={placeholder}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                underlineColorAndroid='transparent'
            />

            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.extraLightGray,
        borderRadius: spacing.small,
        marginTop: spacing.medium,
        paddingTop: spacing.small, 
        paddingBottom: spacing.small,
        paddingLeft: spacing.medium,
        paddingRight: spacing.medium
    },
    input: {
        flex: 1,
        paddingTop: 0, 
        paddingBottom: 0,
        paddingLeft: spacing.medium,
        paddingRight: spacing.medium,
        fontFamily: 'Roboto',
        fontSize: fontSize.medium,
        color: colors.darkGray
    }
});

export default IconTextInput;