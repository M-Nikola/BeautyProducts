import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from '../Icons/Icon';

import { fontSize, spacing, colors } from '../../../../utils/constants';

// Icon Text Component
// pass text prop to set text
// pass iconName, iconSize, iconColor, iconFont props to setup Icon
// pass containerStyle prop to style IconText container
// pass textStyle prop to style Text

const IconText = (props) => {
    const { iconName, iconSize = fontSize.small, iconColor = colors.default, iconFont } = props;
    return (
        <View style={[styles.container, props.containerStyle]}>
            <Icon 
                name={iconName}
                size={iconSize}
                color={iconColor}
                font={iconFont}
            />
            <Text style={[styles.text, props.textStyle]}>
                {props.text}
            </Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontSize: fontSize.small,
        marginLeft: spacing.extraSmall,
        marginRight: spacing.big
    }
});

export default IconText;