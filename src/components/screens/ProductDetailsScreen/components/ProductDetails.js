import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import NameScore from '../../../common/simple/ProductComponents/NameScore';
import RankingMediaSentiment from '../../../common/simple/ProductComponents/RankingMediaSentiment';
import Description from '../../../common/simple/ProductComponents/Description';
import BoxText from '../../../common/simple/Texts/BoxText';
import IconButton from '../../../common/simple/Buttons/IconButton';
import { fontSize, spacing, colors } from '../../../../utils/constants';

// ProductDetals component
// pass product prop to define product details

class ProductDetails extends Component {
    state = {
        expanded: false
    }

    expandTags = () => {
        this.setState(prevState => ({
            expanded: !prevState.expanded
        }));
    }

    render() {
        const { categories, brand, name, score, ranking, media_score, 
            sentiment, body, tag } = this.props.product;
        const { onShare, liked, onProductLike } = this.props;
        let allTags = [];
        for (const category in tag) {
            allTags = [...allTags, ...tag[category]];
        }
        allTags.sort();
        return (
            <View style={styles.container}>
                <View style={styles.sectionShareLikeButtonsContainer}>
                    <Text style={styles.section}>
                        {(`Skin Care | ${categories.join(' | ')} | ${categories.length > 1 ? '\n' : ''}${brand}`).toUpperCase()}
                    </Text>
    
                    <View style={styles.shareLikeButtonsContainer}>
                        <IconButton 
                            iconName='share'
                            iconSize={20}
                            iconColor={colors.iconGray}
                            iconFont='Entypo'
                            onPress={onShare}
                        />
    
                        <IconButton 
                            iconName={liked ? 'heart' : 'heart-o'}
                            iconSize={20}
                            iconColor={liked ? colors.red : colors.iconGray}
                            iconFont='FontAwesome'
                            onPress={onProductLike}
                        />
                    </View>
                </View>
    
                <NameScore
                    style={{marginTop: spacing.small}}
                    name={name}
                    score={score}
                    nameStyle={styles.name}
                    scoreStyle={styles.score}
                    numberOfLines={3}
                    scoreRadius={23}
                />
    
                <View style={styles.rankingBlogSentimentContainer}>
                    <RankingMediaSentiment 
                        style={styles.rankingBlogSentiment}
                        textStyle={styles.rankingBlogSentimentText}
                        ranking={ranking}
                        media={media_score}
                        sentiment={sentiment}
                    />
                </View>
    
                <Description 
                    description={body}
                    numberOfLines={4}
                    style={{marginTop: spacing.small}}
                    textStyle={styles.description}
                />
            
                <TouchableOpacity
                    disabled={allTags.length <= 10}
                    onPress={this.expandTags}
                >
                    <View style={styles.tagsContainer}>
                        {
                            allTags.map((tag, i) => (
                                i < 10  || this.state.expanded ?
                                    <BoxText
                                        key={i}
                                        text={tag}
                                        style={styles.tag}
                                        textColor={colors.categoriesGray}
                                    /> : 
                                    null
                            ))
                        }
                        
                        {
                            !this.state.expanded && allTags.length > 10 ?
                                <BoxText
                                    text={'. . .'}
                                    style={[styles.tag, { minWidth: 40 }]}
                                    textColor={colors.categoriesGray}
                                /> :
                                null
                        }
                    </View>
                </TouchableOpacity>         
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: spacing.extraBig,
        paddingTop: spacing.small,
        paddingBottom: spacing.medium,
        backgroundColor: colors.white,
    },
    sectionShareLikeButtonsContainer: {
        flexDirection: 'row', 
        alignItems: 'center',//'flex-end',
        justifyContent: 'space-between'
    },
    shareLikeButtonsContainer: {
        flexDirection: 'row',
        marginRight: -spacing.small
    },
    section: {
        maxWidth: '80%',
        color: colors.red,
        fontFamily: 'Open Sans',
        fontSize: fontSize.small,
        fontWeight: 'bold'
    },
    name: {
        fontSize: fontSize.huge,
        fontWeight: 'bold',
    },
    score: {
        fontSize: fontSize.medium,
    },
    description: {
        fontSize: fontSize.semiMedium,
    },
    rankingBlogSentimentContainer: { 
        width: '100%',
        borderBottomWidth: 1,
        borderColor: colors.lighterGray,
        paddingBottom: spacing.small,
        marginBottom: spacing.medium
    },
    rankingBlogSentiment: {
        width: '40%', //70
        paddingTop: spacing.small,
        paddingBottom: spacing.small,
    },
    rankingBlogSentimentText: {
        fontSize: fontSize.small
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: spacing.medium,
    },
    tag: {
        marginBottom: spacing.small
    }
});

export default ProductDetails;