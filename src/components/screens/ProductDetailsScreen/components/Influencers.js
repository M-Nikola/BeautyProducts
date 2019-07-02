import React from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

import Author from '../../../common/simple/BlogComponents/Author';
import { fontSize, spacing, colors } from '../../../../utils/constants';
// TODO finish when design is done
// Influencers component showing list of Influencers

const Influencers = (props) => (
    <ScrollView 
        style={styles.container}
        nestedScrollEnabled={true}
    >
        {
            props.influencer ?
                props.influencers.map((item, index) => (
                    <View
                        style={styles.influencer}
                        key={index}
                    >
                        <TouchableOpacity
                            onPress={() => props.openWebView(item.author.link)}
                        >
                            <Author 
                                data={item.author}
                            />
                        </TouchableOpacity>

                        <Text
                            style={styles.description}
                            numberOfLines={2}
                        >
                            {item.description}
                        </Text>

                        <Image
                            resizeMode='cover'
                            style={styles.image}
                            source={{uri: item.img}}
                        />
                    </View>
                ))
            : null
        }
    </ScrollView>
)

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('screen').height - 168
    },
    influencer: {
        marginTop: 1,
        paddingLeft: spacing.extraBig,
        paddingRight: spacing.extraBig,
        paddingTop: spacing.medium,
        paddingBottom: spacing.medium,
        backgroundColor: colors.white
    },
    authorContainer: {
        flexDirection: 'row'
    },    
    authorImage: {
        width: 30, 
        height: 30,
        borderRadius: 30,
    },
    author: {
        fontFamily: 'Open Sans',
        fontSize: fontSize.small,
        color: colors.default
    },
    followers: {
        fontFamily: 'Open Sans',
        fontSize: fontSize.extraSmall,
        color: '#ABA9AB'
    },
    description: {
        marginTop: spacing.medium,
        fontSize: fontSize.semiMedium,
        color: colors.darkGray,
        fontFamily: 'Roboto'
    },
    image: {
        width: '100%',
        aspectRatio: 2/1,
        marginTop: spacing.medium,
    }
});

export default Influencers;