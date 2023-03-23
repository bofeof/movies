import VALIDATION_ERROR_MESSAGES from './validationErrorMessages';

const emailValidator = require('email-validator');

export default function formValidator(evt, currentUser) {
  const currentInput = evt.target;
  const { name, value } = currentInput;

  const validationStatus = {
    isValid: false,
    errorText: currentInput.validationMessage,
  };

  if (value === '') {
    validationStatus.isValid = false;
    validationStatus.errorText = VALIDATION_ERROR_MESSAGES.requiredField;
    return validationStatus;
  }

  if (currentInput.validity.valid) {
    validationStatus.isValid = true;
  }

  if (name === 'name') {
    const testResultName = /^.[a-zа-я\s{0,1}-]{1,30}$/gim.test(value);
    const testNameContext = currentUser?.name !== value;
    validationStatus.isValid = testResultName && testNameContext;
    validationStatus.errorText =
      !validationStatus.isValid &&
      (!testResultName ? VALIDATION_ERROR_MESSAGES.nameErr : VALIDATION_ERROR_MESSAGES.oldDataError);
    return validationStatus;
  }

  if (name === 'email') {
    const testResultEmail = emailValidator.validate(value);
    const testEmailContext = currentUser?.email !== value;
    validationStatus.isValid = testResultEmail && testEmailContext;
    validationStatus.errorText =
      !validationStatus.isValid &&
      (!testResultEmail ? VALIDATION_ERROR_MESSAGES.emailErr : VALIDATION_ERROR_MESSAGES.oldDataError);
  }

  return validationStatus;
}
