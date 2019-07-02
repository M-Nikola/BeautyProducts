import React from 'react';
import { View, StyleSheet } from 'react-native';

import IconText from '../Texts/IconText';
import { fontSize, colors, strings } from '../../../../utils/constants';
import { capitalize } from '../../../../utils/functions';

// RankingMediaSentiment component showing data as 3 IconText components
// pass style prop to change it's default styling
// sentiment must be one of these 'Loved','Neutral','Sad'

const RankingMediaSentiment = (props) => {
    const { ranking, media, sentiment } = props;
    return (
        <View style={[styles.container, props.style]}>
            {
                media ? 
                    <IconText
                        iconName='message-square'
                        iconSize={props.iconSize}
                        text={`+${media} ${strings.media}`}
                        textStyle={[styles.text, props.textStyle]}
                    /> :
                    null
            }
            
            {/* {
                sentiment ? 
                    <IconText
                        text={capitalize(sentiment)}
                        iconName={`emoji-${sentiment === 'loved' ? 'happy' : sentiment.toLowerCase()}`}
                        iconFont='Entypo'
                        iconSize={props.iconSize}
                        textStyle={[styles.text, props.textStyle]}
                    /> :
                    null
            } */}
            
            {
                ranking ?
                    <IconText
                        iconName='bar-chart-2'
                        iconSize={props.iconSize}
                        text={`${strings.rank} #${ranking}`}
                        textStyle={[styles.text, props.textStyle]}
                    /> :
                    null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    text: {
        fontSize: fontSize.extraSmall,
        fontFamily: 'Open Sans',
        fontWeight: '300',
        color: colors.default
    }
});

export default RankingMediaSentiment;