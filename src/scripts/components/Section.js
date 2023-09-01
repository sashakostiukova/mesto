export default class Section {
  constructor({ renderer }, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  renderItems(data) {
    data.forEach((item) => {
      this._renderer(item);
    });
  }

  // публичный метод, который принимает DOM-элемент
  // и добавляет его в конец контейнера
  appendItem(elem) {
    this._container.append(elem);
  }

  // публичный метод, который принимает DOM-элемент
  // и добавляет его в начало контейнера
  prependItem(elem) {
    this._container.prepend(elem);
  }
}
