import React, { Component } from 'react';
import { View, FlatList, TouchableWithoutFeedback, Animated, StyleSheet } from 'react-native';

import TextButton from '../../simple/Buttons/TextButton';
import { fontSize, spacing, colors } from '../../../../utils/constants';

// Menu Option popup component
// pass data prop to set options, data =  key-value object
// handle resuilt using onItemPressed

class MenuOption extends Component {
    state = {
        show: false
    }

    toggle = () => {
        this.setState((prevState) => ({
            show: !prevState.show
        }));
    }
    
    itemPressed = (item) => {
        this.props.onItemPressed(item);
        this.toggle();
    }
    
    render() {
        if (!this.state.show) {
            return null;
        }
        return (
            <TouchableWithoutFeedback 
                onPress={this.toggle}
            >
                <Animated.View style={[styles.container, 
                    { transform: [{ translateY: this.props.headerTranslate}]}]}
                >
                    <View style={styles.menuOptionsContainer}>
                        <View style={styles.menuOptions}>
                            {
                                this.props.data.map((item, index) => (
                                    <TextButton
                                        key={index}
                                        style={styles.optionContainer}
                                        textStyle={{ color: colors.gray }}
                                        text={item.value}
                                        onPress={() => this.itemPressed(item)}
                                    />
                                ))
                            }
                        </View>
                    </View>
                </Animated.View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%', 
        height: '100%', 
        position: 'absolute', 
        alignItems: 'flex-end', 
        padding: spacing.medium,
        paddingTop: spacing.extraHuge * 2.6,
    },
    menuOptionsContainer: {
        shadowColor: colors.black,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        
        elevation: 5,
        borderWidth: 1,
        borderColor: colors.lighterGray
    },
    menuOptions: {
        backgroundColor: colors.white,
        padding: spacing.small,
        paddingTop: 0,
        paddingBottom: 0,
    },
    optionContainer: {
        width: 120,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.medium,
        marginTop: spacing.small,
        borderBottomWidth: 1,
        borderColor: colors.lighterGray
    },
    optionText: {
        fontSize: fontSize.medium,
    },
    optionSeparator: {
        width: '90%',
        height: 1,
        alignSelf: 'center',
        backgroundColor: colors.gray
    }
})

export default MenuOption;