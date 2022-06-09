export default class Popup {
  constructor(popupSelector) {
    this._element = document.querySelector(popupSelector);
    this._closeButton = document.querySelector(".popup__close-btn");
    //this._closeButtons = document.querySelectorAll(".popup__close-btn");
  }

  open() {
    this.setEventListeners();
    this._element.classList.add("popup_opened");
  }

  close() {
    const element = this._findActive();
    if (element) {
      element.classList.remove("popup_opened");
      element.removeEventListener("click", () => {
        this._handleOverlayClick;
      });
    }
  }
  
  setEventListeners() {
    this._closeButton.addEventListener("click", (evt) => {
      this.close();
    });

    this._element.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("overlay")) {
        evt.stopPropagation();
        this.close();
      }
    });

    document.addEventListener("keydown", () => {
      this.close();
    });
  }

  _handleOverlayClick(event) {
    debugger;
    if (event.target.classList.contains("overlay")) {
      const element = this._findActive();
      if (element) {
        document.removeEventListener("keydown", handleOverlayEscPress);
        element.classList.remove("popup_opened");
      }
    }
  }

  _findActive() {
    return document.querySelector(".popup_opened");
  }
}
