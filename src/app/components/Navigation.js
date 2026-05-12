import GSAP from 'gsap'

import Dots from '@animations/Dots'

import Component from '@classes/Component'

export default class Navigation extends Component {
  constructor({ template }) {
    super({
      element: '.header__nav',
      elements: {
        items: '.header__navList__item',
        links: '.navList__item__link',
        list: '.header__navList',
        indicator: '.header__navIndicator'
      }
    })

    this.dots = new Dots({
      element: this.elements.indicator,
      container: this.element
    })

    this.routes = {
      '/': 0,
      '/products': 1,
      '/about': 2,
      '/contact': 3,
      '/careers': 4
    }

    this.onChange(template, {
      animate: false
    })

    this.addNavigationEventListeners()
  }

  onChange (template, { animate = true } = {}) {
    const index = this.routes[template]
    const link = this.elements.links[index]

    if (!link) return

    this.current = link

    this.elements.links.forEach(element => {
      const isCurrent = element === link

      GSAP.to(element, {
        opacity: isCurrent ? 1 : 0.4,
        duration: animate ? 0.4 : 0,
        ease: 'power2.out',
        overwrite: true
      })

      if (isCurrent) {
        element.setAttribute('aria-current', 'page')
      } else {
        element.removeAttribute('aria-current')
      }
    })

    this.dots.moveTo(link, {
      animate
    })
  }

  onResize() {
    if (!this.current) return

    this.dots.moveTo(this.current, {
      animate: false
    })
  }

  onLinkMouseEnter(event) {
    this.dots.moveTo(event.currentTarget)
  }

  onListMouseLeave() {
    if (!this.current) return

    this.dots.moveTo(this.current)
  }

  addNavigationEventListeners () {
    this.elements.links.forEach(link => {
      link.addEventListener('mouseenter', this.onLinkMouseEnter)
    })

    this.elements.list.addEventListener('mouseleave', this.onListMouseLeave)
  }
}
