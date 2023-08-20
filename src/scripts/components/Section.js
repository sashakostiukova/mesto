export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._renderedItems = items;
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

//  публичный метод, который отвечает за отрисовку
//  всех элементов. Отрисовка каждого отдельного
//  элемента должна осуществляться функцией renderer.
  renderItems() {
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }

// публичный метод, который принимает DOM-элемент
// и добавляет его в контейнер.
  addItem(elem) {
    this._container.append(elem);
  }

}