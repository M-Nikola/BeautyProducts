import React from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';

import Image from '../../../common/simple/ProductComponents/Image';
import IconButton from '../../../common/simple/Buttons/IconButton';
import RankingMediaSentiment from '../../../common/simple/ProductComponents/RankingMediaSentiment';
import NameScore from '../../../common/simple/ProductComponents/NameScore';
import Description from '../../../common/simple/ProductComponents/Description';
import { spacing, colors, fontSize } from '../../../../utils/constants';

// ProductCard component
// pass product prop to populate it
// handle onProductClick, onProductLike

const ProductCard = (props) => {
    if (!props.product) {
        return null;
    }
    const { img, name, body, ranking, score, media_score, sentiment } = props.product;

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback
                style={styles.productContentContainer}
                onPress={() => props.onProductClicked(props.product)}
            >
                <View style={styles.itemsContainer}>
                    <Image
                        img={img}
                    />

                    <View style={styles.productContentContainer}>
                        <NameScore
                            name={name} 
                            score={score}
                            numberOfLines={2}
                        />

                        <Description
                            description={body}
                            numberOfLines={2}
                        />

                        <View style={styles.rankingMediaSentiment}>
                            <RankingMediaSentiment 
                                ranking={ranking}
                                media={media_score}
                                sentiment={sentiment}
                            />
                            
                            <IconButton 
                                iconName={props.liked ? 'heart' : 'heart-o'}
                                iconColor={props.liked ? colors.red : colors.default}
                                iconSize={fontSize.small}
                                iconFont='FontAwesome'
                                containerStyle={styles.heartContainerStyle}
                                onPress={props.onProductLike}
                            />
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 140,
        width: '100%',
        backgroundColor: colors.white,
        padding: spacing.big
    },
    itemsContainer: {
        flex: 1, 
        flexDirection: 'row'
    },
    productDataContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    heartContainerStyle: {
        padding: spacing.small,
        marginRight: spacing.extraSmall,
        marginBottom: -spacing.small
    },
    productContentContainer: {
        flex: 1, 
        flexDirection: 'column',
        marginLeft: spacing.medium,
    },
    rankingMediaSentiment: {
        paddingTop: spacing.small,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderColor: colors.lighterGray
    }
});

export default ProductCard;