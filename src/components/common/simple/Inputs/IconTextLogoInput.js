import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

import IconTextInput from './IconTextInput';
import Logo from '../Images/Logo';


// Icon Text Logo Component with logo image as right icon
// pass IconTextInput props to define it
// pass logoStyle to style right logo

class IconTextLogoInput extends Component {
    render() {
        return (
            <IconTextInput
                {...this.props}
            >
                <Logo
                    style={this.props.logoStyle} 
                />
            </IconTextInput>
        )
    }
}

export default IconTextLogoInput;