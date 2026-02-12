import '@styles/index.scss'
import FontFaceObserver from 'fontfaceobserver'

class App {

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
