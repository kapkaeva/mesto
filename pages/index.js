import "../pages/index.css";
import Section from "../src/components/Section.js";
import Card from "../src/components/Card.js";
import FormValidator from "../src/components/FormValidator.js";
import PopupWithForm from "../src/components/PopupWithForm.js";
import PopupWithImage from "../src/components/PopupWithImage.js";
import UserInfo from "../src/components/UserInfo.js";
import Api from "../src/components/Api.js";

import {
  validationConfig,
  userConfig,
  cardTemplate,
  buttonEditProfile,
  buttonAddMestoButton,
  formEditProfile,
  formAddMesto,
  baseUrl,
  cardsUrl,
  userUrl,
} from "../src/utils/constants.js";

const api = new Api({
  baseUrl: baseUrl + cardsUrl,
  headers: {
    authorization: "839c512c-48e5-48bb-9a2d-0949e88ca6dc",
    "Content-Type": "application/json",
  },
});

const nameInput = document.querySelector(".popup__input-name");
const jobInput = document.querySelector(".popup__input-description");
const mestoGrid = document.querySelector(".mesto__grid");

const apiUser = new Api({
  baseUrl: baseUrl + userUrl,
  headers: {
    authorization: "839c512c-48e5-48bb-9a2d-0949e88ca6dc",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  elementAboutInfo: userConfig.description,
  elementName: userConfig.profileName,
  elementImage: userConfig.profileImage,
});

apiUser.getUserInfo().then((info) => {
  userInfo.setUserInfo(info.name, info.about, info.avatar);
});

const editProfileValidator = new FormValidator(
  validationConfig,
  formEditProfile
);
editProfileValidator.enableValidation();

const addMestoValidator = new FormValidator(validationConfig, formAddMesto);
addMestoValidator.enableValidation();

const profilePopupForm = new PopupWithForm(`[name = "popupEditProfile"]`, {
  formSelector: '[name="editProfile"]',
  handleFormSubmit: (formData) => {
    const userData = new UserInfo({
      elementAboutInfo: userConfig.description,
      elementName: userConfig.profileName,
    });
    userData.setUserInfo(formData.profileName, formData.description);
    editProfileValidator.disableActionBtn();
  },
  closeCallback: () => {
    editProfileValidator.hideInputErrors();
  },
});

function editProfileInfo() {
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().description;
  profilePopupForm.open();
}

function generateCard(cardItem) {
  return new Card(
    {
      data: cardItem,
      handleCardClick: (link, name) => {
        new PopupWithImage(`[name="viewMestoImage"]`).open(link, name);
      },
    },
    cardTemplate
  ).generateCard();
}

const cardList = new Section(
  {
    renderer: (cardItem) => {
      const card = generateCard(cardItem);
      cardList.addItem(card);
    },
  },
  mestoGrid
);

api.getInitialCards().then((cards) => {
  cardList.renderItems(cards);
});

const addMestoPopupForm = new PopupWithForm(`[name = "popupAddMesto"]`, {
  formSelector: '[name="addMesto"]',
  handleFormSubmit: (formData) => {
    const card = generateCard({
      name: formData.mestoTitle,
      link: formData.mestoLink,
    });
    cardList.addItem(card);
    addMestoValidator.disableActionBtn();
  },
  closeCallback: () => {
    addMestoValidator.hideInputErrors();
  },
});

buttonEditProfile.addEventListener("click", editProfileInfo);
buttonAddMestoButton.addEventListener("click", () => {
  addMestoPopupForm.open();
});
