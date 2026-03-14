import GUI from 'lil-gui';

export default () => {
    // Only run in development
    if (import.meta.env?.PROD) return

    // GUI
    const gui = new GUI();
    const config = { toggle: false }

    // Inject overlay styles
    const style = document.createElement('style')
    style.textContent = /* CSS */ `
      .overlay { display: none; }
      .overlay.show {
        display: grid;
        pointer-events: none;
        z-index: 9999;
        position: fixed;
        inset: 0;
        grid-template-columns: repeat(var(--grid-cols), var(--grid-cols-size));
        gap: var(--grid-cols-gap);
        padding: var(--grid-padding);
      }
      .overlay span {
        display: block;
        inline-size: 100%;
        block-size: auto;
        background-color: rgba(255, 0, 0, 0.1);
      }
    `
    document.head.appendChild(style)

    // Create Overlay
    const getColsCount =  () => parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--grid-cols')
    )

    let cols = getColsCount()
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);
    overlay.innerHTML = Array(cols).fill('<span></span>').join('')

    window.addEventListener('resize', () => {
      const newCols = getColsCount()
      if (newCols !== cols) {
        cols = newCols
        overlay.innerHTML = Array(cols).fill('<span></span>').join('')
      }
    })

    // G,H Keydown
    window.addEventListener('keydown', e => {
        if (e.key.toLowerCase() === 'g') {
            config.toggle = !config.toggle
            overlay.classList.toggle('show', config.toggle)
            gui.controllers.forEach(c => c.updateDisplay())
        }

        if (e.key.toLowerCase() === 'h') {
          gui.show( gui._hidden );
          console.log(gui);

        }
    })
    gui.add(config, 'toggle').onChange(val => {
        overlay.classList.toggle('show', val);
    }).name('Grid Overlay')

    gui.hide();
}
