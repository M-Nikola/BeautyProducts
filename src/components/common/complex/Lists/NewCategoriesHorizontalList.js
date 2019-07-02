import React, { Component } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';

import TextButton from '../../simple/Buttons/TextButton';
import { fontSize , spacing, colors } from '../../../../utils/constants';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
// Categories Horizontal List component
// pass list of categories using data prop
// handle selected category using selectedChanged 

class NewCategoriesHorizontalList extends Component {
    itemClicked = (item, index) => {
        this.props.selectedChanged(item, index);
    }

    render() {
        const inputRange =  this.props.data.map((x, i) => i);
        return (
            <View style={[styles.container, this.props.style]}>
                <FlatList
                    ref={ref => this.flatList = ref}
                    contentContainerStyle={styles.listItemsContainer}
                    horizontal={true}
                    data={this.props.data}
                    extraData={this.props.selected}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item, index}) => {
                        const backgroundRgb = Animated.round(
                            Animated.interpolate(this.props.position, {
                                inputRange,
                                outputRange: inputRange.map(inputIndex =>
                                    inputIndex === index ? 242 : 256,
                                ),
                            }));
                        const backgroundColor = Animated.color(backgroundRgb, backgroundRgb, backgroundRgb);
                        return (
                            <AnimatedTouchableOpacity
                                onPress={() => this.itemClicked(item, index)}
                                style={[styles.unselectedItemStyle, { backgroundColor: backgroundColor }]}
                            >           
                                <Text style={styles.unselectedTextStyle}
                                >
                                    {item}
                                </Text>
                            </AnimatedTouchableOpacity>
                        )}
                    }
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
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 60,
        borderRadius: 20,
        paddingLeft: spacing.medium,
        paddingRight: spacing.medium,
        paddingTop: spacing.small,
        paddingBottom: spacing.small,
    },
    selectedItemStyle: {
        backgroundColor: colors.extraLightGray
    },
    unselectedTextStyle: {
        color: colors.categoriesGray,
        fontFamily: 'Open Sans',
        fontSize: fontSize.semiMedium,
        fontWeight: '500'
    },
    selectedTextStyle: {
        color: colors.categoriesGray,
        fontWeight: 'bold'
    }
});

export default NewCategoriesHorizontalList;