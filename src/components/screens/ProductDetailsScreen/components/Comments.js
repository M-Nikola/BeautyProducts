import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet, Dimensions } from 'react-native';

import { fontSize, spacing, colors } from '../../../../utils/constants';
import { calculateTimePassed } from '../../../../utils/functions';
// TODO finish when design is done
// Comments component showing list of comments

const Comments = (props) => {
    return (
        <ScrollView 
            style={styles.container}
            nestedScrollEnabled={true}
        >
            {
                props.comments ? 
                    props.comments.map((item, index) => {
                        const date = calculateTimePassed(item.date);
                        return (
                            <View
                                style={styles.commentContainer}
                                key={index}
                            >
                                <View style={styles.authorContainer}>
                                    <Text style={styles.date}>
                                        {`${date} | ${item.source}`}
                                    </Text>

                                    <Text style={styles.author}>
                                        {item.author}
                                    </Text>
                                </View>

                                <Text style={styles.comment}>
                                    {item.comment}
                                </Text>
                            </View>
                        )
                    })
                : null
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('screen').height - 168
    },
    commentContainer: {
        marginTop: 1,
        paddingLeft: spacing.extraBig,
        paddingRight: spacing.extraBig,
        paddingTop: spacing.medium,
        paddingBottom: spacing.medium,
        backgroundColor: colors.white
    },
    authorContainer: {
    },
    author: {
        marginTop: spacing.medium,
        fontFamily: 'Open Sans',
        fontSize: fontSize.medium,
        fontWeight: 'bold',
        color: colors.darkGray, 
    },
    date: {
        fontSize: fontSize.extraSmall,
        fontFamily: 'Poppins',
        color: colors.categoriesLightGray,
    },
    source: {
        fontFamily: 'Open Sans',
        fontSize: fontSize.small,
        fontWeight: '300',
        color: colors.defaultTransparent
    },
    comment: {
        marginTop: spacing.medium,
        fontSize: fontSize.semiMedium,
        color: colors.darkGray,
        fontFamily: 'Roboto'
    }
});

export default Comments;