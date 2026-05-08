import GSAP from 'gsap'

export default class Dots {
  constructor({ element, container, offset = 6}) {
    this.element = element
    this.container = container
    this.offset = offset
    this.hasMoved = false

    GSAP.set(this.element, {
      autoAlpha: 0,
      xPercent: -50
    })
  }

  getBounds(link) {
    const linkBounds = link.getBoundingClientRect()
    const containerBounds = this.container.getBoundingClientRect()

    return {
      x: linkBounds.left - containerBounds.left + linkBounds.width / 2,
      y: linkBounds.bottom - containerBounds.top + this.offset
    }
  }

  moveTo (link, { animate = true } = {}) {
    if (!link || !this.element || !this.container) return

    const { x, y } = this.getBounds(link)

    const options = {
      autoAlpha: 1,
      x,
      y,
      duration: this.hasMoved && animate ? 0.4 : 0,
      ease: 'power4.out',
      overwrite: true
    }

    this.hasMoved = true

    GSAP.to(this.element, options)
  }
}
