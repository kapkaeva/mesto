//import { handleOpenPopup } from "./popupHandlers.js";

export default class Card {
  constructor({ data, handleCardClick }, cardElement) {
    this._name = data.name;
    this._link = data.link;
    this._likeCounter = data.likes.length;
    this._handleCardClick = handleCardClick;
    this._element = cardElement.cloneNode(true);
    this._image = this._element.querySelector(".card__image");
    this._title = this._element.querySelector(".card__title");
    this._likes = this._element.querySelector(".card__like-counter");
  }

  generateCard() {
    this._setEventListeners();
    this._image.src = this._link;
    this._image.alt = this._name;
    this._title.textContent = this._name;
    this._likes.textContent = this._likeCounter;
    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleToggleLike();
      });

    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDelete();
      });

    this._image.addEventListener("click", (evt) => {
      this._handleCardClick(this._link, this._name);
    });
  }

  _handleToggleLike() {
    this._element
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDelete() {
    this._element.remove();
    this._element = null;
  }
}
