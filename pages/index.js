import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

import {
  initialCards,
  validationConfig,
  userConfig,
  cardTemplate,
  buttonEditProfile,
  buttonAddMestoButton,
  closeButtons,
  formEditProfile,
  formAddMesto,
  addMestoForm,
  editPofileForm,
  viewMestoImage,
} from "../utils/constants.js";
import {
  closePopup,
  openPopup,
  initOverlayClickEventListeners,
} from "../components/popupHandlers.js";

const nameInput = document.querySelector(".popup__input-name");
const jobInput = document.querySelector(".popup__input-description");

const mestoGrid = document.querySelector(".mesto__grid");

const userInfo = new UserInfo({
  elementAboutInfo: userConfig.description,
  elementName: userConfig.profileName,
});

const editProfileValidator = new FormValidator(
  validationConfig,
  formEditProfile
);
editProfileValidator.enableValidation();

const addMestoValidator = new FormValidator(validationConfig, formAddMesto);
addMestoValidator.enableValidation();

function editProfileInfo() {
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().description;
  openPopup(editPofileForm);
}

function addMesto() {
  openPopup(addMestoForm);
}

function handleFormProfileSubmit(evt) {
  evt.preventDefault(evt);
  userInfo.setUserInfo({
    name: evt.target.elements.profileName.value,
    description: evt.target.elements.description.value,
  });
  closePopup();
  formEditProfile.reset();
  editProfileValidator.disableActionBtn();
}

function handleFormMestoSubmit(evt) {
  evt.preventDefault(evt);
  const cardData = {
    name: evt.target.elements.mestoTitle.value,
    link: evt.target.elements.mestoLink.value,
  };
  const card = new Card(cardData, cardTemplate);
  mestoGrid.prepend(card.generateCard());
  closePopup();
  formAddMesto.reset();
  addMestoValidator.disableActionBtn();
}

const cardList = new Section(
  {
    items: initialCards,
    renderer: (cardItem) => {
      const card = new Card(cardItem, cardTemplate);
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    },
  },
  mestoGrid
);

cardList.renderItems();

initOverlayClickEventListeners([addMestoForm, editPofileForm, viewMestoImage]);

buttonEditProfile.addEventListener("click", editProfileInfo);
buttonAddMestoButton.addEventListener("click", addMesto);
closeButtons.forEach((button) => button.addEventListener("click", closePopup));
formEditProfile.addEventListener("submit", handleFormProfileSubmit);
formAddMesto.addEventListener("submit", handleFormMestoSubmit);
