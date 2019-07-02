import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { fontSize, spacing, colors } from '../../../../utils/constants';

// BoxText component 
// pass text prop to set text
// pass backgroundColor, textColor to style component

const BoxText = (props) => (
    <View style={[styles.container, props.style, props.backgroundColor]}>
        <Text style={[styles.text, {color: props.textColor}]}>
            {props.text}
        </Text>
    </View>
)

const styles = StyleSheet.create({
    container: {
        height: 20,
        minWidth: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.small,
        paddingLeft: spacing.medium,
        paddingRight: spacing.medium,
        backgroundColor: colors.extraLightGray
    },
    text: {
        fontSize: fontSize.extraSmall
    }
});

export default BoxText;