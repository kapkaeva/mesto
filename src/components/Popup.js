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

  setEventListeners() {
    // Содержит публичный метод setEventListeners, 
    // который добавляет слушатель клика иконке закрытия попапа.
    // Модальное окно также закрывается при клике на затемнённую область вокруг формы.
    this._closeButton.addEventListener("click", (evt) => {
      this.close();
    });

    this._element.addEventListener("click", () => {
      this._handleEscClose;
    });

    document.addEventListener("keydown", () => {
      this._handleEscClose;
    });
    // this._closeButtons.forEach((button) =>
    //   button.addEventListener("click", (evt) => {
    //     this.close();
    //   })
    // );
  }

  _handleOverlayClick(event) {
    if (event.target.classList.contains("overlay")) {
      closePopup(event);
    }
  }

  _findActive() {
    return document.querySelector(".popup_opened");
  }
}
