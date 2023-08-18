
// Класс UserInfo отвечает за управление отображением информации о 
// пользователе на странице. 

// Этот класс:
// Принимает в конструктор объект с селекторами двух элементов: 
// элемента имени пользователя и элемента информации о себе.
export default class UserInfo {
  constructor(nameSelector, descriptionSelector) {
    this._name = document.querySelector(nameSelector);
    this._description = document.querySelector(descriptionSelector);
  }

// публичный метод, который возвращает объект 
// с данными пользователя.
  getUserInfo() {
    const userData = {};
    userData.name = this._name.textContent;
    userData.description = this._description.textContent;
 
    return userData;
  }

// публичный метод, который принимает 
// новые данные пользователя и добавляет их на страницу.
  setUserInfo({name, description}) {
    this._name.textContent = name;
    this._description.textContent = description;
  }
}





