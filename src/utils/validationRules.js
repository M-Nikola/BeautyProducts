import { strings } from './constants';

const validation = (value, rules, form) => {
    let valid = true;
    let error = null;
    for (let rule in rules) {
        switch (rule) {
            case 'isEmail':
                valid = valid && validateEmail(value);
                if (!valid) {
                    error = strings.invalidEmailFormat;
                }
                break;
            case 'minLength':
                valid = valid && validateMinLength(value, rules[rule]);
                if (!valid) {
                    error = `${strings.passwordMinLength} ${rules[rule]}!`;
                }
                break;
            case 'maxLength':
                valid = valid && validateMaxLength(value, rules[rule]);
                if (!valid) {
                    error = `${strings.passwordMaxLength} ${rules[rule]}!`;
                }
                break;
            case 'confirmPass':
                valid = valid && validatePassword(value, form[rules[rule]].value);
                if (!valid) {
                    error = strings.invalidConfirmPassword;
                }
                break;
            default:
                valid = true;
        }
    }
    return { valid, error };
}

const validateEmail = email => {
    const exspression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return exspression.test(String(email).toLowerCase());
}

const validateMinLength = (value, ruleValue) => {
    return value.length >= ruleValue;
}

const validateMaxLength = (value, ruleValue) => {
    return value.length <= ruleValue;
}

const validatePassword = (value, firstValue) => {
    return value === firstValue;
}

export default validation;