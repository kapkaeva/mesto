let popupEditPofile = document.getElementById('popup__edit-profile');

let formEditProfile = document.querySelector('[name="editprofile"]');
let nameInput = document.querySelector('.form__text_type_name');
let jobInput = document.querySelector('.form__text_type_description');

let editButton = document.querySelector('.profile__edit-btn');
let closeButtons = document.querySelectorAll('.popup__close-btn');

let profileName = document.querySelector('.profile__heading');
let description = document.querySelector('.profile__description');

let addButton = document.querySelector('.profile__add-btn');
let popupAddMesto = document.getElementById('popup__add-mesto');

let popupViewMestoImage = document.getElementById('popup__view-mesto-image');

const mestoTemplate = document.getElementById('mesto__template').content;
const mestoGrid = document.querySelector('.mesto__grid');

let mestoImageInput = document.querySelector('.form__text_type_mesto-link');
let mestoTitleInput = document.querySelector('.form__text_type_mesto-title');

let noMestoItem = document.querySelector('.mesto__no-items');
let formAddMesto = document.querySelector('[name="addmesto"]');

let mestoImage = document.querySelector('.popup__image');
let mestoTitle = document.querySelector('.popup__img-title');

const initialCards = [
  {
    name: 'Юнион Крик',
    link: './images/mesto/f732c0-92fc-4869-9e52-ccfc855e2041.jpg'
  },
  {
    name: 'Ловерс Лейн Треил',
    link: './images/mesto/4a7f23ee-f45f-44bc-92a6-4a88040712544.jpg'
  },
  {
    name: 'Маунт Шаста',
    link: './images/mesto/4a7f23ee-f45f-44bc-92a6-4a88040712541.jpg'
  },
  {
    name: 'Стоу Лейк',
    link: './images/mesto/f5547fd2-d3be-49db-874e-32d793eda6722.jpg'
  },
  {
    name: 'Здание Капитолий',
    link: './images/mesto/4a7f23ee-f45f-44bc-92a6-4a88040712542.jpg'
  },
  {
    name: 'ТВ и радио антенна тауэр',
    link: './images/mesto/f161a9ea-d670-42ee-a77e-7b81d0a03372.jpg'
  }
];


function createNewCardItem(name, link) {
  const mestoElement = mestoTemplate.querySelector('.mesto__item').cloneNode(true);
  mestoElement.querySelector('.mesto__image').src = link;
  mestoElement.querySelector('.mesto__image').alt = name;
  mestoElement.querySelector('.mesto__title').textContent = name;
  addCardItemListeners(mestoElement);
  return mestoElement;
}

function addCardItemListeners(mestoElement) {
  listenLikeCard(mestoElement.querySelector('.mesto__like'));
  listenTrashCard(mestoElement.querySelector('.mesto__trash'));
  listenMestoImage(mestoElement.querySelector('.mesto__image'));
}

function showMestoCards(cards) {
  noMestoItem.classList.add('mesto__no-items_hidden');
  cards.forEach(mesto => {
    let card = createNewCardItem(mesto['name'], mesto['link']);
    mestoGrid.append(card);
  });
}

function editProfileInfo() {
  openPopup(popupEditPofile);
  nameInput.value = profileName.textContent;
  jobInput.value = description.textContent;
}

function addMesto() {
  openPopup(popupAddMesto);
}

function openPopup(element) {
  element.classList.add('popup_opened');
  element.classList.remove('popup_hidden');
}

function closePopup(event) {
  let element = event.target.closest('.popup');
  element.classList.remove('popup_opened');
  element.classList.add('popup_hidden');
}

function handleFormProfileSubmit(evt) {
  evt.preventDefault(evt)
  profileName.textContent = nameInput.value;
  description.textContent = jobInput.value;
  closePopup(evt);
}

function handleFormMestoSubmit(evt) {
  evt.preventDefault(evt)
  let card = createNewCardItem(mestoTitleInput.value, mestoImageInput.value);
  mestoGrid.insertBefore(card, mestoGrid.childNodes[0]);
  closePopup(evt);
}

function listenLikeCard(mestoLike) {
  mestoLike.addEventListener('click', function (element) {
    if (mestoLike.classList.contains('mesto__like_active')) {
      mestoLike.classList.remove('mesto__like_active');
    } else {
      mestoLike.classList.add('mesto__like_active');
    }
  });
}

function listenTrashCard(mestoTrash) {
  mestoTrash.addEventListener('click', function (element) {
    if (mestoTrash.parentNode) {
      mestoTrash.parentNode.remove(mestoTrash);
    }
    if (document.querySelectorAll('.mesto__item').length === 0) {
      noMestoItem.classList.remove('mesto__no-items_hidden');
    }
  });
}

function listenMestoImage(image) {
  image.addEventListener('click', function (element) {
    openPopup(popupViewMestoImage);
    mestoImage.src = element.target.src;
    mestoTitle.textContent = element.target.alt;
  });
}


editButton.addEventListener('click', editProfileInfo);
addButton.addEventListener('click', addMesto);
closeButtons.forEach(button => button.addEventListener('click', closePopup));
formEditProfile.addEventListener('submit', handleFormProfileSubmit);
formAddMesto.addEventListener('submit', handleFormMestoSubmit);


showMestoCards(initialCards)
