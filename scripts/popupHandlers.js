const popupContainer = document.querySelector('[name="viewMestoImage"]');
const popupImage = document.querySelector(".popup__image");
const popupImageTitle = document.querySelector(".popup__img-title");

function handleOpenPopup(link, name) {
  openPopup(popupContainer);
  popupImage.src = link;
  popupImage.alt = name;
  popupImageTitle.textContent = name;
}

function handleOverlayEscPress(event) {
  if (event.code == "Escape") {
    event.stopPropagation();
    closePopup();
  }
}

function openPopup(element) {
  element.classList.add("popup_opened");
  document.addEventListener("keydown", handleOverlayEscPress);
}

function findActive() {
  return document.querySelector(".popup_opened");
}

function closePopup() {
  const element = findActive();
  if (element) {
    document.removeEventListener("keydown", handleOverlayEscPress);
    element.classList.remove("popup_opened");
  }
}

function handleOverlayClick(event) {
  if (event.target.classList.contains("overlay")) {
    event.stopPropagation();
    closePopup();
  }
}

function initOverlayClickEventListeners(elements) {
  elements.forEach((element) => {
    element.addEventListener("click", handleOverlayClick);
  });
}

export {
  handleOpenPopup,
  closePopup,
  openPopup,
  initOverlayClickEventListeners,
};
