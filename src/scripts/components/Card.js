export default class Card {
  constructor (data, selector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;

    this._handleCardClick = handleCardClick;
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


  // наполнили разметку данными
  _setData() {
    this._newCard.querySelector('.place__title').textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
  }

  _handleClickLike() {
    this._placeLikeButton
    .classList.toggle('place__like-button_active');
  }

  _handleClickDelete() {
    this._newCard.remove();
  }

  _setListeners() {
    this._placeLikeButton.addEventListener('click', () => this._handleClickLike());

    const placeDeleteButton = this._newCard.querySelector('.place__delete-button');
    placeDeleteButton.addEventListener('click', () => this._handleClickDelete());

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });
  }

  generateCard() {
    this._newCard = this._getTemplate();
    this._cardImage = this._newCard.querySelector('.place__image');
    this._placeLikeButton = this._newCard.querySelector('.place__like-button');
    
    this._setData();
    this._setListeners();

    return this._newCard;
  }
}