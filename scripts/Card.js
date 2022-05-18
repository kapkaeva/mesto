class Card {
  constructor(name, link) {
    this._name = name;
    this._link = link;
  }

  _getTemplate() {
    document.querySelector("#card-template").content;
    const cardElement = document
    .querySelector("#card-template")
    .content
    .querySelector(".card")
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

}

initialCards.forEach((item) => {
  const card = new Card(item.name, item.link);
  const cardElement = card.generateCard();

  document.body.append(cardElement);
});