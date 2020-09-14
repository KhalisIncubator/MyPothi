/* eslint-disable @typescript-eslint/ban-types */
import { RemappedLine } from './index'

const generateHTML = ( [ { info }, lines ]: [any, RemappedLine[]], mainLine: string ) => {

  const { raag, writer, source } = info
  const initialHTML = `
  <div class="info">
  ${raag}, ${writer}, ${source}
  </div>
  `
  const shabadHTML: string = lines.reduce( ( accumulator, line ) => {
    const { id, Gurbani, Translations, Transliteration } = line
    return accumulator.concat(
    `\n
    <div class="padched line-${Gurbani.ascii}-${id} main=${mainLine}"
      ${Gurbani.ascii}
    </div>
    <div class="padched line-${Gurbani.ascii}-${id} main=${mainLine}"
      ${Gurbani.ascii}
    </div>

    ` )
 }, '' )


 return initialHTML.concat( `<div class="shabad-mainline-${mainLine}"> ${shabadHTML} </div>` )
}
