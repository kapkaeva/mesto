import "../pages/index.css";
import Section from "../src/components/Section.js";
import Card from "../src/components/Card.js";
import FormValidator from "../src/components/FormValidator.js";
import PopupWithForm from "../src/components/PopupWithForm.js";
import PopupWithImage from "../src/components/PopupWithImage.js";
import PopupWithButton from "../src/components/PopupWithButton.js";
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
  formAvatar,
  buttonEditAvatar,
} from "../src/utils/constants.js";

const api = new Api({
  baseUrl: baseUrl,
  headers: {
    authorization: "839c512c-48e5-48bb-9a2d-0949e88ca6dc",
    "Content-Type": "application/json",
  },
});

const nameInput = document.querySelector(".popup__input-name");
const jobInput = document.querySelector(".popup__input-description");
const mestoGrid = document.querySelector(".mesto__grid");

const userInfo = new UserInfo({
  elementAboutInfo: userConfig.description,
  elementName: userConfig.profileName,
  elementImage: userConfig.profileImage,
});

const editProfileValidator = new FormValidator(
  validationConfig,
  formEditProfile
);
editProfileValidator.enableValidation();

const addMestoValidator = new FormValidator(validationConfig, formAddMesto);
addMestoValidator.enableValidation();

const avatarFormValidator = new FormValidator(validationConfig, formAvatar);
avatarFormValidator.enableValidation();

const popupWithButton = new PopupWithButton(`[name = "popupConfirm"]`, {
  buttonSelector: ".popup__button",
});

const popupWithImage = new PopupWithImage(`[name="viewMestoImage"]`);

const avatarPopupForm = new PopupWithForm(`[name = "popupUpdateAvatar"]`, {
  formSelector: '[name="updateAvatar"]',
  handleFormSubmit: (formData, popup) => {
    popup.renderLoading();
    return api
      .updateAvatar(formData.avatarLink)
      .then((data) => {
        userInfo.setAvatar(data.avatar);
        avatarFormValidator.disableActionBtn();
        popup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => popup.renderLoading());
  },
  closeCallback: () => {
    avatarFormValidator.hideInputErrors();
  },
});

const profilePopupForm = new PopupWithForm(`[name = "popupEditProfile"]`, {
  formSelector: '[name="editProfile"]',
  handleFormSubmit: (formData, popup) => {
    return api
      .updateUserInfo(formData.profileName, formData.description)
      .then((userData) => {
        userInfo.setUserInfo(userData);
        editProfileValidator.disableActionBtn();
        popup.close();
      })
      .catch((err) => console.log(err));
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

function generateCard(cardItem, viewerId) {
  return new Card(
    {
      data: cardItem,
      viewerId: viewerId,
      handleCardClick: (link, name) => {
        popupWithImage.open(link, name);
      },
      handleRemove: (card) => {
        popupWithButton.setHandleButtonClick((popup) => {
          api
            .deleteCard(card.id)
            .then(() => {
              card.remove();
              popup.close();
            })
            .catch((err) => console.log(err));
        });
        popupWithButton.open();
      },
      handleLikeClick: (cardId, isLikeActive) => {
        let likePromise;
        if (isLikeActive) {
          likePromise = api.removeLike(cardId);
        } else {
          likePromise = api.addLike(cardId);
        }
        return likePromise.catch((err) => console.log(err));
      },
    },
    cardTemplate
  ).generateCard();
}

const cardList = new Section(
  {
    renderer: (cardItem, viewverId) => {
      const card = generateCard(cardItem, viewverId);
      cardList.addItem(card);
    },
  },
  mestoGrid
);

const getUserInfoPromise = api
  .getUserInfo()
  .then((info) => userInfo.setUserInfo(info))
  .catch((err) => console.log(err));

const getInitialCardsPromise = api
  .getInitialCards()
  .catch((err) => console.log(err));

Promise.all([getUserInfoPromise, getInitialCardsPromise]).then((values) => {
  const cards = values[1];
  cardList.renderItems(cards.reverse(), userInfo.getUserId());
});

const addMestoPopupForm = new PopupWithForm(`[name = "popupAddMesto"]`, {
  formSelector: '[name="addMesto"]',
  handleFormSubmit: (formData, popup) => {
    return api
      .createCard({
        name: formData.mestoTitle,
        link: formData.mestoLink,
      })
      .then((data) => {
        cardList.addItem(generateCard(data, userInfo.getUserId()));
        addMestoValidator.disableActionBtn();
        popup.close();
      })
      .catch((err) => console.log(err));
  },
  closeCallback: () => {
    addMestoValidator.hideInputErrors();
  },
});

buttonEditProfile.addEventListener("click", editProfileInfo);
buttonAddMestoButton.addEventListener("click", () => {
  addMestoPopupForm.open();
});
buttonEditAvatar.addEventListener("click", () => {
  avatarPopupForm.open();
});
