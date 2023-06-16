const editProfileButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');
const editProfileForm = popup.querySelector('.popup__form');
const inputName = popup.querySelector('.popup__input_type_name');
const inputDescription = popup.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

function popupOpenHandleClick() {
  popup.classList.toggle('popup_opened');
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
}

function popupCloseHandleClick() {
  popup.classList.toggle('popup_opened');
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  popupCloseHandleClick();
}

editProfileButton.addEventListener('click', popupOpenHandleClick);
popupCloseButton.addEventListener('click', popupCloseHandleClick);
editProfileForm.addEventListener('submit', handleFormSubmit);