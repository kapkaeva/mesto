//import { handleOpenPopup } from "./popupHandlers.js";

export default class Card {
  constructor({ data, handleCardClick }, cardElement) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._element = cardElement.cloneNode(true);
  }

  generateCard() {
    this._setEventListeners();
    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__image").alt = this._name;
    this._element.querySelector(".card__title").textContent = this._name;
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

    this._element
      .querySelector(".card__image")
      .addEventListener("click", (evt) => {
        this._handleCardClick(this._link, this._name);
        //handleOpenPopup(this._link, this._name);
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
