export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close-button');

    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

// Приватный метод закрытия по Esc
  _handleEscClose(event) {
    if(event.key === 'Escape') {
      this.close();
    }
  }

  // Метод добавляет слушатель клика иконке закрытия попапа. 
  // Модальное окно также закрывается при клике на 
  // затемнённую область вокруг формы.
  setEventListeners() {
    this._closeButton.addEventListener('click', () => this.close());

    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      } 
    })  
  }
}