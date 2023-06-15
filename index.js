const editProfileButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');
const inputName = popup.querySelector('.popup__input_type_name');
const inputDescription = popup.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

function popupOpenHandleClick() {
  popup.classList.toggle('popup_opened');
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
}

editProfileButton.addEventListener('click', popupOpenHandleClick);

function popupCloseHandleClick() {
  popup.classList.toggle('popup_opened');
}

popupCloseButton.addEventListener('click', popupCloseHandleClick);

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  popup.classList.toggle('popup_opened');
}

popup.addEventListener('submit', handleFormSubmit);