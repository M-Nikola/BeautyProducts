import React, { Component } from 'react';
import { Image, View, StatusBar, StyleSheet } from 'react-native';

import Form from './components/Form';

class LoginRegisterScreen extends Component {
    componentWillMount() {
        StatusBar.setBackgroundColor('white');
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        resizeMode='contain'
                        source={require('../../../assets/logo.png')}
                    />
                </View>

                <Form
                    navigation={this.props.navigation}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    logoContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 148,
        height: 148,
    }
});

export default LoginRegisterScreen;