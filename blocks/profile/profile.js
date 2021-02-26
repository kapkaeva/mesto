let popUp = document.querySelector('.popup');

let editButton = document.querySelector('.profile__edit-btn');
let submitButton = document.querySelector('.popup__submit-btn_action_save');
let closeButton = document.querySelector('.popup__close-btn');

let name = document.querySelector('.profile__heading');
let description = document.querySelector('.profile__description');
let nameInput = document.querySelector('.form__text_type_name');
let jobInput = document.querySelector('.form__text_type_description');


function editProfileInfo() {
  popUp.setAttribute('style', 'display: block');
  nameInput.value = name.textContent;
  jobInput.value = description.textContent;
  nameInput.addEventListener('keyup', enterKeyDown);
  jobInput.addEventListener('keyup', enterKeyDown);
}

function enterKeyDown(evt) {
  if (evt.code === 'Enter') {
    formSubmitHandler(evt);
  } else if (evt.code === 'Escape') {
    closeProfileInfoEditForm();
  }
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  description.textContent = jobInput.value;
  closeProfileInfoEditForm();
}

function closeProfileInfoEditForm() {
  popUp.setAttribute('style', 'display: none');
}

editButton.addEventListener('click', editProfileInfo);
closeButton.addEventListener('click', closeProfileInfoEditForm);
submitButton.addEventListener('click', formSubmitHandler);