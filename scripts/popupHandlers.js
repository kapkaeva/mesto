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

function handleOverlayClick(event) {
  if (event.target.classList.contains("overlay")) {
    event.stopPropagation();
    closePopup();
  }
}

function openPopup(element) {
  element.classList.add("popup_opened");
  const inputElement = element.querySelector("input");
  if (inputElement) inputElement.focus();
  element.addEventListener("click", handleOverlayClick);
  document.addEventListener("keydown", handleOverlayEscPress);
}

function findActive() {
  return document.querySelector(".popup_opened");
}

function closePopup() {
  const element = findActive();
  if (element) {
    const form = element.querySelector(".popup__form");
    if (form) {
      form.reset();
    }
    document.removeEventListener("keydown", handleOverlayEscPress);
    element.removeEventListener("click", handleOverlayClick);
    element.classList.remove("popup_opened");
  }
}

export { handleOpenPopup, closePopup, openPopup };
