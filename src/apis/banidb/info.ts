import { BaniResponse, RemappedInfo, ShabadResponse } from "types/BanidbApi"

export const getShabadInfo = ( shabad: ShabadResponse ): RemappedInfo => {
  const { shabadInfo, verses } = shabad
  const { shabadId, shabadName, pageNo, source, raag, writer } = shabadInfo

  return {
    shabadID: shabadId,
    shabadName: verses.find( verse => verse.verseId === shabadName )?.verse?.gurmukhi ?? verses[ 0 ].verse.gurmukhi,
    ang: pageNo,
    source: {
      id: source.sourceId,
      name: source.gurmukhi
    },
    raag: {
      id: raag.raagId,
      name: raag.gurmukhi,
    },
    writer: {
      id: writer.writerId,
      name: writer.gurmukhi
    },
  }
}

export const getBaniInfo = ( bani: BaniResponse ): RemappedInfo => {
  const { baniInfo: { baniID, gurmukhi, source, raag, writer } } = bani

  return {
    baniID,
    baniName: gurmukhi,
    ang: source.pageNo,
    source: {
      id: source.sourceId,
      name: source.gurmukhi
    },
    raag: {
      id: raag.raagId,
      name: raag.gurmukhi,
    },
    writer: {
      id: writer.writerId,
      name: writer.gurmukhi
    }
  }
}