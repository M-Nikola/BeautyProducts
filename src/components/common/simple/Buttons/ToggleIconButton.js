import React, { Component } from 'react';
import IconButton from './IconButton';

// Toggle Icon Button component
// pass toggleIconName, toggleIconSize, toggleIconColor to style when toggled
// pass onToggle func to handle togg

class ToggleIconButton extends Component {
    state = {
        toggle: false
    }

    onToggle = () => {
        this.setState((prevState) => ({
            toggle: !prevState.toggle
        }), () => this.props.onToggle(this.state.toggle));  
    }

    render() {
        const toggle = this.state.toggle;
        const { toggleIconName, toggleIconSize, toggleIconColor,
                iconName, iconSize = 20, iconColor, iconFont, containerStyle } = this.props;

        return (
            <IconButton 
                iconName={toggleIconName ? toggle ? toggleIconName : iconName : iconName}
                iconSize={toggleIconSize ? toggle ? toggleIconSize: iconSize : iconSize}
                iconColor={toggleIconColor ? toggle ? toggleIconColor : iconColor : iconColor}
                iconFont={iconFont}
                containerStyle={containerStyle}
                onPress={this.onToggle}
            />
        )
    }
}

export default ToggleIconButton;