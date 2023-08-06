import Card from './Card.js';
import FormValidator from './FormValidator.js';

const editProfileButton = document.querySelector('.profile__edit-button');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');
const popupEditProfile = document.querySelector('.popup-edit-profile');

const editProfileForm = document.forms['edit-profile-form'];
const inputName = popupEditProfile.querySelector('.popup__input_type_name');
const inputDescription = popupEditProfile.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const placesContainer = document.querySelector('.places');

const addPlaceButton = document.querySelector('.add-button');
const popupAddPlace = document.querySelector('.popup-add-place');
const addPlaceForm = document.forms['add-place-form'];
const inputTitle = popupAddPlace.querySelector('.popup__input_type_title');
const inputLink = popupAddPlace.querySelector('.popup__input_type_link');

const popupImgView = document.querySelector('.popup-imageview');
const popupImgViewPic= popupImgView.querySelector('.popup-imageview__img');
const popupImgViewCaption = popupImgView.querySelector('.popup-imageview__caption');

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

const formValidators = {}

export function openPopup (popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
};

function handleCardClick(name, link) {
  popupImgViewPic.src = link;
  popupImgViewPic.alt = name;
  popupImgViewCaption.textContent = name;
  openPopup(popupImgView);
}

export function closePopupByEsc (event) {
  if (event.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
};

function closePopup (popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
};

function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(popupEditProfile);
}

function handlePlaceFormSubmit (evt) {
  evt.preventDefault();
  const name = inputTitle.value;
  const link = inputLink.value;

  const placeCard = createCard({name, link}, '.place-template', handleCardClick);
  placesContainer.prepend(placeCard);
  closePopup(popupAddPlace);
};

//Рендер карточек

function createCard(data) {
  const cardElement = new Card(data, '.place-template', handleCardClick);
  return cardElement.generateCard();
}

const renderPlaceCard = (data) => {
  const placeCard = createCard(data);
  placesContainer.append(placeCard);
}

initialCards.forEach(renderPlaceCard);

// Включение валидации

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(VALIDATION_CONFIG);

//Перебор попапов и установка слушателей на кнопки закрытия и клик вне попапа

popupCloseButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));

  popup.addEventListener('mousedown', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }    
  });
});

editProfileButton.addEventListener('click', () => {
  formValidators['edit-profile-form'].resetValidation();

  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  openPopup(popupEditProfile);
});

editProfileForm.addEventListener('submit', handleProfileFormSubmit);

addPlaceButton.addEventListener('click', () => {
  formValidators['add-place-form'].resetValidation();

  inputTitle.value = null;
  inputLink.value = null;
  openPopup(popupAddPlace);
});

addPlaceForm.addEventListener('submit', handlePlaceFormSubmit);