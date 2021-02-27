let popUp = document.querySelector('.popup'); 

let formElement = document.querySelector('.form');
let nameInput = document.querySelector('.form__text_type_name');
let jobInput = document.querySelector('.form__text_type_description');

let editButton = document.querySelector('.profile__edit-btn');
let closeButton = document.querySelector('.popup__close-btn');

let profileName = document.querySelector('.profile__heading');
let description = document.querySelector('.profile__description');


function editProfileInfo() {
  closeFormProfileInfoEdit();
  nameInput.value = profileName.textContent;
  jobInput.value = description.textContent;
}

function closeFormProfileInfoEdit() {
  popUp.classList.toggle('close');
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