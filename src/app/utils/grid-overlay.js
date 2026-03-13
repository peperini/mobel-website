import GUI from 'lil-gui';

export const initGUI = () => {
    // Only run in development
    if (import.meta.env?.PROD) return

    // GUI
    const gui = new GUI();
    const config = { toggle: false }

    // Create Overlay
    const cols = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--grid-cols')
    )
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);
    overlay.innerHTML = Array(cols).fill('<span></span>').join('')

    // G Keydown
    window.addEventListener('keydown', e => {
        if (e.key.toLowerCase() === 'g') {
            config.toggle = !config.toggle
            overlay.classList.toggle('show', config.toggle)
            gui.controllers.forEach(c => c.updateDisplay())
        }
    })
    gui.add(config, 'toggle').onChange(val => {
        overlay.classList.toggle('show', val);
    }).name('Grid Overlay')
}
