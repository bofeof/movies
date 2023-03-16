import VALIDATION_ERROR_MESSAGES from './validationErrorMessages';

const emailValidator = require('email-validator');

export default function formValidator(evt) {
  const currentInput = evt.target;
  const { name, value } = currentInput;

  const validationStatus = {
    isValid: false,
    errorText: currentInput.validationMessage,
  };

  if (value === ''){
    validationStatus.isValid = false;
    validationStatus.errorText = VALIDATION_ERROR_MESSAGES.requiredField;
    return validationStatus
  }

  if (name === 'name') {
    const testResultName = /^.[a-zа-я\s{0,1}-]{1,30}$/gmi.test(value);
    validationStatus.isValid = testResultName;
    validationStatus.errorText = !testResultName && VALIDATION_ERROR_MESSAGES.nameErr;
    return validationStatus
  }

  if (name === 'email') {
    const testResultEmail = emailValidator.validate(value);
    validationStatus.isValid = testResultEmail;
    validationStatus.errorText = !testResultEmail && VALIDATION_ERROR_MESSAGES.emailErr;
  }

  if (currentInput.validity.valid) {
    validationStatus.isValid = true;
  }

  return validationStatus;
}
