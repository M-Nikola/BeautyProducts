import React, { Component } from 'react';
import { FlatList, View, Text, ActivityIndicator, Dimensions, Animated, StyleSheet } from 'react-native';

import Blog from './Blog';
import { fontSize, spacing, colors, strings } from '../../../../utils/constants';

import { connect } from 'react-redux';
import { getBlogs } from '../../../../store/actions/blogs_actions';
import { bindActionCreators } from 'redux';

const HEADER_HEIGHT = 159;
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class BlogsList extends Component {
    
    state = {
        showImages: {}
    } 

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.shouldUpdate;
    }

    // scrollToTop = (previousContentOffsetY) => {
    //     console.log('scrollToTop', this.flatList, previousContentOffsetY)
    //     if (this.flatList && this.flatList.contentOffset && this.flatList.contentOffset.y === 0) {
    //         console.log('scroll to')
    //         const y = previousContentOffsetY >= HEADER_HEIGHT ? HEADER_HEIGHT : previousContentOffsetY;
    //         this.flatList.scrollTo(({ y, animated: false }))
    //     }
    // }

    render() {
        const { category, setFlatListRef, search, onScroll, onScrollBeginDrag, onScrollEndDrag, onMomentumScrollEnd, Blogs, openWebView } = this.props;
        const blogs = Blogs.blogs[category];
        return (
            <View style={styles.container}>
                {
                    //blogs ?
                        <AnimatedFlatList
                            ref={setFlatListRef}
                            contentContainerStyle={styles.flatListContainer}
                            scrollEventThrottle={16}
                            onScroll={onScroll}
                            onScrollBeginDrag={onScrollBeginDrag}
                            onScrollEndDrag={onScrollEndDrag}
                            onMomentumScrollEnd={onMomentumScrollEnd}
                            data={blogs}
                            renderItem={({ item, index }) => {
                                const showImages = this.state.showImages;
                                return (
                                    <Blog 
                                        data={item}
                                        openWebView={openWebView}
                                        showImage={showImages && showImages[`${index}`]}
                                        imageLoaded={() => {
                                            if (item.image) {
                                                showImages[`${index}`] = true;
                                                this.setState({ showImages });
                                            }
                                        }}
                                    />
                                )
                            }}
                            ListHeaderComponent={() => {
                                return (
                                    <View style={styles.listHeaderContainer}>
                                        <Text style={styles.listHeader}>
                                            {search !== '' ? `${strings.searchFor}\n${search}` : strings.searchFor}
                                        </Text>
                                    </View>
                                )
                            }}
                            keyExtractor={(item, index) => item + index}
                            onEndReached={() => this.props.handleLoadMore(category)}
                            onEndThreshold={50}
                        /> 
                        // :
                        // <ActivityIndicator
                        //     style={{ top: Dimensions.get('screen').height / 2 - 18 }}
                        //     size="large"
                        //     color={colors.black}
                        // />
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    flatListContainer: {
        backgroundColor: colors.lightGray,
        paddingTop: HEADER_HEIGHT,
    },
    listHeaderContainer: {
        backgroundColor: colors.white,
        padding: spacing.medium,
        paddingLeft: spacing.medium,
    },
    listHeader: {
        fontFamily: 'Roboto',
        fontSize: fontSize.extraHuge, 
        color: colors.darkGray,
        fontWeight: 'bold',
    },
    emptyListContainer: { 
        width: '100%', 
        minHeight: Dimensions.get('screen').height - HEADER_HEIGHT - 20, 
        backgroundColor: colors.white,
        alignItems: 'center',
    },
    horizontalList: {
        alignItems: 'flex-start', 
        paddingLeft: spacing.extraBig, 
        paddingRight: spacing.extraBig
    }
});

function mapStateToProps(state) {
    return {
        Blogs: state.Blogs
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getBlogs
    }, dispatch);
}

export default  connect(mapStateToProps, mapDispatchToProps)(BlogsList);
//export default BlogsList;