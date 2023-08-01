import Card from './Card.js';
import FormValidator from './FormValidator.js';

const editProfileButton = document.querySelector('.profile__edit-button');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');
const popupEditProfile = document.querySelector('.popup-edit-profile');

const editProfileForm = popupEditProfile.querySelector('.edit-profile-form');
const inputName = popupEditProfile.querySelector('.popup__input_type_name');
const inputDescription = popupEditProfile.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const placesContainer = document.querySelector('.places');

const addPlaceButton = document.querySelector('.add-button');
const popupAddPlace = document.querySelector('.popup-add-place');
const addPlaceForm = document.querySelector('.add-place-form');
const inputTitle = popupAddPlace.querySelector('.popup__input_type_title');
const inputLink = popupAddPlace.querySelector('.popup__input_type_link');

const formList = Array.from(document.querySelectorAll('.popup__form'));

const initialCards = [
  {
    name: 'Дагестан',
    link: './images/places/dagestan.jpg'
  },
  {
    name: 'Гора Эльбрус',
    link: './images/places/elbrus.jpg'
  },
  {
    name: 'Домбай',
    link: './images/places/dombay.jpg'
  },
  {
    name: 'Башкортостан',
    link: './images/places/bashkortostan.jpg'
  },
  {
    name: 'Остров Итуруп',
    link: './images/places/iturup.jpg'
  },
  {
    name: 'Карачаево-Черкессия',
    link: './images/places/karachayevsk.jpg'
  }
]; 

const VALIDATION_CONFIG = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export function openPopup (popupElement) {
  popupElement.classList.toggle('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
};

function openPopupForm (popupElement, config) {

  const buttonElement = popupElement.querySelector(config.submitButtonSelector);
  disableSubmitButton (buttonElement, config);

  const inputElements = popupElement.querySelectorAll(config.inputSelector);
  inputElements.forEach((inputElement) => {
    hideError(popupElement, inputElement, config);
  });

  openPopup(popupElement);
}

function disableSubmitButton (buttonElement, config) {
  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.disabled = true;
}

function hideError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(config.errorClass);
  inputElement.classList.remove(config.inputErrorClass);
}

export function closePopupByEsc (event) {
  if (event.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
};

function closePopup (popupElement) {
  popupElement.classList.toggle('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
};

function editProfileFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(popupEditProfile);
}

function addPlaceFormSubmit (evt) {
  evt.preventDefault();
  const name = inputTitle.value;
  const link = inputLink.value;

  const placeCard = new Card({name, link}, '.place-template');
  placesContainer.prepend(placeCard.generateCard());
  closePopup(popupAddPlace);
};

//Рендер карточек

const renderPlaceCard = (data, selector) => {
  const placeCard = new Card(data, selector);
  placesContainer.append(placeCard.generateCard());
}

initialCards.forEach((item) => {
  renderPlaceCard(item, '.place-template');
});

//Валидация форм

formList.forEach((formElement) => {
  const newValidator = new FormValidator(VALIDATION_CONFIG, formElement);
  newValidator.enableValidation();
})

//Перебор попапов и установка слушателей на кнопки закрытия и клик вне попапа

popupCloseButtons.forEach((button) => {
  const buttonsPopup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(buttonsPopup));

  buttonsPopup.addEventListener('mousedown', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(buttonsPopup);
    }    
  });
});

editProfileButton.addEventListener('click', () => {
  openPopupForm(popupEditProfile, VALIDATION_CONFIG); 
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
});

editProfileForm.addEventListener('submit', editProfileFormSubmit);

addPlaceButton.addEventListener('click', () => {
  openPopupForm(popupAddPlace, VALIDATION_CONFIG)
  inputTitle.value = null;
  inputLink.value = null;
});

addPlaceForm.addEventListener('submit', addPlaceFormSubmit);