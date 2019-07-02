import React, { Component } from 'react';
import { View, Text, StatusBar, StyleSheet } from 'react-native';

import Button from '../../common/simple/Buttons/TextButton';
import { spacing, strings, colors } from '../../../utils/constants';

import { connect } from 'react-redux';
import { logOut } from '../../../store/actions/user_actions';
import { bindActionCreators } from 'redux';

class ProfileScreen extends Component {

    componentDidMount() {
        this.navListener = this.props.navigation.addListener('willFocus', () => {
            StatusBar.setBackgroundColor('white');
        });
    }

    componentWillUnmount() {
        this.navListener.remove();
    }
    
    onLogOutPress = () => {
        this.props.logOut().then(() => {
            this.props.navigation.navigate('LoginRegister');
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    {this.props.User.userData && this.props.User.userData.email}
                </Text>

                <Button
                    text={strings.logOut}
                    style={styles.button}
                    onPress={this.onLogOutPress}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        width: '50%',
        height: 40,
        marginTop: spacing.small,
        borderWidth: 2,
        borderRadius: 20,
        borderColor: colors.black
    },
});

function mapStateToProps(state) {
    return {
        User: state.User
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({logOut}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);