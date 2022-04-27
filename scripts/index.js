const popupEditPofile = document.getElementById("popup__edit-profile");

const formEditProfile = document.getElementById("editprofile");
const nameInput = document.getElementById("name-input");
const jobInput = document.getElementById("description-input");

const editButton = document.querySelector(".profile__edit-btn");
const closeButtons = document.querySelectorAll(".popup__close-btn");

const profileName = document.querySelector(".profile__heading");
const description = document.querySelector(".profile__description");

const addButton = document.querySelector(".profile__add-btn");
const popupAddMesto = document.getElementById("popup__add-mesto");

const popupViewMestoImage = document.getElementById("popup__view-mesto-image");

const mestoTemplate = document.getElementById("mesto__template").content;
const mestoGrid = document.querySelector(".mesto__grid");

const mestoImageInput = document.getElementById("link-input");
const mestoTitleInput = document.getElementById("title-input");

const noMestoItem = document.querySelector(".mesto__no-items");
const formAddMesto = document.getElementById("addmesto");

const mestoImage = document.querySelector(".popup__image");
const mestoTitle = document.querySelector(".popup__img-title");

const initialCards = [
  {
    name: "Юнион Крик",
    link: "./images/mesto/f732c0-92fc-4869-9e52-ccfc855e2041.jpg",
  },
  {
    name: "Ловерс Лейн Треил",
    link: "./images/mesto/4a7f23ee-f45f-44bc-92a6-4a88040712544.jpg",
  },
  {
    name: "Маунт Шаста",
    link: "./images/mesto/4a7f23ee-f45f-44bc-92a6-4a88040712541.jpg",
  },
  {
    name: "Стоу Лейк",
    link: "./images/mesto/f5547fd2-d3be-49db-874e-32d793eda6722.jpg",
  },
  {
    name: "Здание Капитолий",
    link: "./images/mesto/4a7f23ee-f45f-44bc-92a6-4a88040712542.jpg",
  },
  {
    name: "ТВ и радио антенна тауэр",
    link: "./images/mesto/f161a9ea-d670-42ee-a77e-7b81d0a03372.jpg",
  },
];

function createNewCardItem(name, link) {
  const mestoElement = mestoTemplate
    .querySelector(".mesto__item")
    .cloneNode(true);
  mestoElement.querySelector(".mesto__image").src = link;
  mestoElement.querySelector(".mesto__image").alt = name;
  mestoElement.querySelector(".mesto__title").textContent = name;
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
    const card = createNewCardItem(mesto["name"], mesto["link"]);
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
  element.classList.add("popup_opened");
}

function closePopup() {
  const element = document.querySelector(".popup_opened");
  if (element) {
    element.querySelector(".popup__form").reset();
    element.classList.remove("popup_opened");
    noMestoItem.classList.add("hidden");
  }
}

function handleFormProfileSubmit(evt) {
  evt.preventDefault(evt);
  profileName.textContent = nameInput.value;
  description.textContent = jobInput.value;
  closePopup(evt);
  formEditProfile.reset();
}

function handleFormMestoSubmit(evt) {
  evt.preventDefault(evt);
  const card = createNewCardItem(mestoTitleInput.value, mestoImageInput.value);
  mestoGrid.insertBefore(card, mestoGrid.childNodes[0]);
  closePopup(evt);
  formAddMesto.reset();
}

function listenLikeCard(mestoLike) {
  mestoLike.addEventListener("click", function (element) {
    mestoLike.classList.toggle("mesto__like_active");
  });
}

function listenTrashCard(mestoTrash) {
  mestoTrash.addEventListener("click", function (element) {
    if (mestoTrash.parentNode) {
      mestoTrash.parentNode.remove(mestoTrash);
    }
    if (document.querySelectorAll(".mesto__item").length === 0) {
      noMestoItem.classList.remove("hidden");
    }
  });
}

function listenMestoImage(image) {
  image.addEventListener("click", function (element) {
    openPopup(popupViewMestoImage);
    mestoImage.src = element.target.src;
    mestoTitle.textContent = element.target.alt;
  });
}

const listenPopupEvents = () => {
  document.addEventListener("keydown", function (event) {
    if (event.code == "Escape") {
      closePopup(event);
    }
  });
  const popupList = Array.from(document.querySelectorAll(".overlay"));
  popupList.forEach((popup) => {
    popup.addEventListener("click", function (evt) {
      if (evt.target.classList.contains("overlay")) {
        closePopup(evt);
      }
    });
  });
};

editButton.addEventListener("click", editProfileInfo);
addButton.addEventListener("click", addMesto);
closeButtons.forEach((button) => button.addEventListener("click", closePopup));
formEditProfile.addEventListener("submit", handleFormProfileSubmit);
formAddMesto.addEventListener("submit", handleFormMestoSubmit);

showMestoCards(initialCards);
listenPopupEvents();
