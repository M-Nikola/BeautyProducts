import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from '../Icons/Icon';

import { spacing } from '../../../../utils/constants';

// Icon Button Component
// pass containerStyle prop to style Icon container
// pass iconName, iconSize, iconColor, iconFont props to style Icon
// pass onPress function to handle button click

const IconButton = (props) => (
    <TouchableOpacity onPress={props.onPress}>           
        <View style={[styles.container, props.containerStyle]}>
            <Icon 
                name={props.iconName}
                size={props.iconSize}
                color={props.iconColor}
                font={props.iconFont}
            />
            {props.children}
        </View>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.small
    }
});

export default IconButton;

