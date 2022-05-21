import Card from "./Card.js";
import { validationConfig } from "./config.js";
import FormValidator from "./FormValidator.js";
import Popup from "./Popup.js";

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

const popupAddMesto = new Popup(
  document.querySelector('[name="popupAddMesto"]')
);

const popupEditPofile = new Popup(
  document.querySelector('[name="popupEditProfile"]')
);

function editProfileInfo() {
  const form = new FormValidator(
    validationConfig,
    document.querySelector('[name="editProfile"]')
  );
  form.enableValidation();
  nameInput.value = profileName.textContent;
  jobInput.value = description.textContent;
  popupEditPofile.open();
}

function addMesto() {
  const form = new FormValidator(
    validationConfig,
    document.querySelector('[name="addMesto"]')
  );
  form.enableValidation();
  popupAddMesto.open();
}

function closePopup() {
  const element = document.querySelector(".popup_opened");
  new Popup(element).close();
}

function handleFormProfileSubmit(evt) {
  evt.preventDefault(evt);
  profileName.textContent = evt.target.elements.profileName.value;
  description.textContent = evt.target.elements.description.value;
  closePopup(evt);
  formEditProfile.reset();
}

function handleFormMestoSubmit(evt) {
  evt.preventDefault(evt);

  const card = new Card({
    name: evt.target.elements.mestoTitle.value,
    link: evt.target.elements.mestoLink.value,
  }).generateCard();
  mestoGrid.prepend(card);
  closePopup(evt);
  formAddMesto.reset();
}

buttonEditProfile.addEventListener("click", editProfileInfo);
buttonAddMestoButton.addEventListener("click", addMesto);
closeButtons.forEach((button) => button.addEventListener("click", closePopup));
formEditProfile.addEventListener("submit", handleFormProfileSubmit);
formAddMesto.addEventListener("submit", handleFormMestoSubmit);
