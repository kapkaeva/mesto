import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  // наследуется от Popup, вызывает его конструктор,
  // в который передает нужный параметр.
  // При этом принимает еще и второй параметр - колбэк сабмита формы.
  // Создаем два экземпляра этого класса, в каждый передаем свой
  // коллебек (помимо селектора попапа).
  // В одном случае форма редактирует данные пользователя на странице,
  // во втором - добавляет новую карточку.
  // В качестве идеи - попробуйте совместить функцию коллбека
  // при сабмите формы добавления карточки с аргументом renderer у класса Section
  constructor(popupSelector) {
    super(popupSelector);
    //??? this._closeButton = document.querySelector(".popup__close-btn");
  }

  open() {
    const inputElement = this._element.querySelector("input");
    if (inputElement) inputElement.focus();
  }
}
