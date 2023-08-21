import './index.css';

import Section from '../scripts/components/Section';
import Card from '../scripts/components/Card';
import FormValidator from '../scripts/components/FormValidator.js';

import PopupWithImage from '../scripts/components/PopupWithImage';
import PopupWithForm from '../scripts/components/PopupWithForm';
import UserInfo from '../scripts/components/UserInfo';

import { 
  editProfileButton,
  inputName,
  inputDescription,
  placesContainer,
  placesContainerSelector,
  addPlaceButton,
  inputTitle,
  inputLink,
  initialCards,
  VALIDATION_CONFIG,
  formValidators
} from '../scripts/utils/constants.js';

// Обработчик клика на изображение карточки:

function handleCardClick(name, link) {
  popupImgView.open(name, link);
}

// Рендер карточек:

function createCard(data) {
  const cardElement = new Card(data, '.place-template', handleCardClick);
  return cardElement.generateCard();
}

const cardsSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const placeCard = createCard(item);
    cardsSection.appendItem(placeCard);
   }
  }, placesContainerSelector
);

cardsSection.renderItems();

// Включение валидации:

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

// Создание экземпляра класса Userinfo:

const userInfo = new UserInfo('.profile__name', '.profile__description');

// Создание экземпляра класса PopupWithForm для попапа редактирования профиля:

const popupEditProfile = new PopupWithForm('.popup-edit-profile',
  function handleFormSubmit(formData) {
    userInfo.setUserInfo(formData);

    popupEditProfile.close();
    // cбросили ошибки:
    formValidators['edit-profile-form'].resetValidation();
  }
)
popupEditProfile.setEventListeners();

// Создание экземпляра класса PopupWithForm для попапа добавления карточки места:

const popupAddPlace = new PopupWithForm('.popup-add-place',
  function handleFormSubmit(formData) {
    // добавили новое свойство объекту с данными карточки и присвоили 
    // ему значение св-ва title:
    formData.name = formData.title;

    const newCard = createCard(formData);
    cardsSection.prependItem(newCard);

    popupAddPlace.close();
    // cбросили ошибки:
    formValidators['add-place-form'].resetValidation();
  }
);
popupAddPlace.setEventListeners();

// Создание экземпляра класса PopupWithImage:

const popupImgView = new PopupWithImage('.popup-imageview');
popupImgView.setEventListeners();

// Обработчик клика кнопки редактирования профиля:

function handleEditProfileClick() {
  formValidators['edit-profile-form'].resetValidation();
  // собрали данные пользователя со страницы:
  const data = userInfo.getUserInfo();
  // подставили в инпуты формы:
  inputName.value = data.name;
  inputDescription.value = data.description;
  popupEditProfile.open();
}

// Установка слушателя на кнопку редактирования профиля:

editProfileButton.addEventListener('click', handleEditProfileClick);

// Обработчик клика кнопки создания карточки:

function handleAddPlaceClick() {
  // сбросили ошибки:
  formValidators['add-place-form'].resetValidation();
  // очистили поля формы:
  document.forms['add-place-form'].reset();
  popupAddPlace.open();
}

// Установка слушателя на кнопку создания карточки:

addPlaceButton.addEventListener('click', handleAddPlaceClick);


