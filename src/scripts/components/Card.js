export default class Card {
  constructor (data, selector, handleCardClick, openDeletePopup, handleClickLike, userId) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._selector = selector;

    this.cardId = data._id;
    this._ownerId = data.owner._id;
    
    this.userId = userId;

    this.openDeletePopup = openDeletePopup;
    this._handleCardClick = handleCardClick;
    this._handleClickLike = handleClickLike;
  }

  // получили разметку
  _getTemplate() {
    const cardElement = document
      .querySelector(this._selector)
      .content
      .querySelector('.place')
      .cloneNode(true);

    return cardElement;  
  }

  // проверили наличие лайка пользователя
  isLiked() {
    if(this._likes.some((like) => like._id === this.userId)) {
      this.isLiked = true;
      this.placeLikeButton
      .classList.add('place__like-button_active');
    }  else {

      this.isLiked = false;
    }
  }

  // наполнили разметку данными
  _setData() {
    this.newCard.querySelector('.place__title').textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
    if (this._likes.length > 0) {
      this.newCard.querySelector('.place__likes-counter').textContent = this._likes.length;
    };
    this.isLiked();
  }

  handleClickDelete() {
    this.newCard.remove();
    this.newCard = null;
  }

  _setListeners() {
    this.placeLikeButton.addEventListener('click', () => this._handleClickLike(this));

    if (this._ownerId === this.userId) {
      this._placeDeleteButton .addEventListener('click', () => this.openDeletePopup(this));
    }

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });
  }

  generateCard() {
    this.newCard = this._getTemplate();
    this._cardImage = this.newCard.querySelector('.place__image');
    this.placeLikeButton = this.newCard.querySelector('.place__like-button');
    this._placeDeleteButton = this.newCard.querySelector('.place__delete-button');

    if (this._ownerId === this.userId) {
      this._placeDeleteButton.classList.add('place__delete-button_active')
      this._placeDeleteButton.disabled = false;
    }

    this._setData();
    this._setListeners();

    return this.newCard;
  }
}