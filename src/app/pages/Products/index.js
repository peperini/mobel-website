import Page from '@classes/Page'

export default class Products extends Page {
  constructor() {
    super({
      id: 'products',

      classes: {
        active: 'products--active'
      },

      element: '.products',
      elements: {
        wrapper: '.products__wrapper',
        navigation: document.querySelector('.navigation')
      }
    })
  }

  async show(url) {
    this.element.classList.add(this.classes.active)
  }

  async hide(url) {
    this.element.classList.remove(this.classes.active)
  }
}
