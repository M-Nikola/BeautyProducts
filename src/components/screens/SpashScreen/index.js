import React, { Component } from 'react';
import { View, Text, Animated, Easing, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { connect } from 'react-redux';
import { signIn } from '../../../store/actions/user_actions';
import { bindActionCreators } from 'redux';

import { getInitalDataFromApi, setInitialData, spacing, colors, fontSize, strings } from '../../../utils/constants';

class SplashScreen extends Component {
    constructor(props) {
        super(props);

        this.rotateValueHolder = new Animated.Value(0);
        
        this.state = {
            loading: true,
            error: null,
        }
    }
    
    componentWillMount() {
        this.getInitialDataFromStorage();
    }

    componentDidMount() {
        this.startImageRotateFunction();
    }
    
    getInitialDataFromStorage = async () => {
        try {
            const initialData = await AsyncStorage.getItem('initialData');   
            const userData = await AsyncStorage.getItem('userData');
            if (initialData) {
                setInitialData(JSON.parse(initialData));
                this.autoLogIn(userData);
            } else {
                getInitalDataFromApi().then(result => {
                    if (!result.error) {
                        this.setInitialDataToStorage(result);
                        this.autoLogIn(userData);
                    } else {
                        this.failedToLoadApplication();
                    }
                }).catch(error => {
                    this.failedToLoadApplication();
                });
            }
        } catch(e) {
            getInitalDataFromApi().then(result => {
            if (!result.error) {
                this.setInitialDataToStorage(result);
                this.autoLogIn(userData);
            } else {
                this.failedToLoadApplication();
            }
            }).catch(error => {
                this.failedToLoadApplication();
            });
        }
    }

    autoLogIn = (userData) => {
        if (userData) {
            this.props.signIn(JSON.parse(userData)).then(() => {  
                if (!this.props.User.userData.error) {
                    this.setState({ loading: false }, () => this.props.onLoadFinished(true));
                } else {
                    // TODO maybe handle differently when there is inital data but there is error signin user in
                    this.setState({ loading: false }, () => this.props.onLoadFinished(false));
                }
            });
        } else {
            this.setState({ loading: false }, () => this.props.onLoadFinished(false));
        }
    }
    
    setInitialDataToStorage = async (data) => {
        try {
            await AsyncStorage.setItem('initialData', JSON.stringify(data));
        } catch (e) {      
            this.failedToLoadApplication();
        }
    }
    
    startImageRotateFunction = () => {
        this.rotateValueHolder.setValue(0);
        Animated.timing(this.rotateValueHolder, {
            toValue: 1,
            duration: 3000,
            easing: Easing.linear,
            useNativeDriver: true
        }).start(() => {
            if (!this.state.error && this.state.loading) {
                this.startImageRotateFunction()
            }
        });
    }

    failedToLoadApplication = () => {
        this.setState({ error: strings.errorLoadingApplication, loading: false});
    }

    render() {
        const rotateData = this.rotateValueHolder.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg'],
        });

        return (
            <View style={styles.container}>
                <Animated.Image
                    style={[ styles.logo , {transform: [{ rotate: rotateData }]}]}
                    source={require('../../../assets/logo-icon.png')}
                />

                {
                    this.state.error ? 
                        <Text style={styles.error}>
                            {this.state.error}
                        </Text> :
                        null
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: 'white', 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    logo: {
        height: 35,
        width: 35,
    },
    error: {
        marginTop: spacing.big, 
        color: colors.red, 
        textAlign: 'center', 
        fontWeight: 'bold', 
        fontSize: fontSize.semiMedium
    }
});

function mapStateToProps(state) {
    return {
        User: state.User
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({signIn}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
