/* import Component from '@classes/Component' */

export default class Navigation {
  constructor({ template }) {
    super({
      element: '.header__nav',
      elements: {
        items: '.header__navList__item',
        links: '.navList__item__link'
      }
    })


  }
}
