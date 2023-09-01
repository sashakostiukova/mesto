export const updateAvatarButton = document.querySelector('.profile__update-avatar-button')
export const editProfileButton = document.querySelector('.profile__edit-button');
export const userAvatar = document.querySelector('.profile__image');

export const inputName = document.querySelector('.popup__input_type_name');
export const inputDescription = document.querySelector('.popup__input_type_description');

export const placesContainerSelector = '.places';

export const addPlaceButton = document.querySelector('.add-button');

export const popupImgViewPic = document.querySelector('.popup-imageview__img');
export const popupImgViewCaption = document.querySelector('.popup-imageview__caption');

export const VALIDATION_CONFIG = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export const formValidators = {}

export const apiConfig = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-74',
  headers: {
    "Content-Type": "application/json",
    authorization: '1d3a749f-f7d8-44c4-ad86-87f3a5b73fd2',
  }
};