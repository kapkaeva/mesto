import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._element.querySelector(".popup__image");
    this._popupImageTitle = this._element.querySelector(".popup__img-title");
  }

  open(link, name) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupImageTitle.textContent = name;
    super.open();
  }
}
