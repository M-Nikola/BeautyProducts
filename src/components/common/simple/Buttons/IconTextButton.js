import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import IconButton from './IconButton';

import { fontSize, spacing, colors } from '../../../../utils/constants';

// Icon Text Button Component
// pass textStyle prop to change text style
// pass text prop to display that text
// pass extraText prop to dispaly additional text next no exsiting
// check IconButton comment for other neccessery props

const IconTextButton = (props) => (
    <IconButton 
        {...props}
        containerStyle={props.containerStyle}
    >
        <View style={[styles.textContainer, props.textContainerStyle]}>
            <Text style={[styles.text, props.textStyle]}>
                    {props.text}
                </Text>
                {
                    props.extraText ?
                        <Text style={[styles.extraText, props.extraTextStyle]}>
                            {props.extraText}
                        </Text> :
                        null
                }
        </View>
    </IconButton>
)

const styles = StyleSheet.create({
    textContainer: {
        flexDirection: 'row'
    },
    text: {
        fontFamily: 'Roboto',
        fontSize: fontSize.small,
        color: colors.darkGray,
        fontWeight: 'bold',
        marginLeft: spacing.medium
    },
    extraText: {
        fontFamily: 'Roboto',
        fontSize: fontSize.small,
        color: colors.darkGray,
        fontWeight: 'bold',
        marginRight: spacing.small,
        marginLeft: spacing.small
    }
})

export default IconTextButton;

