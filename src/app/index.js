import '@styles/index.scss'

import AutoBind from 'auto-bind'
import NormalizeWheel from 'normalize-wheel';
import each from 'lodash/each'
import FontFaceObserver from 'fontfaceobserver'
import initGUI from './utils/grid-overlay'

import { Detection } from '@classes/Detection';

import Navigation from '@components/Navigation'
import Preloader from '@components/Preloader'
import Transition from '@components/Transition'

import About from '@pages/About'
import Home from '@pages/Home'
import Products from '@pages/Products'

class App {
  constructor() {
    this.template = window.location.pathname

    AutoBind(this)

    Detection.check({
      onErrorWebGL: this.createUnsupportedScreen,
      onSuccess: this.init
    })
  }

  init() {
    this.createPreloader()

    this.createTransitions()
    this.createNavigation()
    this.createPages()

    this.addEventListeners()
    this.addLinkListeners()

    this.onResize();
  }

  createNavigation () {
    this.navigation = new Navigation({
      template: this.template
    })
  }

  createPreloader () {
    this.preloader = new Preloader()

    this.preloader.once('completed', this.onPreloaded)
  }

  createTransitions () {
    this.transition = new Transition()
  }

  createPages () {
    this.about = new About()
    this.products = new Products()
    this.home = new Home()

    this.pages = {
      '/': this.home,
      '/about': this.about,
      '/products': this.products
    }

    this.page = this.pages[this.template]
  }

  createUnsupportedScreen () {
    console.log('WebGL not supported')
  }

  onPreloaded () {
    this.onResize()

    this.update()

    this.page.show()
  }

  onPopState () {
    this.onChange({
      url: window.location.pathname,
      push: false
    })
  }

  async onChange({ url, push = true }) {
    url = url.replace(window.location.origin, '')

    const page = this.pages[url]

    await this.transition.hide({ element: this.page.element })

    if (push) {
      window.history.pushState({}, '', url)
    }

    this.template = window.location.pathname

    this.page.hide()

    this.navigation.onChange(this.template)

    this.page = page
    this.page.show()

    this.onResize();

    this.transition.show({ element: this.page.element })
  }

  onResize () {
    if (this.page && this.page.onResize) {
      this.page.onResize()
    }

    if (this.navigation && this.navigation.onResize) {
      this.navigation.onResize()
    }
  }

  onTouchDown(event) {
    if (this.page && this.page.onTouchDown) {
      this.page.onTouchDown(event)

    }
  }

  onTouchMove(event) {
    if (this.page && this.page.onTouchDown) {
      this.page.onTouchMove(event)
    }
  }

  onTouchUp(event) {
    if (this.page && this.page.onTouchDown) {
      this.page.onTouchUp(event)
    }
  }

  onWheel(event) {
    const normalizeWheel = NormalizeWheel(event)

    if (this.page && this.page.onWheel) {
      this.page.onWheel(normalizeWheel)
    }
  }

  // ———— Loop ———————————————————————————————————————————————————————————————————————————
  update () {
    if (this.page) {
      this.page.update()
    }

    this.frame = window.requestAnimationFrame(this.update)
  }

  addEventListeners () {
    window.addEventListener('popstate', this.onPopState, { passive: true })
    window.addEventListener('resize', this.onResize, { passive: true })

    window.addEventListener('mousedown', this.onTouchDown, { passive: true })
    window.addEventListener('mousemove', this.onTouchMove, { passive: true })
    window.addEventListener('mouseup', this.onTouchUp, { passive: true })

    window.addEventListener('touchstart', this.onTouchDown, { passive: true })
    window.addEventListener('touchmove', this.onTouchMove, { passive: true })
    window.addEventListener('touchend', this.onTouchUp, { passive: true })

    window.addEventListener('wheel', this.onWheel, { passive: true })
  }

  addLinkListeners () {
    const links = document.querySelectorAll('a')

    each(links, link => {
      const isLocal = link.href.indexOf(window.location.origin) > -1;
      const isAnchor = link.href.indexOf('#') > -1;

      const isNotEmail = link.href.indexOf('mailto') === -1;
      const isNotPhone = link.href.indexOf('tel') === -1;

      if (isLocal) {
        link.onclick = event => {
          event.preventDefault();

          if (!isAnchor) {
            this.onChange({
              url: link.href
            })
          }
        }
      } else if (isNotEmail && isNotPhone) {
        link.rel = 'noopener';
        link.target = '_blank';
      }
    })
  }
}

const fontMontreal = new FontFaceObserver('pp_neue_montreal')
const fontAntiPol = new FontFaceObserver('antipol_extended')
const timeout = 2000

Promise.all([fontMontreal.load(null, timeout), fontAntiPol.load(null, timeout)])
  .then(() => {
    window.APP = new App()
  })
  .catch(() => {
    window.APP = new App()
  })

console.log(
  '%c Design and Code by José Félix - https://josefelix.co/',
  'background: #000; color: #fff;',
)
