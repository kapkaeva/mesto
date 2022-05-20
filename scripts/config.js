const initialCards = [
  {
    name: "Юнион Крик",
    link: "./images/mesto/f732c0-92fc-4869-9e52-ccfc855e2041.jpg",
  },
  {
    name: "Ловерс Лейн Треил",
    link: "./images/mesto/4a7f23ee-f45f-44bc-92a6-4a88040712544.jpg",
  },
  {
    name: "Маунт Шаста",
    link: "./images/mesto/4a7f23ee-f45f-44bc-92a6-4a88040712541.jpg",
  },
  {
    name: "Стоу Лейк",
    link: "./images/mesto/f5547fd2-d3be-49db-874e-32d793eda6722.jpg",
  },
  {
    name: "Здание Капитолий",
    link: "./images/mesto/4a7f23ee-f45f-44bc-92a6-4a88040712542.jpg",
  },
  {
    name: "ТВ и радио антенна тауэр",
    link: "./images/mesto/f161a9ea-d670-42ee-a77e-7b81d0a03372.jpg",
  },
];

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export { initialCards, validationConfig}; 
