import Card from "./Card.js";
import { validationConfig } from "./config.js";
import FormValidator from "./FormValidator.js";

const popupEditPofile = document.querySelector('[name="popupEditProfile"]');

const formEditProfile = document.querySelector('[name="editProfile"]');
const nameInput = document.querySelector(".popup__input-name");
const jobInput = document.querySelector(".popup__input-description");

const buttonEditProfile = document.querySelector(".profile__edit-btn");
const closeButtons = document.querySelectorAll(".popup__close-btn");

const profileName = document.querySelector(".profile__heading");
const description = document.querySelector(".profile__description");

const buttonAddMestoButton = document.querySelector(".profile__add-btn");
const popupAddMesto = document.querySelector('[name="popupAddMesto"]');

const popupViewMestoImage = document.querySelector('[name="viewMestoImage"]');

const cardTemplate = document.querySelector("#card-template").content;
const mestoGrid = document.querySelector(".mesto__grid");

const mestoImageInput = document.querySelector("#link-input");
const mestoTitleInput = document.querySelector("#title-input");

const noMestoItem = document.querySelector(".mesto__no-items");
const formAddMesto = document.querySelector('[name="addMesto"]');

const mestoImage = document.querySelector(".popup__image");
const mestoTitle = document.querySelector(".popup__img-title");

// function createNewCardItem(data) {
//   const card = cardTemplate.querySelector(".card").cloneNode(true);
//   const cardImage = card.querySelector(".card__image");
//   const cardTitle = card.querySelector(".card__title");
//   cardImage.src = data.link;
//   cardImage.alt = data.name;
//   cardTitle.textContent = data.name;
//   addCardItemListeners(card);
//   return card;
// }

// function addCardItemListeners(card) {
//   card
//     .querySelector(".card__like-button")
//     .addEventListener("click", function (evt) {
//       evt.target.classList.toggle("card__like-button_active");
//     });
//   card
//     .querySelector(".card__delete-button")
//     .addEventListener("click", function (evt) {
//       evt.target.closest(".card").remove();
//       if (document.querySelectorAll(".card").length === 0) {
//         noMestoItem.classList.remove("hidden");
//       }
//     });
//   card.querySelector(".card__image").addEventListener("click", function (evt) {
//     openPopup(popupViewMestoImage);
//     document
//       .querySelector("[name=viewMestoImage]")
//       .classList.add("overlay__image");
//     mestoImage.src = evt.target.src;
//     mestoImage.alt = evt.target.alt;
//     mestoTitle.textContent = evt.target.alt;
//   });
// }

// function showMestoCards(cards) {
//   noMestoItem.classList.add("hidden");
//   cards.forEach((card) => {
//     const newCard = createNewCardItem(card);
//     mestoGrid.append(newCard);
//   });
// }

function editProfileInfo() {
  const form = new FormValidator(
    validationConfig,
    document.querySelector('[name="editProfile"]')
  );
  form.enableValidation();
  nameInput.value = profileName.textContent;
  jobInput.value = description.textContent;
  openPopup(popupEditPofile);
}

function addMesto() {
  const form = new FormValidator(
    validationConfig,
    document.querySelector('[name="addMesto"]')
  );
  form.enableValidation();
  openPopup(popupAddMesto);
}

function openPopup(element) {
  element.classList.add("popup_opened");
  const inputElement = element.querySelector("input");
  if (inputElement) inputElement.focus();
  element.addEventListener("click", handleOverlayClick);
  document.addEventListener("keydown", handleOverlayEscPress);
}

function closePopup() {
  const element = document.querySelector(".popup_opened");
  if (element) {
    const form = element.querySelector(".popup__form");
    if (form) {
      form.reset();
    }
    element.classList.remove("popup_opened");
    noMestoItem.classList.add("hidden");
    document.removeEventListener("keydown", handleOverlayEscPress);
    element.removeEventListener("click", handleOverlayClick);
  }
}

// function handleFormProfileSubmit(evt) {
//   evt.preventDefault(evt);
//   profileName.textContent = evt.target.elements.profileName.value;
//   description.textContent = evt.target.elements.description.value;
//   closePopup(evt);
//   formEditProfile.reset();
// }

// function handleFormMestoSubmit(evt) {
//   evt.preventDefault(evt);
//   const card = createNewCardItem({
//     name: evt.target.elements.mestoTitle.value,
//     link: evt.target.elements.mestoLink.value,
//   });
//   mestoGrid.prepend(card);
//   closePopup(evt);
//   formAddMesto.reset();
// }

function handleOverlayEscPress(event) {
  if (event.code == "Escape") {
    event.stopPropagation();
    closePopup(event);
  }
}

function handleOverlayClick(event) {
  if (event.target.classList.contains("overlay")) {
    closePopup(event);
  }
}

// initialCards.forEach((item) => {
//   const card = new Card(item);
//   const cardElement = card.generateCard();

//   mestoGrid.append(cardElement);
// });

buttonEditProfile.addEventListener("click", editProfileInfo);
buttonAddMestoButton.addEventListener("click", addMesto);
closeButtons.forEach((button) => button.addEventListener("click", closePopup));
//formEditProfile.addEventListener("submit", handleFormProfileSubmit);
//formAddMesto.addEventListener("submit", handleFormMestoSubmit);

//showMestoCards(initialCards);
