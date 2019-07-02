import React, { Component } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

import NewCategoriesHorizontalList from '../../../common/complex/Lists/NewCategoriesHorizontalList';
import BlogSectionList from './BlogSectionList';

// CategoriesTopTabs component showing categorized blogs

class CategoriesTopTabs extends Component {
    constructor(props) {
        super(props);

        let routes = [];
        props.categories.map((category, index) => {
            routes[index] = { key: category.toLowerCase(), title: category };
        });
        this.state = {
            index: 0,
            routes: routes,
        }
    }

    openWebView = (link) => {

    }

    getSceneMap = () => {
        let sceneMap = {};
    
        this.state.routes.map((item, index) => {
            sceneMap[item.key] = () => {
                return <BlogSectionList  data={item.title} enableScroll={this.props.enableScroll}/> // some component for tab scene
            }
        });
        return sceneMap;
    }

    renderTabBar = (props) => {
        return (
            <NewCategoriesHorizontalList 
                data={this.props.categories}
                position={props.position}
                selected={this.state.index}
                selectedChanged={(category, index) => this.setState({index: index})}
            />
        );
    };

    render() {
        return (
            <TabView
                navigationState={this.state}
                renderTabBar={this.renderTabBar}
                renderScene={SceneMap(this.getSceneMap())}
                onIndexChange={index => this.setState({ index })}
            />
        )
    }
}

export default CategoriesTopTabs;