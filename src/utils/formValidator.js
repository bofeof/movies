import validationErrorMessages from './validationErrorMessages';

export default function formValidator(evt) {
  const currentInput = evt.target;

  const validationStatus = {
    isValid: false,
    errorText: currentInput.validationMessage,
  };

  const { name, value } = currentInput;

  if (name === 'name') {
    const testResultName = /^.[a-zа-я\s{0,1}-]{1,30}$/.test(value);
    validationStatus.isValid = testResultName;
    validationStatus.errorText = !testResultName && validationErrorMessages.nameErr;
    return validationStatus
  }

  if (currentInput.validity.valid) {
    validationStatus.isValid = true;
  }

  return validationStatus;
}
