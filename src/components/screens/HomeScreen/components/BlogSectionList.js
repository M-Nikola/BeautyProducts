import React, { Component } from 'react';
import { SectionList, View, Text, Animated, StyleSheet, Dimensions } from 'react-native';

import Blog from './Blog';
import { fontSize, spacing, colors } from '../../../../utils/constants';
import { homeData } from '../../../../TestData';

const BlogSectionList = (props) => {
    // TODO changed data based on props.data(category)
    return (
        <SectionList
            style={{maxHeight: Dimensions.get('screen').height - 40}}
            sections={homeData}
            contentContainerStyle={styles.sectionListContainer}
            nestedScrollEnabled={props.enableScroll}
            // scrollEventThrottle={1}
            // onScroll={props.onScroll}
            // onMomentumScrollEnd={props.onMomentumScrollEnd}
            renderItem={({item, index, section}) =>
                <Blog 
                    data={item}
                    openWebView={(uri) => console.log('openWebView')}
                />
            }
            renderSectionHeader={({section: {title}}) => (                     
                <View style={styles.sectionHeaderContainer}>
                    <Text style={styles.sectionHeader}>
                        {title}
                    </Text>
                </View>
            )}
            keyExtractor={(item, index) => item + index}
        />
    )
}

const styles = StyleSheet.create({
    sectionListContainer: {
        backgroundColor: colors.lightGray,
    },
    sectionHeaderContainer: {
        backgroundColor: colors.white,
        padding: spacing.medium,
        paddingLeft: spacing.medium,
    },
    sectionHeader: {
        width: '70%',
        fontFamily: 'Roboto',
        fontSize: fontSize.extraHuge, 
        color: colors.darkGray,
        fontWeight: 'bold',
    }
});

export default BlogSectionList;