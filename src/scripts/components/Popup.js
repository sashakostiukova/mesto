export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close-button');
  }

//публичный метод отвечающий
//  за открытие попапа
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }

//публичный метод отвечающий
// за закрытие попапа
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  }

//приватный метод закрытия по Esc
  _handleEscClose(event) {
    if(event.key === 'Escape') {
      this.close();
    }
  }

  //добавляет слушатель клика иконке 
  // закрытия попапа. Модальное окно 
  // также закрывается при клике на 
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