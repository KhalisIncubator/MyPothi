import { between } from '@nozbe/watermelondb/QueryDescription'
import { Keyboard } from 'react-native'
/* eslint-disable @typescript-eslint/ban-types */
import { asyncScheduler, ObjectUnsubscribedError } from 'rxjs'
import { RemappedLine, ShabadInfo } from '../index'


const wrapHtml = ( body: string ) => (
  `!DOCTYPE HTML
  <html>
  ` + body + `</html`
)
const generatePangteeHtml = ( accumulator: string, line: RemappedLine, mainLine: string ): string => {
  const { id, Gurbani } = line
  return accumulator.concat(
    `\n
    <div class="padched line-${Gurbani.ascii}-${id}>
      ${Gurbani.ascii}
    </div>
    <div class="padched line-${Gurbani.unicode}-${id}"
      ${Gurbani.unicode}
    </div>
    ` )
}
const generateInfoHtml = ( info: ShabadInfo ) => {
  const { raag, writer, source } = info

  return `<div class="info">${raag}, ${writer}, ${source}</div>`
} 
const generateShabadHtml = ( [ { info }, pangtees ]: [ {info: ShabadInfo}, RemappedLine[]], mainLine: string ): string => {
  const infoHtml = generateInfoHtml( info )

  const pangteeHtml = pangtees.reduce( ( accum, pangtee ) => generatePangteeHtml( accum, pangtee, mainLine ), '' )

  return wrapHtml( `<div class="shabad mainline=${mainLine}>` + infoHtml + pangteeHtml + `</div>` )
}

const updateObject = <ObjectType, Value>( objKey: any, newValue: Value, obj: ObjectType ) => {
  const newObject = obj

  Object.entries( obj ).forEach( ( [ key, value ] ) => {
    if ( key === objKey ) {
      newObject[ key ] = newValue
    } else if ( typeof value === 'object' ) {
      newObject[ key ] = updateObject<typeof obj, typeof newValue>( objKey, newValue, value )
    }
  } )
   
  return newObject
}

export { wrapHtml, generatePangteeHtml, generateShabadHtml, updateObject }