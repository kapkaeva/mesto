class Card {
  constructor(name, link) {
    this._name = name;
    this._link = link;
  }

  _getTemplate() {
    document.querySelector("#card-template").content;
    const cardElement = document
      .querySelector("#card-template")
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__image").alt = this._name;
    this._element.querySelector(".card__title").textContent = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleToggleLike();
      });
    
    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDelete();
      });

    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick(); 
      });

  }

  _handleToggleLike() {
    this._element
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDelete() {
    this._element
      .querySelector(".card__delete-button")
      .closest(".card").remove();
  }

  _handleImageClick() {
    //     openPopup(popupViewMestoImage);
    // document
    //   .querySelector("[name=viewMestoImage]")
    //   .classList.add("overlay__image");
    // mestoImage.src = evt.target.src;
    // mestoImage.alt = evt.target.alt;
    // mestoTitle.textContent = evt.target.alt;
  }
  
}

initialCards.forEach((item) => {
  const card = new Card(item.name, item.link);
  const cardElement = card.generateCard();

  document.body.append(cardElement);
});