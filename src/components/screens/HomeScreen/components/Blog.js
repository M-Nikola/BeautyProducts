import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import Author from '../../../common/simple/BlogComponents/Author';
import { fontSize, spacing, colors } from '../../../../utils/constants';
import { calculateTimePassed } from '../../../../utils/functions';

const Blog = (props) => {
    const { openWebView, showImage, imageLoaded } = props;
    const { products, title, summary, image, link, author, date } = props.data;
    const dateTime = calculateTimePassed(date);
    return (
        <View style={styles.container}>
            <Text style={styles.section}>
                {products.categories.join(' & ').toUpperCase()}
            </Text>

            <Text style={styles.date}>
                {dateTime}
            </Text>
            
            <Author 
                data={author}
            />

            <TouchableOpacity
                onPress={() => openWebView(link)}
            >
                <Text style={styles.title}>
                    {title}
                </Text>
            </TouchableOpacity>

            <Text style={styles.description}>
                {summary}
            </Text>
            
            <Image
                style={[styles.image, {display: showImage ? 'flex' : 'none'}]}
                source={{uri: image}}
                onError={error => console.log(error, 'error')}
                onLoad={() => imageLoaded()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        marginBottom: spacing.small,
        padding: spacing.big
    },
    section: {
        fontFamily: 'Open sans',
        fontSize: fontSize.small,
        fontWeight: 'bold',
        color: colors.red
    },
    date: {
        fontSize: fontSize.extraSmall,
        fontFamily: 'Poppins',
        color: colors.categoriesLightGray,
    },
    title: {
        marginTop: spacing.medium,
        color: colors.darkGray,
        fontFamily: 'Roboto',
        fontSize: fontSize.extraBig,
        fontWeight: 'bold'
    },
    description: {
        marginTop: spacing.medium,
        fontFamily: 'Open sans',
        fontSize: fontSize.medium,
        color: colors.darkGray,
        fontFamily: 'Roboto'
    },
    image: {
        width: '100%',
        height: 200,
        marginTop: spacing.medium
    }
});

export default Blog;