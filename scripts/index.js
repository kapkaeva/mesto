let popUp = document.querySelector('.popup'); 

let btnEditProfile = document.querySelector('[name="editprofile"]');
let nameInput = document.querySelector('.form__text_type_name');
let jobInput = document.querySelector('.form__text_type_description');

let editButton = document.querySelector('.profile__edit-btn');
let closeButtons = document.querySelectorAll('.popup__close-btn');

let profileName = document.querySelector('.profile__heading');
let description = document.querySelector('.profile__description');

let addButton = document.querySelector('.profile__add-btn');
let popupAddMesto = document.getElementById('popup__add-mesto');

const mestoTemplate = document.getElementById('mesto__template').content;
const mestoGrid = document.querySelector('.mesto__grid');

let mestoImageInput = document.querySelector('.form__text_type_mesto-link');
let mestoTitleInput = document.querySelector('.form__text_type_mesto-title');

let noMestoItem = document.querySelector('.mesto__no-items');
let btnAddMesto = document.querySelector('[name="addmesto"]');



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

function showMestoCards(cards) {  
  cards.forEach(mesto => {
    const mestoElement = mestoTemplate.querySelector('.mesto__item').cloneNode(true);
    mestoElement.querySelector('.mesto__image').src = mesto['link'];
    mestoElement.querySelector('.mesto__image').alt = mesto['name'];
    mestoElement.querySelector('.mesto__title').textContent = mesto['name'];
    console.log(mestoElement.querySelector('mesto__like'));
    //mestoElement.querySelector('mesto__like').addEventListener('click', handleLikeButton);
    let mestoButton = mestoElement.querySelector('.mesto__like')
    listenLikeCard(mestoButton)
    mestoGrid.append(mestoElement); 
  });
}

function renderHasMesto() {
  noMestoItem.classList.add('mesto__no-items_hidden');
  showMestoCards(initialCards);
}

function renderNoMesto() {
  noMestoItem.classList.remove('mesto__no-items_hidden');
}

function editProfileInfo() {
  popUp.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = description.textContent;
}

function addMesto() {
  popupAddMesto.classList.add('popup_opened');
}

function closePopup() {
  let popUpOpened = document.querySelector('.popup_opened'); 
  popUpOpened.classList.remove('popup_opened');
}

function handleFormProfileSubmit(evt) {
  evt.preventDefault(evt)
  profileName.textContent = nameInput.value;
  description.textContent = jobInput.value;
  closePopup();
}

function handleFormMestoSubmit(evt) {
  evt.preventDefault(evt)
  const mestoElement = mestoTemplate.querySelector('.mesto__item').cloneNode(true);
  mestoElement.querySelector('.mesto__image').src = 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'; //mestoImageInput.value
  mestoElement.querySelector('.mesto__image').alt = 'kamchatka'; //mestoTitleInput.value
  mestoElement.querySelector('.mesto__title').textContent = 'Камчатка'; //mestoTitleInput.value
  mestoGrid.appendChild(mestoElement);
  mestoGrid.insertBefore(mestoElement, mestoGrid.childNodes[0]);
  closePopup();
}


function listenLikeCard(mestoLike) {
  mestoLike.addEventListener("click", function(element) {
    if (mestoLike.classList.contains('mesto__like_active')) {
      mestoLike.classList.remove('mesto__like_active');
    } else {
      mestoLike.classList.add('mesto__like_active');
    }
  });
}

editButton.addEventListener('click', editProfileInfo);
addButton.addEventListener('click', addMesto);
closeButtons.forEach(button => button.addEventListener('click', closePopup)); 
btnEditProfile.addEventListener('submit', handleFormProfileSubmit); 
btnAddMesto.addEventListener('submit', handleFormMestoSubmit); 


renderHasMesto()
//renderNoMesto()
