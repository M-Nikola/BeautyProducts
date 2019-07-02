import React, { Component } from 'react';
import { StyleSheet, ScrollView, Image, View, Animated } from 'react-native';

import CategoriesHorizontalList from '../../../common/complex/Lists/CategoriesHorizontalList';
import IconTextButton from '../../../common/simple/Buttons/IconTextButton';
import IconTextLogoInput from '../../../common/simple/Inputs/IconTextLogoInput';
import { fontSize, spacing, colors, strings } from '../../../../utils/constants';

class Header extends Component {
    selectNextCategory = (index) => {
        this.categoriesListRef.selectNextCategory(index);
    }

    render() {
        const { headerTranslate, openFiltersModal, filters, removeFilter, sortBy, 
            menuOption,  search, searchTextChanged, searchCategoriesTranslate,
            selectedCategoryChanged, categories } = this.props;
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
        
                <View style={styles.filterSortButtonsStyle}>
                    <IconTextButton 
                        text={strings.filters}
                        iconName='sliders'
                        iconFont='FontAwesome'
                        iconColor={colors.categoriesGray}
                        onPress={openFiltersModal}
                    />
        
                    <ScrollView
                        style={{flex: 1}}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                    >   
                        {
                            filters.map((category, i) => {
                                return category.selectedSubCategories.map(subCategory => {
                                    return (            
                                        <IconTextButton
                                            key={subCategory} 
                                            text={subCategory}
                                            iconName='close'
                                            iconFont='AntDesign'
                                            iconSize={fontSize.semiMedium}
                                            iconColor={colors.categoriesGray}
                                            containerStyle={{marginRight: spacing.small}}
                                            onPress={() => removeFilter(subCategory, i)}
                                        />
                                    )
                                })
                            })
                        }
                    </ScrollView>
        
                    <IconTextButton 
                        text={`${strings.sortBy}:`}
                        iconName='sort-amount-asc'
                        iconFont='FontAwesome'
                        iconSize={fontSize.small}
                        iconColor={colors.categoriesGray}
                        extraText={sortBy.value}
                        textStyle={{marginLeft: 0}}
                        containerStyle={{flexDirection: 'row-reverse'}}
                        onPress={menuOption}
                    />
                </View>
        
                <Animated.View style={[styles.searchCategoriesCointainer,
                    { transform: [{ translateY: searchCategoriesTranslate}]}]}
                >     
                    <IconTextLogoInput
                        style={styles.search}
                        value={search}
                        onChangeText={(text) => searchTextChanged(text)}
                        placeholder={strings.searchByNameBrandConcern}
                        iconName='search'
                        iconSize={fontSize.big}
                        iconColor={colors.default}
                    />
        
                    <CategoriesHorizontalList
                        ref={ref => this.categoriesListRef = ref}
                        style={styles.categoriesList}
                        selectedChanged={selectedCategoryChanged}
                        data={categories}
                    /> 
                </Animated.View>
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
        height: 194,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: colors.white,
    },
    logoContainer: {
        height: 70,
        width: '50%',
        alignItems: 'center',
        //marginBottom: spacing.big,
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
    search: {
        //marginBottom: spacing.small,
        marginLeft: spacing.medium,
        marginRight: spacing.medium,
    },
    categoriesList: {
        paddingLeft: spacing.medium, 
        paddingRight: spacing.medium,
    },
    filterSortButtonsStyle: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        //justifyContent: 'space-between',
        backgroundColor: colors.lightGray,
        padding: spacing.small,
        paddingLeft: spacing.big,
        paddingRight: spacing.big,
    },
    searchCategoriesCointainer: {
        position: 'absolute',
        bottom: 36,
        left: 0,
        right: 0,
    }
});

export default Header;