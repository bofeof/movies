export default function formValidator(evt) {
  const currentInput = evt.target;
  const validationStatus = {
    isValid: false,
    errorText: currentInput.validationMessage,
  };

  if (currentInput.validity.valid && currentInput.value.trim().length) {
    validationStatus.isValid = true;
  }

  return validationStatus;
}
