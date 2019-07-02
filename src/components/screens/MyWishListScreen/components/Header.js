import React, { Component } from 'react';
import { StyleSheet, Image, View } from 'react-native';

import CategoriesHorizontalList from '../../../common/complex/Lists/CategoriesHorizontalList';
import { spacing, colors } from '../../../../utils/constants';

class Header extends Component {
    selectNextCategory = (index) => {
        this.categoriesListRef.selectNextCategory(index);
    }

    render() {
        const { categories, selectedCategoryChanged } = this.props;
        return (
            <View style={[styles.container]}>
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

                <CategoriesHorizontalList
                    ref={ref => this.categoriesListRef = ref}
                    style={styles.categoriesList}
                    selectedChanged={selectedCategoryChanged}
                    data={categories}
                /> 
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white'
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
    categoriesList: {
        marginTop: spacing.medium,
        paddingLeft: spacing.medium, 
        paddingRight: spacing.medium,
        borderBottomWidth: 1,
        borderColor: colors.lightGray
    },
});

export default Header;