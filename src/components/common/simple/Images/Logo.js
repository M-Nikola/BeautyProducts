import React from 'react';
import { Image, StyleSheet } from 'react-native';

import { logoSize } from '../../../../utils/constants';

// Logo Image component

const Logo = (props) => (
    <Image 
        style={[styles.image, props.style]}
        source={require('../../../../assets/logo-icon.png')}
    />
)

const styles = StyleSheet.create({
    image: {
        width: logoSize,
        height: logoSize
    }
});

export default Logo;