import Page from '@classes/Page'

export default class Home extends Page {
  constructor() {
    super({
      id: 'home',

      classes: {
        active: 'home--active',
      },

      element: '.home',
      elements: {
        wrapper: '.home__wrapper',

        navigation: document.querySelector('.navigation'),
      }
    })
  }

  create () {
    super.create()
  }

  async show(url) {
    this.element.classList.add(this.classes.active)
  }

  async hide(url) {
    this.element.classList.remove(this.classes.active)
  }

  onResize () {
    super.onResize()
  }

  update() {
    super.update()
  }

  // ———— Destroy ———————————————————————————————————————————————————————————————————————————
  destroy() {
    super.destroy()
  }
}
