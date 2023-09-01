import './index.css';

import Section from '../scripts/components/Section';
import Card from '../scripts/components/Card';
import FormValidator from '../scripts/components/FormValidator.js';

import PopupWithImage from '../scripts/components/PopupWithImage';
import PopupWithForm from '../scripts/components/PopupWithForm';
import UserInfo from '../scripts/components/UserInfo';
import PopupWithConfirmation from '../scripts/components/PopupWithConfirmation';

import Api from '../scripts/components/Api';

import { 
  updateAvatarButton,
  editProfileButton,
  userAvatar,
  inputName,
  inputDescription,
  placesContainerSelector,
  addPlaceButton,
  VALIDATION_CONFIG,
  formValidators,
  apiConfig
} from '../scripts/utils/constants.js';

// Создание экземпляра класса Api для реализации запросов к серверу:

const api = new Api(apiConfig);

// Функция удаления карточки с сервера:

const handleClickDelete = (card) => {
  api.deleteCard(card._cardId)
    .then(() => {
      card._handleClickDelete();
      popupWithConfirmation.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    }); 
}

// Обработчик лайка карточки

const handleClickLike = (card) => {
  if(card.isLiked) {
    api.deleteLike(card._cardId)
      .then((cardObj) => {
        if (cardObj.likes.length === 0) {
          card._newCard.querySelector('.place__likes-counter')
          .textContent = '';
        } else {
          card._newCard.querySelector('.place__likes-counter')
          .textContent = cardObj.likes.length;
        }
        card.isLiked = false;
        card._placeLikeButton
        .classList.remove('place__like-button_active');
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      }); 

  } else {

    api.like(card._cardId)
      .then((cardObj) => {
        card._newCard.querySelector('.place__likes-counter')
        .textContent = cardObj.likes.length;
        card.isLiked = true;
        card._placeLikeButton
        .classList.add('place__like-button_active');
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      }); 
  }
}

// Создание экземпляра класса PopupWithConfirmation для попапа подтверждения удаленя карточки:
const popupWithConfirmation = new PopupWithConfirmation('.popup-delete-place', handleClickDelete);
popupWithConfirmation.setEventListeners();

function openDeletePopup(card) {
  popupWithConfirmation.open(card);
}

// Обработчик клика на изображение карточки:

function handleCardClick(name, link) {
  popupImgView.open(name, link);
}

// Рендер карточек:

function createCard(data) {
  const cardElement = new Card(
    data, 
    '.place-template', 
    handleCardClick, 
    openDeletePopup, 
    handleClickLike,
    userInfo.id
  );
  return cardElement.generateCard();
}

const cardsSection = new Section({renderer: (item) => {
    const placeCard = createCard(item);
    cardsSection.appendItem(placeCard);
    }
  }, placesContainerSelector
);

api.getAllCards()
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  }); 

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

// Загрузка информации о пользователе с сервера:

api.getUserInfo()
  .then((userData) => {
    const data = { ...userData, description: userData.about};
    userInfo.setUserInfo(data);
    userAvatar.src = data.avatar;
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

  Promise.all([api.getAllCards(), api.getUserInfo()])
    .then(([cards, user]) => {
      cardsSection.renderItems(cards);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });

// Создание экземпляра класса PopupWithForm для попапа редактирования профиля:

const popupEditProfile = new PopupWithForm('.popup-edit-profile',
  function handleFormSubmit(formData) {
    const submitButton = document.querySelector('.edit-profile-submit-button')
    submitButton.textContent = 'Сохранение...'

    api.editUserInfo(formData)
      .then((userData) => {
        const data = { ...userData, description: userData.about};
        userInfo.setUserInfo(data);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
        popupEditProfile.close();
        formValidators['edit-profile-form'].resetValidation();
        submitButton.textContent = 'Сохранить';
      });
  }
)
popupEditProfile.setEventListeners();

// Создание экземпляра класса PopupWithForm для попапа добавления карточки места:

const popupAddPlace = new PopupWithForm('.popup-add-place',
  function handleFormSubmit(formData) {
    // добавили новое свойство объекту с данными карточки и присвоили 
    // ему значение св-ва title:
    formData.name = formData.title;
    const submitButton = document.querySelector('.add-place-submit-button')
    submitButton.textContent = 'Сохранение...';

    api.addCard(formData)
      .then((cardObj) => {
        const newCard = createCard(cardObj);
        cardsSection.prependItem(newCard);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
        popupAddPlace.close();
        formValidators['add-place-form'].resetValidation();
        submitButton.textContent = 'Создать';
      });
  }
);
popupAddPlace.setEventListeners();

// Создание экземпляра класса PopupWithForm для попапа обновления аватара

const popupUpdateAvatar = new PopupWithForm('.popup-update-avatar',
  function handleFormSubmit(formData) {
    const submitButton = document.querySelector('.update-avatar-submit-button');
    submitButton.textContent = 'Сохранение...'

    api.updateAvatar(formData.link)
      .then((userObj) => {
        userAvatar.src = userObj.avatar;
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
        popupUpdateAvatar.close();
        formValidators['update-avatar-form'].resetValidation();
        submitButton.textContent = 'Сохранить';
      });
  }
);
popupUpdateAvatar.setEventListeners();

// Создание экземпляра класса PopupWithImage:

const popupImgView = new PopupWithImage('.popup-imageview');
popupImgView.setEventListeners();

// Обработчик клика кнопки редактирования аватара:

function handleEditAvatarClick() {
  // сбросили ошибки:
  formValidators['update-avatar-form'].resetValidation();
  // очистили поля формы:
  document.forms['update-avatar-form'].reset();
  popupUpdateAvatar.open();
}

// Установка слушателя на кнопку редактирования аватара:

updateAvatarButton.addEventListener('click', handleEditAvatarClick);

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


