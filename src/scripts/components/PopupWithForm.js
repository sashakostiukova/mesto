import Popup from "./Popup";
import { formValidators } from '../utils/constants.js'

// Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._formElement.querySelectorAll('.popup__input'));

  }

// приватный метод, который собирает данные всех 
// полей формы.
  _getInputValues() {
    const inputsData = {};
    this._inputList.forEach((elem) => {
      inputsData[elem.name] = elem.value;
    });
    return inputsData;
  }

// Перезаписывает родительский метод setEventListeners. 
// Метод не только добавляет обработчик клика иконке
//  акрытия, но и добавляет обработчик сабмита формы.
  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      
      this._handleFormSubmit(this._getInputValues());
      }
    );
  }

// Перезаписывает родительский метод close, так как при закрытии 
// попапа форма должна ещё и сбрасываться.
  close() {
    super.close();
  }
}