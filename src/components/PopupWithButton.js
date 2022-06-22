import Popup from "./Popup.js";

export default class PopupWithButton extends Popup {
  constructor(
    popupSelector,
    { buttonSelector, handleButtonClick, closeCallback }
  ) {
    super(popupSelector, closeCallback);
    this._buttonSelector = this._element.querySelector(buttonSelector);
    this._handleButtonClick = handleButtonClick;
  }

  _handleClick = (evt) => {
    evt.preventDefault();
    this._handleButtonClick();
    this.close();
  };

  setEventListeners() {
    super.setEventListeners();
    this._buttonSelector.addEventListener("click", this._handleClick);
  }

  close() {
    super.close();
    this._buttonSelector.removeEventListener("click", this._handleClick);
  }
}
