import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';

import IconTextInput from './IconTextInput';
import Icon from '../Icons/Icon';

// Password Input Component 
// pass IconTextInput props to define it
// pass logoStyle to style right logo

class PasswordInput extends Component {
    state = {
        showPassword: true
    }

    onShowHidePasswordPressed = () => {
        this.setState(prevState => ({
            showPassword: !prevState.showPassword
        }));
    }

    render() {
        return (
            <IconTextInput
                {...this.props}
                secureTextEntry={this.state.showPassword}
            >
                <TouchableOpacity onPress={this.onShowHidePasswordPressed}>
                    <Icon 
                        name={this.state.showPassword ? 'eye' : 'eye-off'}
                    />
                </TouchableOpacity>
            </IconTextInput>
        )
    }
}

export default PasswordInput;