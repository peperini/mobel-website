import GSAP from 'gsap'
import each from 'lodash/each'

import Component from '@classes/Component'

const config = {
  steps: 6,
  stepDuration: 0.45,
  stepInterval: 0.08,
  moverPauseBeforeExit: 0.5,
  mediaDuration: 2.15,
  mediaStagger: 0.035,
  revealEase: 'sine.inOut',
  mediaEase: 'expo.inOut'
}

export default class Preloader extends Component {
  constructor() {
    super({
      element: '.preloader',
      elements: {
        medias: '.preloader__media',
        imgs: '.preloader__media__img',
      }
    })

    this.loaded = 0
    this.revealed = 0

    this.createLoader()
  }

  createLoader () {
    this.medias = this.toArray(this.elements.medias)
    this.imgs = this.toArray(this.elements.imgs)
    this.targetMedias = this.toArray(document.querySelectorAll('.hero__gallery__media'))
    this.assets = this.getAssets()

    GSAP.set(this.medias, {
      clipPath: 'inset(100% 0% 0% 0%)',
      zIndex: index => index + 1
    })

    GSAP.set(this.targetMedias, {
      autoAlpha: 0
    })

    if (!this.assets.length) {
      this.onLoaded()
      return
    }

    each(this.assets, asset => {
      this.loadAsset(asset).then(this.onAssetLoaded)
    })
  }

  onAssetLoaded () {
    this.loaded += 1

    const percent = this.loaded / this.assets.length
    const visibleCount = Math.ceil(percent * this.medias.length)

    this.revealMedias(visibleCount)

    if (this.loaded === this.assets.length) {
      this.onLoaded()
    }
  }

  onLoaded () {
    this.emit('completed')

    if (!this.shouldTransitionToHero()) {
      this.fadeOut()
      return
    }

    window.requestAnimationFrame(() => {
      this.transitionToHero()
    })
  }

