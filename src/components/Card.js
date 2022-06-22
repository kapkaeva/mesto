export default class Card {
  constructor(
    { data, handleCardClick, handleRemove, handleLikeClick },
    cardElement
  ) {
    this.id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._likeCounter = data.likes ? data.likes.length : 0;
    this._handleCardClick = handleCardClick;
    this._handleRemove = handleRemove;
    this._handleLikeClick = handleLikeClick;
    this._element = cardElement.cloneNode(true);
    this._image = this._element.querySelector(".card__image");
    this._title = this._element.querySelector(".card__title");
    this._likes = this._element.querySelector(".card__like-counter");
    this._likeBtn = this._element.querySelector(".card__like-button");
  }

  generateCard() {
    this._setEventListeners();
    this._image.src = this._link;
    this._image.alt = this._name;
    this._title.textContent = this._name;
    this._likes.textContent = this._likeCounter;
    return this._element;
  }

  remove() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._likeBtn.addEventListener("click", () => {
      this._handleLikeClick(this.id, this._isLikeActive()).then((data) => {
        this._likes.textContent = data.likes.length;
      });
      this._handleToggleLike();
    });

    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", () => this._handleRemove(this));

    this._image.addEventListener("click", (evt) => {
      this._handleCardClick(this._link, this._name);
    });
  }

  _isLikeActive() {
    return this._likeBtn.classList.contains("card__like-button_active");
  }

  _handleToggleLike() {
    this._likeBtn.classList.toggle("card__like-button_active");
  }
}
