import GSAP from 'gsap'
import each from 'lodash/each'

import Component from '@classes/Component'

export default class Preloader extends Component {
  constructor() {
    super({
      element: '.preloader',
      elements: {
        media: '.preloader__media',
        img: '.preloader__media__img'
      }
    })

    this.createLoader()
  }

  createLoader () {
    this.onAssetLoaded();
  }

  onAssetLoaded () {
    setTimeout(() => {
      this.onLoaded()
    }, 1000)
  }

  onLoaded () {
    return new Promise(() => {
      this.emit('completed')

      this.animateOut = GSAP.timeline({
        delay: 1,
      });

      this.animateOut.to(this.element, {
        autoAlpha: 0,
        duration: 1
      })

      this.animateOut.call(() => {
        this.destroy()
      })
    })
  }

  destroy () {
    this.element.parentNode.removeChild(this.element)
  }
}