  revealMedias (visibleCount) {
    while (this.revealed < visibleCount) {
      const media = this.medias[this.revealed]

      GSAP.to(media, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 0.35,
        ease: 'sine.out',
      })

      this.revealed += 1
    }
  }

  transitionToHero () {
    const fragment = document.createDocumentFragment()
    const timeline = GSAP.timeline({
      delay: 0.25,
      onComplete: () => {
        this.destroy()
      }
    })

    each(this.medias, (media, index) => {
      const target = this.targetMedias[index]
      const img = media.querySelector('img')

      if (!target || !img) return

      const startRect = media.getBoundingClientRect()
      const endRect = target.getBoundingClientRect()
      const path = this.generateMotionPath(startRect, endRect, config.steps)
      const clipPaths = this.getClipPaths(startRect, endRect)
      const delay = index * config.mediaStagger
      const firstMoverStart = delay + config.stepInterval
      const firstMoverExitStart = firstMoverStart + config.stepDuration + config.moverPauseBeforeExit
      const lastMoverStart = delay + path.length * config.stepInterval
      const lastMoverExitStart = lastMoverStart + config.stepDuration + config.moverPauseBeforeExit

      GSAP.set(media, {
        position: 'fixed',
        left: startRect.left,
        top: startRect.top,
        width: startRect.width,
        height: startRect.height,
        margin: 0,
        x: 0,
        y: 0,
        zIndex: 100 + index
      })

      timeline.to(media, {
        clipPath: clipPaths.from,
        duration: config.stepDuration,
        ease: config.revealEase
      }, firstMoverExitStart - config.stepInterval)

      each(path, (step, stepIndex) => {
        const mover = document.createElement('span')

        mover.className = 'preloader__mover'

        GSAP.set(mover, {
          backgroundImage: `url(${img.currentSrc || img.src})`,
          left: step.left,
          top: step.top,
          width: step.width,
          height: step.height,
          clipPath: clipPaths.from,
          zIndex: 100 + index
        })

        fragment.appendChild(mover)

        const moverTimeline = GSAP.timeline()

        moverTimeline
          .fromTo(mover, {
            clipPath: clipPaths.hide
          }, {
            clipPath: clipPaths.reveal,
            duration: config.stepDuration,
            ease: config.revealEase
          })
          .to(mover, {
            clipPath: clipPaths.from,
            duration: config.stepDuration,
            ease: config.revealEase
          }, `+=${config.moverPauseBeforeExit}`)

        timeline.add(moverTimeline, delay + (stepIndex + 1) * config.stepInterval)
      })

      const targetMover = document.createElement('span')
      targetMover.className = 'preloader__mover'

      GSAP.set(targetMover, {
        backgroundImage: `url(${img.currentSrc || img.src})`,
        left: endRect.left,
        top: endRect.top,
        width: endRect.width,
        height: endRect.height,
        clipPath: clipPaths.hide,
        zIndex: 100 + index
      })

      fragment.appendChild(targetMover)

      timeline.fromTo(targetMover, {
        clipPath: clipPaths.hide
      }, {
        clipPath: clipPaths.reveal,
        duration: config.stepDuration,
        ease: config.revealEase,
        onStart: () => {
          GSAP.set(target, {
            autoAlpha: 1,
            clipPath: clipPaths.reveal
          })
        }
      }, delay + lastMoverStart)

      timeline.to(media, {
        autoAlpha: 0,
        duration: 0.01
      }, delay + config.mediaDuration)
    })

    this.element.appendChild(fragment)

    timeline.to(this.element, {
      autoAlpha: 0,
      duration: 0.65,
      ease: 'sine.inOut'
    }, '>-0.1')
  }

  fadeOut () {
    this.animateOut = GSAP.timeline({
      delay: 0.4,
      onComplete: () => {
        this.destroy()
      }
    })

    this.animateOut.to(this.element, {
      autoAlpha: 0,
      duration: 1
    })
  }

  getAssets () {
    const sources = this.imgs.map(img => img.currentSrc || img.src).filter(Boolean)

    return [...new Set(sources)]
  }

  loadAsset (src) {
    return new Promise(resolve => {
      const image = new Image()

      image.onload = resolve
      image.onerror = resolve
      image.src = src
    })
  }

  shouldTransitionToHero () {
    return window.location.pathname === '/' &&
      this.medias.length &&
      this.medias.length === this.targetMedias.length
  }

  generateMotionPath (startRect, endRect, steps) {
    const path = []
    const fullSteps = steps + 2

    const startCenter = {
      x: startRect.left + startRect.width / 2,
      y: startRect.top + startRect.height / 2
    }

    const endCenter = {
      x: endRect.left + endRect.width / 2,
      y: endRect.top + endRect.height / 2,
    }

    for (let i = 0; i < fullSteps; i++) {
      const t = i / (fullSteps - 1)
      const width = this.lerp(startRect.width, endRect.width, t)
      const height = this.lerp(startRect.height, endRect.height, t)
      const centerX = this.lerp(startCenter.x, endCenter.x, t)
      const centerY = this.lerp(startCenter.y, endCenter.y, t)

      path.push({
        left: centerX - width / 2,
        top: centerY - height / 2,
        width,
        height
      })
    }

    return path.slice(1, -1)
  }

  getClipPaths (startRect, endRect) {
    const startX = startRect.left + startRect.width / 2
    const startY = startRect.top + startRect.height / 2
    const endX = endRect.left + endRect.width / 2
    const endY = endRect.top + endRect.height / 2

    const deltaX = endX - startX
    const deltaY = endY - startY

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      return deltaX > 0
        ? {
          from: 'inset(0% 0% 0% 100%)',
          reveal: 'inset(0% 0% 0% 0%)',
          hide: 'inset(0% 100% 0% 0%)'
        } : {
          from: 'inset(0% 100% 0% 0%)',
          reveal: 'inset(0% 0% 0% 0%)',
          hide: 'inset(0% 0% 0% 100%)'
        }
    }

    return deltaY > 0
      ? {
        from: 'inset(100% 0% 0% 0%)',
        reveal: 'inset(0% 0% 0% 0%)',
        hide: 'inset(0% 0% 100% 0%)'
      } : {
        from: 'inset(0% 0% 100% 0%)',
        reveal: 'inset(0% 0% 0% 0%)',
        hide: 'inset(100% 0% 0% 0%)'
      }
  }

  lerp (start, end, t) {
    return start + (end - start) * t
  }

  toArray (entry) {
    if (!entry) return []

    return entry instanceof window.HTMLElement ? [entry] : [...entry]
  }

  destroy () {
    this.element.parentNode.removeChild(this.element)
  }
}
