export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = containerSelector;
  }

  renderItems(items, viewerId) {
    items?.forEach((item) => {
      this._renderer(item, viewerId);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
