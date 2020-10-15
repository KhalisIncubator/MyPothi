import { between } from '@nozbe/watermelondb/QueryDescription'
import { Keyboard } from 'react-native'
import { sub } from 'react-native-reanimated'
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

const updateObject = <ObjectType, Value>( objPath: string, newValue: Value, obj: ObjectType ) => {
  const clonedObj = obj

  const splitPath = objPath.split( '-' )

  splitPath.reduce( ( traversedObj, nextPathKey, indx ) => {
    if ( indx === splitPath.length - 1 ) {
      traversedObj[ nextPathKey ] = newValue
    }
    // @ts-expect-error this is because i swear all these iterators return typeof string as the key, and you cant change it :(
    if( !!traversedObj && traversedObj[ nextPathKey ] ) {
      return traversedObj[ nextPathKey ]
    }
    return traversedObj
  }, clonedObj )
  return clonedObj
}

export { wrapHtml, generatePangteeHtml, generateShabadHtml, updateObject }
