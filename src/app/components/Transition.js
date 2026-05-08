import GSAP from 'gsap'

export default class Transition {
  constructor() {

  }

  hide ({ element }) {
    this.element = element

    return new Promise(resolve => {
      GSAP.to(this.element, {
        opacity: 0,
        ease: 'expo.in',
        duration: 0.5,
        onComplete: resolve
      })
    })
  }

  show ({ element }) {
    this.element = element

    return new Promise(resolve => {
      GSAP.to(this.element, {
        opacity: 1,
        ease: 'expo.out',
        duration: 0.5,
        onComplete: resolve
      })
    })
  }
}
