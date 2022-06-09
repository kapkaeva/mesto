import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, link, name) {
    super(popupSelector);
    this._link = link;
    this._name = name;
    this._closeButton = document.querySelector(".popup__close-btn");
    this._popupImage = document.querySelector(".popup__image");
    this._popupImageTitle = document.querySelector(".popup__img-title");
  }

  open() {
    this._popupImage.src = this._link;
    this._popupImage.alt = this._name;
    this._popupImageTitle.textContent = this._name;
    super.open();
  }
}
