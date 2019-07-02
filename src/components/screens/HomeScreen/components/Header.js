import React, { Component } from 'react';
import { StyleSheet, Image, View, Animated } from 'react-native';

import CategoriesHorizontalList from '../../../common/complex/Lists/CategoriesHorizontalList';
import IconTextLogoInput from '../../../common/simple/Inputs/IconTextLogoInput';
import { fontSize, spacing, colors, strings } from '../../../../utils/constants';

class Header extends Component {
    selectNextCategory = (index) => {
        this.categoriesListRef.selectNextCategory(index);
    }

    render() {
        const { headerTranslate, search, searchTextChanged, categories, selectedCategoryChanged } = this.props;
        return (
            <Animated.View style={[styles.container,
                { transform: [{ translateY: headerTranslate}]}]}
            >
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        source={require('../../../../assets/logo-icon.png')}
                    />
                    <Image
                        style={styles.logoTitle}
                        resizeMode='center'
                        source={require('../../../../assets/logo-text.png')}
                    />
                </View>
        
                <IconTextLogoInput
                    value={search}
                    onChangeText={(text) => searchTextChanged(text)}
                    placeholder={strings.searchByNameBrandConcern}
                    iconName='search'
                    iconSize={fontSize.big}
                    iconColor={colors.darkGray}
                />

                <CategoriesHorizontalList
                    ref={ref => this.categoriesListRef = ref}
                    data={categories}
                    selectedChanged={selectedCategoryChanged}
                /> 
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        alignItems: 'center',
        padding: spacing.medium,
        paddingBottom: 0,
        paddingTop: 0,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor: colors.lightGray,
    },
    logoContainer: {
        height: 70,
        width: '50%',
        alignItems: 'center'
    },
    logo: {
        marginTop: spacing.medium,
        width: 35,
        height: 35
    },
    logoTitle: {
        width: 163, 
        height: 15, 
        marginTop: 9
    },
    title: {
        flex: 1,
        marginTop: spacing.small,
        fontSize: fontSize.medium,
        fontWeight: 'bold',
        color: 'black',
        letterSpacing: spacing.small
    }
});

export default Header;