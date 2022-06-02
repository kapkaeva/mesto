import Card from "./Card.js";
import { initialCards, validationConfig } from "./config.js";
import FormValidator from "./FormValidator.js";
import {
  closePopup,
  openPopup,
  initOverlayClickEventListeners,
} from "./popupHandlers.js";

const formEditProfile = document.querySelector('[name="editProfile"]');
const nameInput = document.querySelector(".popup__input-name");
const jobInput = document.querySelector(".popup__input-description");

const buttonEditProfile = document.querySelector(".profile__edit-btn");
const closeButtons = document.querySelectorAll(".popup__close-btn");

const profileName = document.querySelector(".profile__heading");
const description = document.querySelector(".profile__description");

const buttonAddMestoButton = document.querySelector(".profile__add-btn");

const mestoGrid = document.querySelector(".mesto__grid");

const formAddMesto = document.querySelector('[name="addMesto"]');

const addMestoForm = document.querySelector('[name="popupAddMesto"]');

const editPofileForm = document.querySelector('[name="popupEditProfile"]');

const viewMestoImage = document.querySelector('[name="viewMestoImage"]');

const content = document.querySelector(".mesto__grid");

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

function editProfileInfo() {
  nameInput.value = profileName.textContent;
  jobInput.value = description.textContent;
  openPopup(editPofileForm);
}

function addMesto() {
  openPopup(addMestoForm);
}

function formStateReset(form) {
  form.reset();
  const submitBtn = form.querySelector(validationConfig.submitButtonSelector);
  submitBtn.setAttribute("disabled", true);
  submitBtn.classList.add(validationConfig.inactiveButtonClass);
}

function handleFormProfileSubmit(evt) {
  evt.preventDefault(evt);
  profileName.textContent = evt.target.elements.profileName.value;
  description.textContent = evt.target.elements.description.value;
  closePopup();
  formStateReset(formEditProfile);
}

function handleFormMestoSubmit(evt) {
  evt.preventDefault(evt);
  const cardData = {
    name: evt.target.elements.mestoTitle.value,
    link: evt.target.elements.mestoLink.value,
  };
  const card = generateCard(cardData, cardTemplate);
  mestoGrid.prepend(card);
  closePopup();
  formStateReset(formAddMesto);
}

function generateCard(cardData, cardTemplate) {
  const card = new Card(cardData, cardTemplate);
  return card.generateCard();
}

initialCards.forEach((item) => {
  const card = generateCard(item, cardTemplate);
  content.append(card);
});

[formEditProfile, formAddMesto].forEach((formSelector) => {
  const validator = new FormValidator(validationConfig, formSelector);
  validator.enableValidation();
});

initOverlayClickEventListeners([addMestoForm, editPofileForm, viewMestoImage]);

buttonEditProfile.addEventListener("click", editProfileInfo);
buttonAddMestoButton.addEventListener("click", addMesto);
closeButtons.forEach((button) => button.addEventListener("click", closePopup));
formEditProfile.addEventListener("submit", handleFormProfileSubmit);
formAddMesto.addEventListener("submit", handleFormMestoSubmit);
