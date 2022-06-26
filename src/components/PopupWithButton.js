import Popup from "./Popup.js";

export default class PopupWithButton extends Popup {
  constructor(popupSelector, { buttonSelector }) {
    super(popupSelector);
    this._buttonSelector = this._element.querySelector(buttonSelector);
  }

  _handleClick = (evt) => {
    evt.preventDefault();
    this._handleButtonClick(this);
  };

  setHandleButtonClick(handleButtonClick) {
    this._handleButtonClick = handleButtonClick;
  }

  setEventListeners() {
    super.setEventListeners();
    this._buttonSelector.addEventListener("click", this._handleClick);
  }

  close() {
    super.close();
    this._buttonSelector.removeEventListener("click", this._handleClick);
  }
}
