const editProfileButton = document.querySelector('.profile__edit-button');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');
const popupEditProfile = document.querySelector('.popup-edit-profile');

const editProfileForm = popupEditProfile.querySelector('.edit-profile-form');
const inputName = popupEditProfile.querySelector('.popup__input_type_name');
const inputDescription = popupEditProfile.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const template = document.querySelector('.place-template');
const placesContainer = document.querySelector('.places');

const addPlaceButton = document.querySelector('.add-button');
const popupAddPlace = document.querySelector('.popup-add-place');
const addPlaceForm = document.querySelector('.add-place-form');
const inputTitle = popupAddPlace.querySelector('.popup__input_type_title');
const inputLink = popupAddPlace.querySelector('.popup__input_type_link');

const popupImageView = document.querySelector('.popup-imageview');
const popupImageViewImg = document.querySelector('.popup-imageview__img');
const popupImageViewCaption = document.querySelector('.popup-imageview__caption');

function openPopup (popupElement) {
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

function closePopupByEsc (event) {
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
  const placeCard = createPlaceCard({name, link});
  placesContainer.prepend(placeCard);
  closePopup(popupAddPlace);
};

const createPlaceCard = ({name, link}) => {
  const clone = template.content.cloneNode(true);
  const placeCard = clone.querySelector('.place');
  placeCard.querySelector('.place__title').textContent = name;
  placeCard.querySelector('.place__image').alt = name;
  placeCard.querySelector('.place__image').src = link;

  const placeLikeButton = placeCard.querySelector('.place__like-button');
  placeLikeButton.addEventListener('click', () => {
    placeLikeButton.classList.toggle('place__like-button_active');
  });

  const placeDeleteButton = placeCard.querySelector('.place__delete-button');
  placeDeleteButton.addEventListener('click', () => {
    placeCard.remove();
  });

  const placeImage = placeCard.querySelector('.place__image');
  placeImage.addEventListener('click', () => {
    openPopup(popupImageView);
    popupImageViewImg.src = link;
    popupImageViewImg.alt = name;
    popupImageViewCaption.textContent = name;
  })

  return placeCard;
};

initialCards.forEach((item) => {
  const placeCard = createPlaceCard(item);
  placesContainer.append(placeCard);
});

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