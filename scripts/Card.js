import { initialCards } from "./config.js";

const popupImage = document.querySelector(".popup__image");
const popupImageTitle = document.querySelector(".popup__img-title");
const popupContainer = document.querySelector('[name="viewMestoImage"]');
const content = document.querySelector(".mesto__grid");

export default class Card {
  constructor(data) {
    this._name = data.name;
    this._link = data.link;
  }

  _getTemplate() {
    document.querySelector("#card-template").content;
    const cardElement = document
      .querySelector("#card-template")
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__image").alt = this._name;
    this._element.querySelector(".card__title").textContent = this._name;

    return this._element;
  }

  _handleOpenPopup() {
    popupContainer.classList.add("popup_opened");

    popupContainer.addEventListener("click", (evt) => {
      this._handleOverlayClick(evt);
    });

    document.addEventListener("keydown", (evt) => {
      this._handleOverlayEscPress(evt);
    });

    popupImage.src = this._link;
    popupImage.alt = this._name;
    popupImageTitle.textContent = this._name;
  }

  _handleClosePopup() {
    popupContainer.classList.remove("popup_opened");
  }

  _handleOverlayEscPress(event) {
    if (event.code == "Escape") {
      event.stopPropagation();
      this._handleClosePopup();
    }
  }

  _handleOverlayClick(event) {
    if (event.target.classList.contains("overlay")) {
      this._handleClosePopup();
    }
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
        this._handleOpenPopup();
      });
  }

  _handleToggleLike() {
    this._element
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDelete() {
    this._element
      .querySelector(".card__delete-button")
      .closest(".card")
      .remove();
  }
}

initialCards.forEach((item) => {
  const card = new Card(item);
  const cardElement = card.generateCard();

  content.append(cardElement);
});
