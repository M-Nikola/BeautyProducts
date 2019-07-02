import React from 'react';
import { View, ScrollView, Text, StyleSheet, Dimensions } from 'react-native';

import NameScore from '../../../common/simple/ProductComponents/NameScore';
import Author from '../../../common/simple/BlogComponents/Author';
import { spacing, fontSize, colors } from '../../../../utils/constants';
import { calculateTimePassed } from '../../../../utils/functions';

// TODO finish after design is complete
// Blogs component showing list of blogs

const Blogs = (props) => {
    return (
        <ScrollView 
            style={styles.container}
            nestedScrollEnabled={props.enableScroll} // true
            //scrollEnabled={props.enableScroll}
        >
            {
                props.blogs ? 
                    props.blogs.map((item, index) => {
                        const { title, summary, author, link } = item;
                        const date = calculateTimePassed(item.date);
                        return (
                            <View 
                                style={styles.blog}
                                key={index}
                            >
                                <Text style={styles.date}>
                                    {date}
                                </Text>
                                
                                {/* <NameScore 
                                    style={{flex: 0}}
                                    nameStyle={styles.title}
                                    name={title}
                                    score={score}
                                /> */}

                                <Author 
                                    data={author}
                                />

                                <Text 
                                    style={styles.title}
                                    numberOfLines={props.numberOfLines}
                                >
                                    {title}
                                </Text>
                            </View>
                        )
                    }) :
                    null
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        maxHeight: Dimensions.get('screen').height - 168
    },
    blog: {
        marginTop: 1,
        backgroundColor: colors.white, 
        paddingTop: spacing.medium,
        paddingBottom: spacing.medium,
        paddingLeft: spacing.extraBig,
        paddingRight: spacing.extraBig,
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
        fontSize: fontSize.medium,
        fontWeight: 'bold'
    },
    description: {
        marginTop: spacing.small,
        marginBottom: spacing.small,
        fontSize: fontSize.semiMedium,
        color: colors.darkGray,
        fontFamily: 'Roboto'
    },
    authorContainer: {
        flexDirection: 'row'
    },
    authorImageContainer: {},
    authorImage: {
        width: 30, 
        height: 30,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: colors.red
    },
    authorNameFollowersContainer: {
        marginLeft: spacing.small
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
    }
});

export default Blogs;