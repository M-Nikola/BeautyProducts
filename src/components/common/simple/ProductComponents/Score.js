import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PercentageCircle  from 'react-native-percentage-circle';

import { fontSize, spacing, colors } from '../../../../utils/constants';

// Score component showing product score in percentage
// 0-33 -> red , 33-66 -> yellow, 66-100 -> green color

const Score = (props) => {
    let { radius = 15, percent } = props;
    const color = percent < 35 ? colors.orange : percent < 87.5 ? colors.default : colors.green;
    return (
        <View style={[styles.container, props.style]}>
            <PercentageCircle radius={radius} percent={percent} color={color} bgcolor={colors.white} borderWidth={1}>
                <Text style={[styles.score, {color: color}, props.scoreStyle]}>
                    {percent + '%'}
                </Text>
            </PercentageCircle>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { 
        paddingTop: spacing.small
    },
    score: {
        fontSize: fontSize.extraSmall,
        fontFamily: 'Open Sans',
        fontWeight: '200',
    }
});

export default Score;


