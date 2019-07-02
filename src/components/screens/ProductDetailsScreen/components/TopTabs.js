import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Animated from 'react-native-reanimated';

import CategoriesHorizontalList from '../../../common/complex/Lists/CategoriesHorizontalList';
import Blogs from './Blogs';
import Comments from './Comments';
import Influencers from './Influencers';
import Videos from './Videos';
import { spacing, fontSize, colors, strings } from '../../../../utils/constants';

// TopTabs component

class TopTabs extends Component {
    constructor(props) {
        super(props);
        
        const allRoutes = [
            { key: 'blogs', title: strings.blogs },
            { key: 'influencers', title: strings.influencers },
            { key: 'videos', title: strings.videos },
            { key: 'comments', title: strings.comments}
        ];
        let routes = [];
        this.titlesWidth = [];
        this.tabItemsX = [];
        allRoutes.forEach(route => {
            if (props.product[route.key] && props.product[route.key].length > 0) {
                routes.push(route);
                this.titlesWidth.push(0);
                this.tabItemsX.push(0);
            }
        });

        this.state = {
            index: 0,
            routes: routes
        }
    }

    openWebView = (link) => {

    }

    // renderTabBar = props => {
    //     const inputRange =  props.navigationState.routes.map((x, i) => i);
    //     let indicatorWidth, indicatorX = 0;
    //     if (inputRange.length > 1) {
    //         indicatorWidth = Animated.interpolate(props.position, {
    //             inputRange,
    //             outputRange: this.titlesWidth
    //         });

    //         indicatorX = Animated.interpolate(props.position, {
    //             inputRange,
    //             outputRange: this.tabItemsX
    //         });
    //     }

    //     return (
    //         <View style={styles.container}>
    //             <View style={styles.tabBar}>
    //                 {
    //                     props.navigationState.routes.length > 1 ?
    //                         props.navigationState.routes.map((route, i) => {  
    //                             const rgb = Animated.round(
    //                                 Animated.interpolate(props.position, {
    //                                     inputRange,
    //                                     outputRange: inputRange.map(inputIndex =>
    //                                         inputIndex === i ? 0 : 60
    //                                     ),
    //                                 }));

    //                             const color = Animated.color(rgb, rgb, rgb);

    //                             return (
    //                                 <TouchableOpacity
    //                                     key={i}
    //                                     style={styles.tabItem}
    //                                     onPress={() => this.setState({ index: i })}
    //                                     onLayout={({nativeEvent: {layout}}) => {
    //                                         this.tabItemsX[i] = layout.x;
    //                                     }}
    //                                 >
    //                                     <Animated.Text 
    //                                         style={[styles.title, { color }]}
    //                                         onLayout={({nativeEvent: {layout}}) => {
    //                                             this.titlesWidth[i] = layout.width;
    //                                         }}
    //                                     >
    //                                         {route.title}
    //                                     </Animated.Text>
    //                                 </TouchableOpacity>
    //                             )} 
    //                         )
    //                     :   <TouchableOpacity
    //                             style={styles.tabItem}
    //                             onPress={() => {}}
    //                             onLayout={({nativeEvent: {layout}}) => {
    //                                 indicatorX = layout.x;
    //                             }}
    //                         >
    //                             <Text 
    //                                 style={[styles.title, { color: colors.black }]}
    //                                 onLayout={({nativeEvent: {layout}}) => {
    //                                     indicatorWidth = layout.width;
    //                                 }}
    //                             >
    //                                 {props.navigationState.routes[0].title}
    //                             </Text>
    //                         </TouchableOpacity>
    //                 }
    //             </View>

    //             <Animated.View 
    //                 style={[styles.indicator, { width: indicatorWidth, left: indicatorX }]}
    //             />
    //         </View>
    //     );
    // };

    renderTabBar = props => {
        return (
            <CategoriesHorizontalList
                ref={ref => this.tabBar = ref}
                style={styles.horizontalList}
                data={this.state.routes.map(item => item.title)}
                selectedChanged={(selected) => {
                    const selectedIndex = this.state.routes.findIndex(route => route.title === selected);
                    this.setState({
                        index: selectedIndex
                    });
                }}
            />
        )
    }

    renderScene = () => {
        const { blogs, influencers, videos, comments } = this.props.product;

        const sceneMap = {};
        this.state.routes.forEach(route => {
            switch (route.key) {
                case 'blogs': 
                    sceneMap[route.key] = () => <Blogs 
                        blogs={blogs} 
                        openWebView={this.openWebView}
                        enableScroll={this.props.enableScroll}
                    />;
                    break;
                case 'influencers':
                    sceneMap[route.key] = () => <Influencers 
                        influencers={influencers} 
                        openWebView={this.openWebView}
                        enableScroll={this.props.enableScroll}
                    />;
                    break;
                case 'videos':
                    sceneMap[route.key] = () => <Videos 
                        videos={videos}  
                        openWebView={this.openWebView}
                        enableScroll={this.props.enableScroll}
                    />;
                    break;
                case 'comments': 
                    sceneMap[route.key] = () => <Comments 
                        comments={comments}  
                        openWebView={this.openWebView}
                        enableScroll={this.props.enableScroll}
                    />;
                    break;
                default: 
                    break;
            }
        });
        return SceneMap(sceneMap);
    }

    render() {
        return (
            <TabView
                navigationState={this.state}
                renderTabBar={this.renderTabBar}
                renderScene={this.renderScene()}
                onIndexChange={index => {
                    this.setState({ index });
                    this.tabBar.selectCategory(index);
                }}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
    },
    tabBar: {
        backgroundColor: colors.white,
        flexDirection: 'row',
        marginTop: spacing.small,
        paddingLeft: spacing.medium,
        paddingRight: spacing.medium,
    },
    tabItem: {
        alignItems: 'center',
        backgroundColor: colors.white,
        padding: spacing.medium,
        paddingLeft: 0,
        marginLeft: spacing.medium,
    }, 
    title: {
        color: colors.categoriesLightGray,
        fontFamily: 'Open Sans',
        fontSize: fontSize.semiMedium,
        fontWeight: '500'
    },
    indicator: {
        position: 'absolute',
        bottom: -2,
        height: 3, 
        borderRadius: 1.5,
        backgroundColor: colors.black,
        zIndex: 1
    },
    horizontalList: {
        alignItems: 'flex-start', 
        paddingLeft: spacing.extraBig, 
        paddingRight: spacing.extraBig
    }
});

export default TopTabs;