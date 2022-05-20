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

  }

  _setEventListeners(){
    console.log("_setEventListeners");

  }

  enableValidation() {
    console.log("validate");
    this._formSelector.addEventListener("submit", function (evt) {
      evt.preventDefault();
      const buttonElement = this._formSelector.querySelector(
        this._submitButtonSelector
      );
      this._setButtonState(buttonElement, this._inactiveButtonClass, true);
    });
    this._setEventListeners(this._formSelector, this._inactiveButtonClass);
  }
}



