import React from 'react';
import { Image, StyleSheet } from 'react-native';

// Image component with default styling
// pass img prop for source

const ProductImage = (props) => {
    const { style, resizeMode, img } = props;
    return (
        <Image 
            style={[styles.image, style]}
            resizeMode={resizeMode}
            source={{uri: img}}
        />
    )
}

const styles = StyleSheet.create({
    image: {
        width: '25%',
        height: '100%'
    }
});

export default ProductImage;