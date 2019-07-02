import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { fontSize, spacing, colors } from '../../../../utils/constants';

// Description component with default styling
// pass description prop to display description
// pass style prop to style description container

const Description = (props) => (
    <View style={[styles.container, props.style]}>
        <Text 
            style={[styles.text, props.textStyle]}
            numberOfLines={props.numberOfLines}
        >
            {props.description}
        </Text>
    </View>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        width: '90%',
        fontSize: fontSize.small,
        fontFamily: 'Open Sans',
        color: colors.default
    }
});

export default Description;