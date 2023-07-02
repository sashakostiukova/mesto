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

const AddPlaceButton = document.querySelector('.add-button');
const popupAddPlace = document.querySelector('.popup-add-place');
const AddPlaceForm = document.querySelector('.add-place-form');
const inputTitle = popupAddPlace.querySelector('.popup__input_type_title');
const inputLink = popupAddPlace.querySelector('.popup__input_type_link');

const popupImageView = document.querySelector('.popup-imageview');
const popupImageViewImg = document.querySelector('.popup-imageview__img');
console.log(popupImageViewImg);
const popupImageViewCaption = document.querySelector('.popup-imageview__caption');

const initialCards = [
  {
    title: 'Дагестан',
    link: './images/places/dagestan.jpg'
  },
  {
    title: 'Гора Эльбрус',
    link: './images/places/elbrus.jpg'
  },
  {
    title: 'Домбай',
    link: './images/places/dombay.jpg'
  },
  {
    title: 'Башкортостан',
    link: './images/places/bashkortostan.jpg'
  },
  {
    title: 'Остров Итуруп',
    link: './images/places/iturup.jpg'
  },
  {
    title: 'Карачаево-Черкессия',
    link: './images/places/karachayevsk.jpg'
  }
]; 

//editProfileButton.addEventListener('click', () => openPopup(popupEditProfile));
function openPopup (popupElement) {
  popupElement.classList.toggle('popup_opened');
};

function closePopup (popupElement) {
  popupElement.classList.toggle('popup_opened');
};

function editProfileFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(popupEditProfile);
}

function AddPlaceFormSubmit (evt) {
  evt.preventDefault();
  const title = inputTitle.value;
  const link = inputLink.value;
  const placeCard = createPlaceCard({title, link});
  placesContainer.prepend(placeCard);
  closePopup(popupAddPlace);
}


const createPlaceCard = ({title, link}) => {
  const clone = template.content.cloneNode(true);
  const placeCard = clone.querySelector('.place');
  placeCard.querySelector('.place__title').textContent = title;
  placeCard.querySelector('.place__image').alt = title;
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
    popupImageViewImg.alt = title;
    popupImageViewCaption.textContent = title;

  })

  return placeCard;

}

initialCards.forEach((item) => {
  const placeCard = createPlaceCard(item);
  placesContainer.append(placeCard);
});

editProfileButton.addEventListener('click', () => {
  openPopup(popupEditProfile); 
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
});

popupCloseButtons[0].addEventListener('click', () => {
  closePopup(popupEditProfile);
});

editProfileForm.addEventListener('submit', editProfileFormSubmit);

AddPlaceButton.addEventListener('click', () => {
  openPopup(popupAddPlace);
  inputTitle.value = null;
  inputLink.value = null;
});

popupCloseButtons[1].addEventListener('click', () => {
  closePopup(popupAddPlace);
});

AddPlaceForm.addEventListener('submit', AddPlaceFormSubmit);

popupCloseButtons[2].addEventListener('click', () => {
  closePopup(popupImageView);
});
