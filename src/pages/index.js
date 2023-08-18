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

function handleCardClick(name, link) {
  const popupWithImage = new PopupWithImage('.popup-imageview', {name, link});
  popupWithImage.open();
}

//Рендер карточек

function createCard(data) {
  const cardElement = new Card(data, '.place-template', handleCardClick);
  return cardElement.generateCard();
}

const defaultCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const placeCard = createCard(item);
    defaultCardList.addItem(placeCard);
   }
  }, placesContainerSelector
);

defaultCardList.renderItems();

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

//создание экземпляра класса Userinfo

const userInfo = new UserInfo('.profile__name', '.profile__description');

// создание экземпляра класса PopupWithForm для попапа редактирования профиля

const popupEditProfile = new PopupWithForm('.popup-edit-profile',
  function handleFormSubmit() {
    //собрали данные пользователя:
    const data = popupEditProfile._getInputValues(); 
    //подставляем данные пользователя на страницу:
    userInfo.setUserInfo(data);
  }
)
popupEditProfile.setEventListeners();

//создание экземпляра класса PopupWithForm для попапа добавления карточки места

const popupAddPlace = new PopupWithForm('.popup-add-place',
  function handleFormSubmit() {
    // собрали значения инпутов:
    const data = popupAddPlace._getInputValues();

    // добавили новое свойство объекту с данными карточки и присвоили 
    // ему значение св-ва title
    data.name = data.title;
    // создали массив и добавили туда объект с данными карточки
    const dataArray = [];
    dataArray.push(data);

    const cardElement = new Section({
      items: dataArray,
      renderer: (item) => {
        const placeCard = createCard(item);

        placesContainer.prepend(placeCard); // добавляет в начало контейнера
      }
    }, placesContainerSelector
    );
    cardElement.renderItems();
  }
);
popupAddPlace.setEventListeners();

// слушатель кнопки редактирования профиля

editProfileButton.addEventListener('click', () => {
  formValidators['edit-profile-form'].resetValidation();
  // собрали данные пользователя со страницы:
  const data = userInfo.getUserInfo();
  // подставили в инпуты формы:
  inputName.value = data.name;
  inputDescription.value = data.description;

  popupEditProfile.open();
});

// слушатель кнопки создания карточки

addPlaceButton.addEventListener('click', () => {
  formValidators['add-place-form'].resetValidation();

  inputTitle.value = null;
  inputLink.value = null;
  popupAddPlace.open();
});


