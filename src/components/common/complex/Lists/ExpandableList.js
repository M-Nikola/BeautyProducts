import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import TextButton from '../../simple/Buttons/TextButton';
import Icon from '../../../common/simple/Icons/Icon';
import { colors, fontSize, spacing } from '../../../../utils/constants'; 

const ExpandableList = (props) => {
    const { expanded, name, subCategories, selectedSubCategories } = props.category;
    
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={props.onCategoryClicked}>
                <View style={styles.categoryContainer}>
                    <Text style={styles.categoryName}>
                        {name} 
                    </Text>

                    <View style={styles.categoryRightContainer}>
                        <Text 
                            style={[styles.subCategory, {textAlign: 'right', maxWidth: '95%'}]}
                            numberOfLines={2}
                        >
                            {selectedSubCategories.join(', ')}
                        </Text>

                        <View style={styles.arrow}>
                            <Icon
                                name={expanded ? 'md-arrow-dropup' : 'md-arrow-dropdown'}
                                size={fontSize.medium}
                                font='Ionicons'
                            />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>

            <View 
                style={{ 
                    height: expanded ? null : 0, 
                    flexDirection: name !== 'Brands' ? 'row' : 'column', 
                    flexWrap: 'wrap', 
                    overflow: 'hidden',
                    paddingLeft: spacing.medium,
                    paddingRight: spacing.medium
                }}
            >    
                {
                    subCategories.map((subCategory, index) => {
                        if (name !== 'Brands') {
                            return (
                                <TextButton
                                    key={index}
                                    style={[styles.tags, 
                                        { backgroundColor: selectedSubCategories.filter((item)=> item === subCategory).length !== 0 ? 
                                            colors.lightGray : 
                                            colors.extraLightGray 
                                        }
                                    ]}
                                    textStyle={{color: colors.gray}}
                                    text={subCategory}
                                    onPress={() => props.selectSubCategory(subCategory)}
                                />
                            )
                        } else {
                            return (
                                <TouchableOpacity 
                                    key={index}
                                    onPress={() => props.selectSubCategory(subCategory)}
                                >
                                    <View style={styles.subCategoryContainer}>
                                        <Text style={styles.subCategory}> 
                                            {subCategory} 
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }
                    })
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {},
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: spacing.medium,
        borderBottomWidth: 1,
        borderColor: colors.lightGray
    },
    categoryName: {
        color: colors.darkGray,
        fontSize: fontSize.big,
        fontFamily: 'Roboto',
        textAlignVertical: 'bottom',
    },
    categoryRightContainer: {
        flexDirection: 'row',  
        maxWidth: '70%'
    },
    arrow: {
        marginTop: spacing.medium
    },
    subCategoryContainer: {
        borderBottomWidth: 1,
        borderColor: colors.lightGray
    },
    subCategory: {
        fontFamily: 'Open Sans',
        fontSize: fontSize.medium,
        fontWeight: '600',
        color: colors.gray,
        padding: spacing.small
    },
    tags: { 
        height: 25,
        padding: spacing.medium,
        marginTop: spacing.medium,
        marginRight: spacing.medium,
        backgroundColor: colors.extraLightGray, 
        borderRadius: spacing.small,
    },
});

export default ExpandableList;