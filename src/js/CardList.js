export default class CardList {
  /**
   * Это конструктор класса, в него мы передаем ссылку на список,
   * изначальный массив и функцию создания карточки
   */
  constructor(container, api, createCardFunction) {
    this.container = container;
    this.api = api;
    this.createCardFunction = createCardFunction;
  }

  // тут просто добавляем карточку, вызываем переданную функцию в конструктор
  addCard(name, link) {
    const card = this.createCardFunction(name, link);

    this.container.appendChild(card);
  }

  render() {
    this.api
      .getCards()
      .then((res) => {
        res.forEach((item) => {
          this.addCard(item.name, item.link);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
