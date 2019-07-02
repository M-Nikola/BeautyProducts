import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Button from '../../../common/simple/Buttons/TextButton';
import ValidationRules from '../../../../utils/validationRules';
import { spacing, fontSize, colors, strings } from '../../../../utils/constants';

import { connect } from 'react-redux';
import { signIn, register } from '../../../../store/actions/user_actions';
import { bindActionCreators } from 'redux';

// Form component

class Form extends Component {
    state = {
        action: strings.signIn,
        error: null,
        formValid: false,
        form: {
            email: {
                value: '',
                valid: true,
                rules: {
                    isEmail: true
                }
            },
            password: {
                value: '',
                valid: true,
                rules: {
                    minLength: 6
                }
            },
            confirmPassword: {
                value: '',
                valid: true,
                rules: {
                    confirmPass: 'password'
                }
            }
        }
    }

    renderConfirmPassword = () => (
        this.state.action === strings.continue ?
            <TextInput
                style={this.state.form.confirmPassword.valid ? styles.input : [styles.input, styles.inputInvalid]}
                placeholder={strings.confirmPassword}
                secureTextEntry={true}
                value={this.state.form.confirmPassword.value}
                onChangeText={(value) => this.updateInput('confirmPassword', value)}
            /> :
            null
    )

    renderError = () => (
        this.state.error ?
            <Text style={styles.error}>
                {this.state.error}
            </Text> :
            null
    )

    updateInput = (name, value) => {
        this.setState({
            error: null
        });

        let formCopy = this.state.form;
        formCopy[name].value = value;
        
        let rules = formCopy[name].rules;
        const validation = ValidationRules(value, rules, formCopy);
        if (value === '') {
            validation.valid = true;
            validation.error = null;
        }

        formCopy[name].valid = validation.valid;
    
        let isFormValid = true;

        if (this.state.action === strings.signIn) {
            for (let key in formCopy) {
                if (key !== 'confirmPassword') {
                    isFormValid = isFormValid && formCopy[key].valid && formCopy[key].value !== '';
                }
            }
        } else {
            for (let key in formCopy) { 
                isFormValid = isFormValid && formCopy[key].valid && formCopy[key].value !== '';
            }
        }

        this.setState({
            formValid: isFormValid,
            form: formCopy,
            error: validation.error
        });
    }

    changeAction = () => {
        this.setState(prevState => ({
            action: prevState.action === strings.signIn ? strings.continue : strings.signIn
        }));
    }

    manageAccess = () => {
        if (this.props.User.userData.error) {
            this.setState({
                error: this.props.User.userData.error
            });
            return;
        }
        
        this.setUserDataToStorage();
        this.props.navigation.navigate('Tabs');
    }

    onActionButtonPressed = () => {
        if (!this.state.formValid) {
            return;
        }       
     
        let formToSubmit = {};

        formToSubmit = { 
            email: this.state.form.email.value, 
            password: this.state.form.password.value
        };

        if (this.state.action === strings.signIn) {
            this.props.signIn(formToSubmit).then(() => {
                this.manageAccess();
            });
        } else {
            this.props.register(formToSubmit).then(() => {
                this.manageAccess();
            });
        }
    }

    setUserDataToStorage = async () => {
        try {
            await AsyncStorage.setItem('userData', JSON.stringify(this.props.User.userData));
        } catch (e) {}
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    {`${strings.welcome}!${this.state.action === strings.signIn ? 
                        `\n${strings.logInToContinue}` : ''}`
                    }
                </Text>

                <View style={styles.signUpContainer}>
                    <Text style={styles.signUpTitle}>
                        {this.state.action === strings.signIn ?
                            `${strings.notYetRegistered}, ` :
                            `${strings.haveAnAccount}, `
                        }
                    </Text>

                    <TouchableOpacity
                        onPress={this.changeAction}
                    >
                        <Text style={styles.signUp}>
                            {this.state.action === strings.signIn ? 
                                strings.signUp : 
                                strings.signIn
                            }
                        </Text>
                    </TouchableOpacity>
                </View>

                <TextInput 
                    style={this.state.form.email.valid ? styles.input : [styles.input, styles.inputInvalid]}
                    placeholder={strings.eMail}
                    keyboardType='email-address'
                    value={this.state.form.email.value}
                    onChangeText={(value) => this.updateInput('email', value)}
                />

                <TextInput
                    style={this.state.form.password.valid ? styles.input : [styles.input, styles.inputInvalid]}
                    placeholder={strings.password}
                    secureTextEntry={true}
                    value={this.state.form.password.value}
                    onChangeText={(value) => this.updateInput('password', value)}
                />

                {this.renderConfirmPassword()}

                {this.renderError()}

                <View style={styles.buttonsContainer}>
                    <Button
                        text={this.state.action}
                        style={[styles.button, {marginTop: spacing.big}]}
                        textStyle={styles.buttonText}
                        onPress={this.onActionButtonPressed}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '60%',
        paddingLeft: spacing.extraBig,
        paddingRight: spacing.extraBig,
    },
    title: {
        fontSize: fontSize.extraHuge,
        fontFamily: 'Roboto',
        color: colors.darkGray,
        fontWeight: 'bold'
    },
    signUpContainer: {
        flexDirection: 'row',
        marginBottom: spacing.medium
    },
    signUpTitle: {
        fontFamily: 'Open Sans',
        fontSize: fontSize.big,
        color: colors.darkGray
    },
    signUp: {
        fontFamily: 'Open Sans',
        fontSize: fontSize.big,
        color: colors.red
    },
    input: {
        height: 50,
        borderRadius: spacing.medium,
        marginTop: spacing.medium,
        paddingLeft: spacing.extraBig,
        backgroundColor: colors.extraLightGray,
        color: colors.darkGray,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        fontSize: fontSize.medium
    },
    inputInvalid: {
        borderColor: colors.red,
        borderWidth: 1
    },
    button: {
        width: 100,
        height: 50,
        borderRadius: spacing.medium,
        backgroundColor: colors.gray
    },
    buttonText: {
        color: colors.white,
        fontWeight: 'bold'
    },
    error: {
        marginTop: spacing.small,
        color: colors.red,
        fontSize: fontSize.small,
        textAlign: 'center'
    },
    buttonsContainer: {
        flexDirection: 'row-reverse',
        marginTop: spacing.medium,
    }
});

function mapStateToProps(state) {
    return {
        User: state.User
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({register, signIn}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);