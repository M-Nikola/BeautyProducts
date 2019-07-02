import React, { Component } from 'react';
import { LayoutAnimation, StyleSheet, View, ScrollView, UIManager, Platform } from 'react-native';

import ExpandableList from '../../../common/complex/Lists/ExpandableList';
 
class ExpandableFilters extends Component {    
    constructor(props) {
        super(props);
    
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true)
        }

        let filters = [];
        if (props.previousFilters.length > 0) {
            filters = [...props.previousFilters];
        } else {
            for (item in props.filters) {
                filters.push({
                    expanded: false,
                    name: item,
                    subCategories: props.filters[item],
                    selectedSubCategories: []
                });
            }
        }

        this.state = { 
            filters: [...filters]
        }
    }

    reset = () => {
        const filters = this.state.filters;
        for (let i = 0; i < filters.length; i++) {
            filters[i].expanded = false;
            filters[i].selectedSubCategories = [];
        }
        this.setState({
            filters: filters
        });
    }

    updateLayout = (index) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        const filters = this.state.filters;
        filters[index].expanded = !filters[index].expanded;
        this.setState({
            filters: filters
        });
    }

    selectSubCategory = (selectSubCategory, index) => {
        const filters = this.state.filters;
        if (filters[index].selectedSubCategories.filter(subCategory => subCategory === selectSubCategory).length !== 0) {
            // deselect sub-category
            filters[index].selectedSubCategories = filters[index].selectedSubCategories.filter(subCategory => subCategory !== selectSubCategory);
        } else {
            // select sub-category
            filters[index].selectedSubCategories.push(selectSubCategory);
        }
        
        this.setState({
            filters: filters
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    {
                        this.state.filters.map((category, index) => (
                            <ExpandableList
                                key={index}
                                onCategoryClicked={this.updateLayout.bind(this, index)}
                                selectSubCategory={subCategory => this.selectSubCategory(subCategory, index)}
                                category={category} 
                            />
                        ))
                    }
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default ExpandableFilters;