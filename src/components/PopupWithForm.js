import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(
    popupSelector,
    { formSelector, handleFormSubmit, closeCallback }
  ) {
    super(popupSelector, closeCallback);
    this._handleFormSubmit = handleFormSubmit;
    this._form = document.querySelector(formSelector);
    this._submitBtn = this._form.querySelector(".popup__button");
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll(".popup__input");
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  _handleSubmit = (evt) => {
    evt.preventDefault();
    this._submitBtn.value = "Сохранение...";
    this._handleFormSubmit(this._getInputValues())
      .then(() => {
        this.close();
      })
      .catch((err) => {
        console.log(err);
        this.close();
      });
  };

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._handleSubmit);
  }

  close() {
    this._form.reset();
    super.close();
    this._submitBtn.value = "Сохранить";
    this._form.removeEventListener("submit", this._handleSubmit);
  }
}
