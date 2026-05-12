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
        products: '.home__products',
        productsPin: '.home__products__pin',
        productsSlider: '.home__products__slider',
        productsSliderTrack: '.home__products__slider__track',

        navigation: document.querySelector('.navigation'),
      }
    })
  }

  create () {
    super.create()
    this.updateProductsMetrics()
  }

  async show(url) {
    this.element.classList.add(this.classes.active)
  }

  async hide(url) {
    this.element.classList.remove(this.classes.active)
  }

  onResize () {
    super.onResize()
    window.requestAnimationFrame(this.updateProductsMetrics)
  }

  update() {
    super.update()
    this.updateProducts()
  }

  updateProductsMetrics() {
    if (!this.elements.products || !this.elements.productsSliderTrack) return

    const sliderTravel = Math.max(
      0,
      this.elements.productsSliderTrack.scrollHeight - this.elements.productsSlider.clientHeight
    )

    this.products = {
      start: this.elements.products.offsetTop,
      travel: sliderTravel,
      end: this.elements.products.offsetTop + sliderTravel
    }

    this.elements.products.style.setProperty(
      '--home-products-height',
      `${window.innerHeight + sliderTravel}px`
    )

    this.scroll.limit = this.elements.wrapper.clientHeight - window.innerHeight
  }

  updateProducts() {
    if (!this.products || !this.elements.products) return

    const progress = Math.min(
      Math.max(this.scroll.current - this.products.start, 0),
      this.products.travel
    )

    this.elements.products.style.setProperty('--home-products-pin-y', `${progress}px`)
    this.elements.products.style.setProperty('--home-products-slider-y', `${progress}px`)
  }

  // ———— Destroy ———————————————————————————————————————————————————————————————————————————
  destroy() {
    super.destroy()
  }
}
