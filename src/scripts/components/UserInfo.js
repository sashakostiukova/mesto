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
    return {
      name: this._name.textContent,
      description: this._description.textContent,
    };
  }

// публичный метод, который принимает 
// новые данные пользователя и добавляет их на страницу.
  setUserInfo(data) {
    this._name.textContent = data.name;
    this._description.textContent = data.description;
    this.id = data._id;
  }
}





