import validationErrorMessages from './validationErrorMessages';

let testResultName;

export default function formValidator(evt) {
  const currentInput = evt.target;
  const { name, value } = currentInput;

  const validationStatus = {
    isValid: false,
    errorText: currentInput.validationMessage,
  };

  if (name === 'name') {
    testResultName = /^.[a-zа-я\s{0,1}-]{1,30}$/gmi.test(value);
    validationStatus.isValid = testResultName;
    validationStatus.errorText = !testResultName && validationErrorMessages.nameErr;
    return validationStatus
  }

  if (currentInput.validity.valid) {
    validationStatus.isValid = true;
  }

  return validationStatus;
}
