const popupEditPofile = document.querySelector('[name="popupeditprofile"]');

const formEditProfile = document.querySelector('[name="editprofile"]');
const nameInput = document.querySelector(".popup__input-name");
const jobInput = document.querySelector(".popup__input-description");

const buttonEditProfile = document.querySelector(".profile__edit-btn");
const closeButtons = document.querySelectorAll(".popup__close-btn");

const profileName = document.querySelector(".profile__heading");
const description = document.querySelector(".profile__description");

const buttonAddMestoButton = document.querySelector(".profile__add-btn");
const popupAddMesto = document.querySelector('[name="popupaddmesto"]');

const popupViewMestoImage = document.querySelector('[name="viewmestoimage"]');

const mestoTemplate = document.querySelector("#mesto__template").content;
const mestoGrid = document.querySelector(".mesto__grid");

const mestoImageInput = document.querySelector("#link-input");
const mestoTitleInput = document.querySelector("#title-input");

const noMestoItem = document.querySelector(".mesto__no-items");
const formAddMesto = document.querySelector('[name="addmesto"]'); 

const mestoImage = document.querySelector(".popup__image");
const mestoTitle = document.querySelector(".popup__img-title");

function createNewCardItem(name, link) {
  const mestoElement = mestoTemplate
    .querySelector(".mesto__item")
    .cloneNode(true);
  const mestoCardImage = mestoElement.querySelector(".mesto__image");
  const mestoCardTitle = mestoElement.querySelector(".mesto__title");
  mestoCardImage.src = link;
  mestoCardImage.alt = name;
  mestoCardTitle.textContent = name;
  addCardItemListeners(mestoElement);
  return mestoElement;
}

function addCardItemListeners(mestoElement) {
  listenLikeCard(mestoElement.querySelector(".mesto__like"));
  listenTrashCard(mestoElement.querySelector(".mesto__trash"));
  listenMestoImage(mestoElement.querySelector(".mesto__image"));
}

function showMestoCards(cards) {
  noMestoItem.classList.add("hidden");
  cards.forEach((mesto) => {
    const card = createNewCardItem(mesto.name, mesto.link);
    mestoGrid.append(card);
  });
}

function editProfileInfo() {
  nameInput.value = profileName.textContent;
  jobInput.value = description.textContent;
  openPopup(popupEditPofile);
}

function addMesto() {
  openPopup(popupAddMesto);
}

function openPopup(element) {
  element.classList.add("popup_opened");
  element.querySelector("input,img").focus();
  addEscKeydownListener(element);
  addClickEventListener(element);
}

function closePopup() {
  const element = document.querySelector(".popup_opened");
  if (element) {
    const form = element.querySelector(".popup__form");
    if (form) {
      form.reset();
    }
    element.classList.remove("popup_opened");
    noMestoItem.classList.add("hidden");
    document.removeEventListener("keydown", handleOverlayEscPress);
    element.removeEventListener("click", handleOverlayClick);
  }
}

function handleFormProfileSubmit(evt) {
  evt.preventDefault(evt);
  profileName.textContent = evt.target.elements.profilename.value;
  description.textContent = evt.target.elements.description.value;
  closePopup(evt);
  formEditProfile.reset();
}

function handleFormMestoSubmit(evt) {
  evt.preventDefault(evt);
  const card = createNewCardItem(
    evt.target.elements.mestotitle.value,
    evt.target.elements.mestolink.value
  );
  mestoGrid.prepend(card);
  closePopup(evt);
  formAddMesto.reset();
}

function listenLikeCard(event) {
  event.addEventListener("click", function (element) {
    element.target.classList.toggle("mesto__like_active");
  });
}

function listenTrashCard(event) {
  event.addEventListener("click", function (element) {
    element.target.closest(".mesto__item").remove();
    if (document.querySelectorAll(".mesto__item").length === 0) {
      noMestoItem.classList.remove("hidden");
    }
  });
}

function listenMestoImage(image) {
  image.addEventListener("click", function (element) {
    openPopup(popupViewMestoImage);
    document
      .querySelector("[name=viewmestoimage]")
      .classList.add("overlay__image");
    mestoImage.src = element.target.src;
    mestoImage.alt = element.target.alt;
    mestoTitle.textContent = element.target.alt;
  });
}

function handleOverlayEscPress(event) {
  if (event.code == "Escape") {
    event.stopPropagation();
    closePopup(event);
  }
}

function addEscKeydownListener(element) {
  document.addEventListener("keydown", handleOverlayEscPress);
}

function handleOverlayClick(event) {
  if (event.target.classList.contains("overlay")) {
    closePopup(event);
  }
}

function addClickEventListener(element) {
  element.addEventListener("click", handleOverlayClick);
}

buttonEditProfile.addEventListener("click", editProfileInfo);
buttonAddMestoButton.addEventListener("click", addMesto);
closeButtons.forEach((button) => button.addEventListener("click", closePopup));
formEditProfile.addEventListener("submit", handleFormProfileSubmit);
formAddMesto.addEventListener("submit", handleFormMestoSubmit);

showMestoCards(initialCards);
