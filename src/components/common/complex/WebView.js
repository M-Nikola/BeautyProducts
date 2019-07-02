import React, { Component } from 'react';
import { Modal, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

import TextButton from '../simple/Buttons/TextButton';
import { fontSize, colors, strings } from '../../../utils/constants';

class WebViewModal extends Component {
    state = {
        visible: false,
        loading: true,
        uri: 'http://www.ezenciel.com/'
    } 
    
    showWebView(uri) {
        this.setState({
            visible: true,
            loading: true,
            uri
        });
    }

    render() {
        return (
            <Modal 
                animationType='slide'
                transparent={false}
                visible={this.state.visible}
                onRequestClose={() => this.setState({ visible: false, loading: false })}
            >
                <WebView
                    source={{ uri: this.state.uri }}
                    onLoadStart={() => this.setState({ loading: false })}
                />

                {
                    this.state.loading && (
                        <ActivityIndicator
                            style={styles.activity}
                            size="large"
                            color={colors.black}
                        />
                    )
                }

                <TextButton 
                    style={styles.backButton}
                    textStyle={styles.backButtonText}
                    text={strings.goBack}
                    onPress={() => this.setState({ visible: false, loading: false })}
                />
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    backButton: {
        width: '100%',
        height: 50,
        backgroundColor: colors.darkGray,
        zIndex: 10
    },
    backButtonText: {
        color: colors.extraLightGray,
        fontSize: fontSize.big
    },
    activity: {
        position: "absolute", 
        top: Dimensions.get('screen').height / 2 - 18, 
        left: Dimensions.get('screen').width / 2 - 18
    }
});

export default WebViewModal;