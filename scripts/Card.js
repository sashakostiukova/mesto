import { closePopupByEsc, openPopup } from './index.js';

export default class Card {
  constructor (data, selector) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._selector)
      .content
      .querySelector('.place')
      .cloneNode(true);

    return cardElement;  
  }

  _setData() {
    this._newCard.querySelector('.place__title').textContent = this._name;
    this._newCard.querySelector('.place__image').alt = this._name;
    this._newCard.querySelector('.place__image').src = this._link;
  }

  _handleClickLike() {
    this._newCard.querySelector('.place__like-button')
    .classList.toggle('place__like-button_active');
  }

  _handleClickDelete() {
    this._newCard.remove();
  }

  _handleClickOpen() {
    const popup = document.querySelector('.popup-imageview');
    openPopup(popup);

    document.querySelector('.popup-imageview__img').src = this._link;
    document.querySelector('.popup-imageview__img').alt = this._name;
    document.querySelector('.popup-imageview__caption').textContent = this._name;

    document.addEventListener('keydown', closePopupByEsc);
  }

  _setListeners() {
    const placeLikeButton = this._newCard.querySelector('.place__like-button');
    placeLikeButton.addEventListener('click', () => this._handleClickLike());

    const placeDeleteButton = this._newCard.querySelector('.place__delete-button');
    placeDeleteButton.addEventListener('click', () => this._handleClickDelete());

    const placeImage = this._newCard.querySelector('.place__image');
    placeImage.addEventListener('click', () => this._handleClickOpen());
  }

  generateCard() {
    this._newCard = this._getTemplate();
    this._setData();
    this._setListeners();

    return this._newCard;
  }
}