export default class Popup {
  constructor(element) {
    this._element = element;
  }

  open() {
    this._element.classList.add("popup_opened");
    const inputElement = this._element.querySelector("input");
    if (inputElement) inputElement.focus();
    this._element.addEventListener("click", () => {
      this._handleEscClose;
    });
    document.addEventListener("keydown", () => {
      this._handleEscClose;
    });
  }

  close() {
    const element = this._findActive();
    if (element) {
      element.classList.remove("popup_opened");
      document.removeEventListener("keydown", () => {
        this._handleEscClose;
      });
      element.removeEventListener("click", () => {
        this._handleOverlayClick;
      });
    }
  }

  _handleEscClose(event) {
    if (event.code == "Escape") {
      event.stopPropagation();
      closePopup(event);
    }
  }

  setEventListeners() {}

  _handleOverlayClick(event) {
    if (event.target.classList.contains("overlay")) {
      closePopup(event);
    }
  }

  _findActive() {
    return document.querySelector(".popup_opened");
  }
}
