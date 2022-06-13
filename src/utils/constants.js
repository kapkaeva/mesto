const unionCreek = new URL(
  "../../images/mesto/f732c0-92fc-4869-9e52-ccfc855e2041.jpg",
  import.meta.url
);
const loversLane = new URL(
  "../../images//mesto/4a7f23ee-f45f-44bc-92a6-4a88040712544.jpg",
  import.meta.url
);
const mountShasta = new URL(
  "../../images/mesto/4a7f23ee-f45f-44bc-92a6-4a88040712541.jpg",
  import.meta.url
);
const stowLake = new URL(
  "../../images/mesto/f5547fd2-d3be-49db-874e-32d793eda6722.jpg",
  import.meta.url
);
const capitolBuilding = new URL(
  "../../images/mesto/4a7f23ee-f45f-44bc-92a6-4a88040712542.jpg",
  import.meta.url
);
const tvRadioAntenna = new URL(
  "../../images/mesto/f161a9ea-d670-42ee-a77e-7b81d0a03372.jpg",
  import.meta.url
);

export const initialCards = [
  {
    name: "Юнион Крик",
    link: unionCreek,
  },
  {
    name: "Ловерс Лейн Треил",
    link: loversLane,
  },
  {
    name: "Маунт Шаста",
    link: mountShasta,
  },
  {
    name: "Стоу Лейк",
    link: stowLake,
  },
  {
    name: "Здание Капитолий",
    link: capitolBuilding,
  },
  {
    name: "ТВ и радио антенна тауэр",
    link: tvRadioAntenna,
  },
];

export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export const userConfig = {
  profileName: ".profile__heading",
  description: ".profile__description",
};

export const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

export const buttonEditProfile = document.querySelector(".profile__edit-btn");
export const buttonAddMestoButton = document.querySelector(".profile__add-btn");
export const closeButtons = document.querySelectorAll(".popup__close-btn");
export const formEditProfile = document.querySelector('[name="editProfile"]');
export const formAddMesto = document.querySelector('[name="addMesto"]');
