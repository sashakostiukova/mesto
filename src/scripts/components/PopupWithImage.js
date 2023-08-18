import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, {name, link}) {
    super(popupSelector);

    this._name = name;
    this._link = link;

    this._imgElement = this._popup.querySelector('.popup-imageview__img');
    this._captionElement = this._popup.querySelector('.popup-imageview__caption');
  }

// вставляем в попап картинку с src изображения и 
// подписью к картинке.
  open() {
    this._imgElement.src = this._link;
    this._imgElement.alt = this._name;
    this._captionElement.textContent = this._name;

    super.setEventListeners();
    super.open();
  }
}