import errorMessages from './errorMessages';

export default function searchValidator(inputValue) {

  const isInputValid = !!inputValue.toString().trim().length && !!inputValue;

  const validationStatus = {
    isValid: true,
    errorText: '',
  };

  validationStatus.isValid = isInputValid;
  validationStatus.errorText = !isInputValid ? errorMessages.searchError : '';

  return validationStatus;
}
