export default class Popup {
  constructor(popupSelector) {
    this._element = document.querySelector(popupSelector);
    this._closeButton = this._element.querySelector(".popup__close-btn");
  }

  open() {
    this._element.classList.add("popup_opened");
    this.setEventListeners();
  }

  close() {
    this._element.classList.remove("popup_opened");
    this._closeButton.removeEventListener("click", this._handleCloseBtn);
    this._element.removeEventListener("click", this._handleOverlayClick);
    document.removeEventListener("keydown", this._handleKeydown);
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

  _handleKeydown = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    this._closeButton.addEventListener("click", this._handleCloseBtn);
    this._element.addEventListener("click", this._handleOverlayClick);
    document.addEventListener("keydown", this._handleKeydown);
  }

  _handleOverlayClick(event) {
    if (event.target.classList.contains("overlay")) {
      const element = this._findActive();
      document.removeEventListener("keydown", handleOverlayEscPress);
      this._element.classList.remove("popup_opened");
    }
  }

  _findActive() {
    return document.querySelector(".popup_opened");
  }
}
