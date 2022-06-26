export default class Card {
  constructor(
    { data, viewerId, handleCardClick, handleRemove, handleLikeClick },
    cardElement
  ) {
    this.id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._likeCounter = data.likes ? data.likes.length : 0;
    this._viewerId = viewerId;
    this._handleCardClick = handleCardClick;
    this._handleRemove = handleRemove;
    this._handleLikeClick = handleLikeClick;
    this._element = cardElement.cloneNode(true);
    this._image = this._element.querySelector(".card__image");
    this._title = this._element.querySelector(".card__title");
    this._likesCounter = this._element.querySelector(".card__like-counter");
    this._likeBtn = this._element.querySelector(".card__like-button");
    this._removeBtn = this._element.querySelector(".card__delete-button");
  }

  generateCard() {
    this._setEventListeners();
    this._image.src = this._link;
    this._image.alt = this._name;
    this._title.textContent = this._name;
    this._likesCounter.textContent = this._likeCounter;
    if (this._liked()) {
      this._likeBtn.classList.add("card__like-button_active");
    }

    if (this._ownerId === this._viewerId) {
      this._removeBtn.classList.add("card__delete-button_active");
    }

    return this._element;
  }

  remove() {
    this._element.remove();
    this._element = null;
  }

  _liked() {
    if (this._likeCounter === 0) {
      return false;
    }
    return (
      this._likes.find((like) => like._id === this._viewerId) !== undefined
    );
  }

  _setEventListeners() {
    this._likeBtn.addEventListener("click", () => {
      this._handleLikeClick(this.id, this._isLikeActive()).then((data) => {
        this._likesCounter.textContent = data.likes.length;
      });
      this._handleToggleLike();
    });

    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleRemove(this);
      });

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
