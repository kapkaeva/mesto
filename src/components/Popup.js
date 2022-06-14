export default class Popup {
  constructor(popupSelector, closeCallback) {
    this._element = document.querySelector(popupSelector);
    this._closeButton = this._element.querySelector(".popup__close-btn");
    this._closeCallback = closeCallback;
  }

  open() {
    this._element.classList.add("popup_opened");
    this.setEventListeners();
  }

  close() {
    this._element.classList.remove("popup_opened");
    this._closeButton.removeEventListener("click", this._handleCloseBtn);
    this._element.removeEventListener("click", this._handleOverlayClick);
    document.removeEventListener("keydown", this._handleEscClose);
    if (this._closeCallback) this._closeCallback();
  }

  _handleCloseBtn = () => {
    this.close();
  };

  _handleOverlayClick = (evt) => {
    if (evt.target.classList.contains("overlay")) {
      evt.stopPropagation();
      this.close();
    }
  };

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    this._closeButton.addEventListener("click", this._handleCloseBtn);
    this._element.addEventListener("click", this._handleOverlayClick);
    document.addEventListener("keydown", this._handleEscClose);
  }
}
