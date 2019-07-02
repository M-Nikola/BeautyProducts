import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import Icon from '../Icons/Icon';
import { fontSize, spacing, colors } from '../../../../utils/constants';

const Author = (props) => {
    let { name, image, text } = props.data;
    // TODO REMOVE THIS AFTER API IS FIXED
    if (image && image.constructor === Array) {
        image = image[0];
    }
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                {
                    image ? 
                        <Image
                            resizeMode='cover'
                            style={styles.image}
                            source={{uri: image} }
                        /> :
                        null
                }
            </View>

            <View style={image ? styles.nameFollowersContainer : {}}>
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>
                        {name}
                    </Text>

                    <Icon
                        name='checkcircle'
                        size={fontSize.extraSmall}
                        color={colors.lightBlue}
                        font='AntDesign'
                    />
                </View>

                <Text style={styles.followers}>
                    {text}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: spacing.small
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 30,
        height: 30,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: colors.red
    },
    nameFollowersContainer: {
        marginLeft: spacing.medium
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    name: {
        color: colors.darkGray, 
        fontWeight: 'bold', 
        marginRight: spacing.small
    },
    followers: {
        fontSize: fontSize.extraSmall
    }
});

export default Author;