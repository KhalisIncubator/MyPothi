const mapApiValues = ( section: any, classNamePrefix: string ) => {

  let sectionString = ''
  Object.keys( section ).forEach( ( key ) => {
    const value = section[ key ]
    sectionString += !!value ? `<div class="${classNamePrefix}-${key}">${value}</div>` : ''
  } )

  return sectionString
}
const createPangteeHTMl = ( line ) => {
  const { gurmukhi } = line
  const createTranslationHTML = () => {
    const { translation } = line
    return `
      <div class="translations">
        ${mapApiValues( translation.en, 'en' )}
      </div>
    `
  }
  const createTranslitHTML = () => {
    const { transliteration } = line
    return `
      <div class="transliteration">
        ${mapApiValues( transliteration, 'tr' )}
      </div>
    `
  }

  const teekaHTML = () => {
    const { translation: { pu } } = line
    return `<div class="teeka"> 
        ${mapApiValues( pu, 'pu' )}
    </div>`
  }
  return `
   <div class="line">
    <div class="pangtee">
      ${gurmukhi}
    </div>
      ${createTranslationHTML()}
      ${teekaHTML()}
      ${createTranslitHTML()}
   </div>
   `
}

const createShabadHTML = ( shabad ) => {
  const lines = shabad.verses.map( verse => createPangteeHTMl( verse ) ).reduce( ( acc, curr ) => acc += curr, '' )
  return `
  <div class="shabad">
    ${lines}
  </div>
  `

}
export { createPangteeHTMl, createShabadHTML }
