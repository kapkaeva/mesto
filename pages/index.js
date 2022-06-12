import Section from "../src/components/Section.js";
import Card from "../src/components/Card.js";
import FormValidator from "../src/components/FormValidator.js";
import PopupWithForm from "../src/components/PopupWithForm.js";
import PopupWithImage from "../src/components/PopupWithImage.js";
import UserInfo from "../src/components/UserInfo.js";

import {
  initialCards,
  validationConfig,
  userConfig,
  cardTemplate,
  buttonEditProfile,
  buttonAddMestoButton,
  formEditProfile,
  formAddMesto,
} from "../src/utils/constants.js";

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
        new PopupWithImage(`[name="viewMestoImage"]`, link, name).open();
      },
    },
    cardTemplate
  ).generateCard();
}

const cardList = new Section(
  {
    items: initialCards,
    renderer: (cardItem) => {
      const card = generateCard(cardItem);
      cardList.addItem(card);
    },
  },
  mestoGrid
);
cardList.renderItems();

const addMestoPopupForm = new PopupWithForm(`[name = "popupAddMesto"]`, {
  formSelector: '[name="addMesto"]',
  handleFormSubmit: (formData) => {
    const card = generateCard({
      name: formData.mestoTitle,
      link: formData.mestoLink,
    });
    cardList.addItem(card);
  },
});

buttonEditProfile.addEventListener("click", editProfileInfo);
buttonAddMestoButton.addEventListener("click", () => {
  addMestoPopupForm.open();
});
