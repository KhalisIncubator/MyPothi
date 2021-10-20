import { BaniResponse, BaniVerse, RemappedVerse, ShabadResponse, Verse, VerseElement } from "types/BanidbApi"

const remapVerse = ( line: Verse | BaniVerse ): RemappedVerse => {
  const { verseId: verseID, verse, translation, transliteration, visraam } = line

  const punjabiTranslationAscii: {[key in keyof typeof translation.pu]?: string} = {}

  Object.keys( translation.pu ).forEach( ( key ) => {
    const translationKey = key as keyof typeof translation.pu
    punjabiTranslationAscii[ translationKey ] = translation.pu[ translationKey ].gurmukhi
  } )

  return {
    verseID,
    gurmukhi: verse.gurmukhi,
    translation: {
      ...translation,
      pu: {
        ...punjabiTranslationAscii

      }
    },
    transliteration: {
      ...transliteration,
      english: null,
      hindi: null,
      ipa: null
    },
    visraam,
  }
}
export const remapShabad = ( shabad: ShabadResponse ): RemappedVerse[] => {
  return shabad.verses.map( remapVerse )
}
const remapBaniVerse = ( verseObj: VerseElement ): RemappedVerse => {
  const { verse } = verseObj
  return remapVerse( verse )
}
export const remapBani = ( bani: BaniResponse ): RemappedVerse[] => {
  return bani.verses.map( remapBaniVerse )
}