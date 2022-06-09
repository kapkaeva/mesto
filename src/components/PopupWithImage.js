import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  //   наследуется от Popup, вызывает его конструктор,
  //   в который передает нужный параметр - смотреть в сторону super.
  // используя логику полиморфизма надо перезаписать метод open,
  // сначала сделать в нем то что описано в ТЗ,
  //  а потом вызвать метод родительского класса чтобы открыть попап
  constructor(popupSelector, link, name) {
    super(popupSelector);
    this._link = link;
    this._name = name;
    //??? this._closeButton = document.querySelector(".popup__close-btn");
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
