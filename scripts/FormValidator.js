export default class FormValidator {
  constructor(data, formSelector) {
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._formSelector = formSelector;
  }

  _setButtonState() {
    console.log("_setButtonState");
    const buttonElement = this._formSelector.querySelector(
      this._submitButtonSelector
    );
    console.log("buttonElement", buttonElement);
    if (buttonElement.disabled) {
      buttonElement.setAttribute("disabled", true);
      buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      buttonElement.removeAttribute("disabled");
      buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }

  _setEventListeners() {
    console.log("formElement, validationConfig");
    const inputList = Array.from(
      this._formSelector.querySelectorAll(this._inputSelector)
    );
    const buttonElement = this._formSelector.querySelector(
      this._submitButtonSelector
    );
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._setButtonState(buttonElement, this._hasInvalidInput(inputList));
      });
    });
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formSelector.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formSelector.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _handleButton(evt) {
    evt.preventDefault();
  }

  enableValidation() {
    this._setButtonState();
    this._formSelector.addEventListener("submit", (evt) => {
      this._handleButton(evt);
    });

    this._setEventListeners(this._formSelector, this._inactiveButtonClass);
  }
}



