import React from 'react';
import Video from 'react-native-video';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

import Author from '../../../common/simple/BlogComponents/Author';
import { fontSize, spacing, colors } from '../../../../utils/constants';

// Videos component showing list of Videos

const Videos = (props) => (
    <ScrollView 
        style={styles.container}
        nestedScrollEnabled={true}
    >
        {
            props.videos ?
                props.videos.map((item, index) => (
                    <View
                        style={styles.video}
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

                        {/* <Video 
                            source={{uri:"https://youtu.be/iusRUoDbsSk"}}   // Can be a URL or a local file.
                            ref={(ref) => { this.player = ref }}                                      // Store reference
                            onBuffer={() => console.log('onBuffer')}                // Callback when remote video is buffering
                            onError={(error) => console.log('onError', error)}               // Callback when video cannot be loaded
                            style={styles.video} 
                        /> */}
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
    video: {
        marginTop: 1,
        paddingLeft: spacing.extraBig,
        paddingRight: spacing.extraBig,
        paddingTop: spacing.medium,
        paddingBottom: spacing.medium,
        backgroundColor: colors.white,
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
        color: colors.followersColor
    },
    description: {
        marginTop: spacing.medium,
        fontSize: fontSize.semiMedium,
        color: colors.darkGray,
        fontFamily: 'Roboto'
    },
    video: {
        width: '100%',
        aspectRatio: 2/1,
        marginTop: spacing.medium,
    }
});

export default Videos;