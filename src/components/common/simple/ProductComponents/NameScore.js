import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Score from './Score';
import { fontSize, spacing, colors } from '../../../../utils/constants';

// Name Score component
// pass name, score props to define texts
// pass nameStyle, scoreStyle to style texts
// pass style prop to style it's container

const NameScore = (props) => (
    <View style={[styles.container, props.style]}>
        <Text 
            style={[styles.name, props.nameStyle]}
            numberOfLines={props.numberOfLines}
        >
            {props.name}
        </Text>
        {
            props.score ? 
                <Score 
                    scoreStyle={props.scoreStyle}
                    percent={props.score}
                    radius={props.scoreRadius}
                /> 
                : null
        } 
    </View>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    name: {
        flex: 1,
        paddingRight: spacing.medium,
        fontFamily: 'Open Sans',
        fontSize: fontSize.medium, 
        color: colors.extraDarkGray,
        fontWeight: '500'
    }
});

export default NameScore;