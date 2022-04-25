const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  validationSelector
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationSelector.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationSelector.errorClass);
};

const hideInputError = (formElement, inputElement, validationSelector) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationSelector.inputErrorClass);
  errorElement.classList.remove(validationSelector.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, validationSelector) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationSelector
    );
  } else {
    hideInputError(formElement, inputElement, validationSelector);
  }
};

const setEventListeners = (formElement, validationSelector) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationSelector.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationSelector.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement, validationSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, validationSelector);
      toggleButtonState(inputList, buttonElement, validationSelector);
    });
  });
};

const hasInvalidInput = (inputList) => {
  console.log("hasInvalidInput--- ", inputList);
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, validationSelector) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationSelector.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(validationSelector.inactiveButtonClass);
  }
};

function enableValidation(validationSelector) {
  (
    document.querySelectorAll(validationSelector.formSelector)
  );
  const formList = Array.from(
    document.querySelectorAll(validationSelector.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, validationSelector);
  });
}

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
