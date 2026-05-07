import Page from '@classes/Page'

export default class About extends Page {
  constructor() {
    super({
      id: 'about',

      classes: {
        active: 'about--active'
      },

      element: '.about',
      elements: {
        wrapper: '.about__wrapper',

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
