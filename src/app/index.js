import '@styles/index.scss'

import AutoBind from 'auto-bind'
import FontFaceObserver from 'fontfaceobserver'
import initGUI from './utils/grid-overlay'

import { Detection } from '@classes/Detection';

import Navigation from '@components/Navigation'

import About from '@pages/About'
import Home from '@pages/Home'
import Products from '@pages/Products'

class App {
  constructor() {
    this.template = window.location.pathname

    if (import.meta.env.DEV && window.location.search.indexOf('fps') > -1) {
      this.createStats()
    }

    this.mouse = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    }

    AutoBind(this)

    Detection.check({
      onErrorWebGL: this.createUnsupportedScreen,
      onSuccess: this.init
    })
  }

  init () {
    this.createNavigation()

    this.createPages()
    this.gui()
  }

  createNavigation() {
    this.navigation = new Navigation({
      template: this.template,
    })
  }

  gui () {
    initGUI()
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
