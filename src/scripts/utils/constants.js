export const editProfileButton = document.querySelector('.profile__edit-button');

export const inputName = document.querySelector('.popup__input_type_name');
export const inputDescription = document.querySelector('.popup__input_type_description');

export const placesContainer = document.querySelector('.places');
export const placesContainerSelector = '.places';

export const addPlaceButton = document.querySelector('.add-button');
export const inputTitle = document.querySelector('.popup__input_type_title');
export const inputLink = document.querySelector('.popup__input_type_link');

import dagestan from '../../images/places/dagestan.jpg';
import elbrus from '../../images/places/elbrus.jpg';
import dombay from  '../../images/places/dombay.jpg';
import bashkortostan from '../../images/places/bashkortostan.jpg';
import iturup from '../../images/places/iturup.jpg';
import karachay from '../../images/places/karachayevsk.jpg';
export const initialCards = [
  {
    name: 'Дагестан',
    link: dagestan
  },
  {
    name: 'Гора Эльбрус',
    link: elbrus
  },
  {
    name: 'Домбай',
    link: dombay
  },
  {
    name: 'Башкортостан',
    link: bashkortostan
  },
  {
    name: 'Остров Итуруп',
    link: iturup
  },
  {
    name: 'Карачаево-Черкессия',
    link: karachay
  }
]; 

export const VALIDATION_CONFIG = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export const formValidators = {}