import React, { Component } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';

import TextButton from '../../simple/Buttons/TextButton';
import { fontSize , spacing, colors } from '../../../../utils/constants';

// Categories Horizontal List component
// pass list of categories using data prop
// handle selected category using selectedChanged 

class CategoriesHorizontalList extends Component {
    constructor(props) {
        super(props);

        this.state = { selected: props.data[0], index: 0 };
    }

    itemClicked = (item, index) => {
        this.setState({
            selected: item,
            index: index
        });
        this.flatList.scrollToIndex({animated: true, index: index, viewPosition: 0.5});
        this.props.selectedChanged(item);
    }

    selectNextCategory = (index) => {
        if (this.state.index + index >= 0 && this.state.index + index < this.props.data.length) {
            this.setState((prevState) => ({
                selected: this.props.data[prevState.index + index],
                index: prevState.index + index
            }), () => this.props.selectedChanged(this.state.selected));
            this.flatList.scrollToIndex({animated: true, index: this.state.index + index, viewPosition: 0.5});
        }
    }

    selectCategory = (index) => {
        if (index >= 0 && index < this.props.data.length) {
            this.setState((prevState) => ({
                selected: this.props.data[index],
                index: index
            }), () => this.props.selectedChanged(this.state.selected));
            this.flatList.scrollToIndex({animated: true, index: index, viewPosition: 0.5});
        }
    }

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <FlatList
                    ref={ref => this.flatList = ref}
                    contentContainerStyle={styles.listItemsContainer}
                    horizontal={true}
                    data={this.props.data}
                    extraData={this.state.selected}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item, index}) => (
                        <TextButton  
                            style={this.state.selected === item.toString() ?
                                [styles.unselectedItemStyle, styles.selectedItemStyle] :
                                styles.unselectedItemStyle
                            }
                            onPress={() => this.itemClicked(item, index)}
                            text={item}
                            textStyle={this.state.selected === item.toString() ?
                                [styles.unselectedTextStyle, styles.selectedTextStyle] :
                                styles.unselectedTextStyle
                            }
                        />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View> 
        )
    }
}
    
const styles = StyleSheet.create({
    container: {     
        backgroundColor: colors.white,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    listItemsContainer: {
        alignItems: 'center',
    },
    unselectedItemStyle: {
        minWidth: 60,
        borderRadius: 20,
        paddingLeft: spacing.medium,
        paddingRight: spacing.medium,
        paddingTop: spacing.small,
        paddingBottom: spacing.small
    },
    selectedItemStyle: {
        backgroundColor: colors.extraLightGray
    },
    unselectedTextStyle: {
        color: colors.categoriesLightGray,
        fontFamily: 'Open Sans',
        fontSize: fontSize.semiMedium,
        fontWeight: '500'
    },
    selectedTextStyle: {
        color: colors.categoriesGray,
        fontWeight: 'bold'
    }
});

export default CategoriesHorizontalList;