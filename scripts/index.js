let popUp = document.querySelector('.popup'); 

let formElement = document.querySelector('.form');
let nameInput = document.querySelector('.form__text_type_name');
let jobInput = document.querySelector('.form__text_type_description');

let editButton = document.querySelector('.profile__edit-btn');
let closeButton = document.querySelector('.popup__close-btn');

let profileName = document.querySelector('.profile__heading');
let description = document.querySelector('.profile__description');

let mestoImage = document.querySelector('mesto__image');
let mestoTitle = document.querySelector('.mesto__title');
let noMestoItem = document.querySelector('.mesto__no-items');


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
  const mestoTemplate = document.getElementById('mesto__template').content;
  const mestoGrid = document.querySelector('.mesto__grid');

  
  cards.forEach(mesto => {
    const mestoElement = mestoTemplate.querySelector('.mesto__item').cloneNode(true);
    mestoElement.querySelector('.mesto__image').src = mesto['link'];
    mestoElement.querySelector('.mesto__image').alt = mesto['name'];
    mestoElement.querySelector('.mesto__title').textContent = mesto['name'];
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

function closeFormProfileInfoEdit() {
  popUp.classList.remove('popup_opened');
}

function handleFormProfileSubmit(evt) {
  evt.preventDefault(evt)
  profileName.textContent = nameInput.value;
  description.textContent = jobInput.value;
  closeFormProfileInfoEdit();
}

editButton.addEventListener('click', editProfileInfo);
closeButton.addEventListener('click', closeFormProfileInfoEdit);
formElement.addEventListener('submit', handleFormProfileSubmit); 


renderHasMesto()
//renderNoMesto()