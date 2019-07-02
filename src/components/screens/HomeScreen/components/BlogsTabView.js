import React, { Component } from 'react';
import { Animated } from 'react-native';
import { TabView } from 'react-native-tab-view'; 

import BlogsList from './BlogsList';
import CustomHeader from './Header';
import { categories } from '../../../../utils/constants';

const HEADER_HEIGHT = 159;

class BlogsTabView extends Component {

    constructor(props) {
        super(props);

        const scrollAnim = new Animated.Value(0);
        const offsetAnim = new Animated.Value(0);
        //this.blogsList = [];
        this.state = {
            index: 0,
            routes: categories.map(category => ({ key: category.toLowerCase(), title: category })),
            previousContentOffsetY: 0,
            offsetAnim,
            scrollAnim,  
            headerScroll: Animated.diffClamp(
                Animated.add(
                    scrollAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                        extrapolateLeft: 'clamp',
                    }),
                    offsetAnim,
                ),
                0,
                HEADER_HEIGHT,
            ),
        };
    }

    // alignScrollViews = y => {
    //     if (y > 0) {
    //         console.log('alignScrollViews', y)
    //         this.state.routes.map((route, index) => {
    //             console.log(index, this.blogsList)
    //             if (this.state.index !== index) {
    //                 console.log('scrollToOffset, ', HEADER_HEIGHT)
    //                 this.blogsList[index].getNode().scrollToOffset({ offset: HEADER_HEIGHT, animated: false });
    //             }
    //         });
    //     }
    // }

    renderScene = ({ route }) => {
        const selectedIndex = this.state.routes.findIndex(tab => tab.title === route.title);
        let contentOffsetY;
        return (
            <BlogsList
                shouldUpdate={this.state.index === selectedIndex}
                category={route.title}
                setFlatListRef={ref => {
                    //console.log('setFlatListRef', selectedIndex)
                    //this.blogsList[selectedIndex] = ref
                }}
                search={this.props.search}
                previousContentOffsetY={this.state.previousContentOffsetY}
                handleLoadMore={this.props.handleLoadMore}
                openWebView={this.props.openWebView}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: this.state.scrollAnim }}}],
                    { useNativeDriver: true }
                )}
                onScrollBeginDrag={({ nativeEvent }) => {
                    contentOffsetY = nativeEvent.contentOffset.y;
                }} 
                onScrollEndDrag={({ nativeEvent }) => {
                    this.props.navigation.setParams({ visible: contentOffsetY >= nativeEvent.contentOffset.y });
                }}
                onMomentumScrollEnd={({ nativeEvent }) => {
                    // this.setState({
                    //     previousContentOffsetY: nativeEvent.contentOffset.y
                    // });
                    console.log('onMomentumScrollEnd')
                    //this.alignScrollViews(nativeEvent.contentOffset.y);
                }}
            />
        )
    }

    renderTabBar = props => {
        const { headerScroll } = this.state;
        const headerTranslate = headerScroll.interpolate({
            inputRange: [0, HEADER_HEIGHT],
            outputRange: [0, -HEADER_HEIGHT],
            extrapolate: 'clamp',
        });

        return (
            <CustomHeader
                ref={ref => this.tabBar = ref}
                headerTranslate={headerTranslate}
                search={this.props.search}
                searchTextChanged={this.props.searchTextChanged}
                categories={this.state.routes.map(item => item.title)}
                selectedCategoryChanged={(selected) => {
                    const selectedIndex = this.state.routes.findIndex(route => route.title === selected);
                    this.setState({ index: selectedIndex });
                    this.props.selectedCategoryChanged(selected);
                }}
            />
        )
    }

    render() {
        return (
            <TabView
                navigationState={this.state}
                renderTabBar={this.renderTabBar}
                renderScene={this.renderScene}
                onIndexChange={index => {
                    this.setState({ index });
                    this.tabBar.categoriesListRef.selectCategory(index);
                    this.props.navigation.setParams({ visible: true });
                }}
                onSwipeStart={() => {
                    this.state.scrollAnim.setValue(0);
                }}
                //lazy={true}
            />
        )
    }
}

export default BlogsTabView;
