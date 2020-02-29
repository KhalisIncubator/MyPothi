import { buildApiUrl } from '@sttm/banidb';

const remapLine = raw => {
  const Line = Object.assign(raw, {});
  Line.id = raw.id;
  Line.sID = raw.shabadId;
  Line.Gurbani = {
    ascii: raw.verse.gurmukhi,
    unicode: raw.verse.unicode
  };
  Line.Translations = {
    English: raw.translation.en.bdb,
    Punjabi: {
      SS: raw.translation.pu.ss.gurmukhi,
      FT: raw.translation.pu.ft.gurmukhi
    },
    Spanish: raw.translation.es.sn
  };
  Line.Transliteration = {
    English: raw.transliteration.en,
    Hindi: raw.transliteration.hi
  };
  Line.Vishraams = {
    sttm: raw.visraam.sttm,
    ig: raw.visraam.igurbani,
    sttm2: raw.visraam.sttm2
  };
  return Line;
};
const query = async (search: string, type: number) => {
  const API_URL = "https://api.banidb.com/v2/";
  const results = 50;
  const shabads = [];
  if (search !== "") {
    const q = search;
    const url = encodeURI(buildApiUrl({ q, type, results, API_URL }));
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          data.verses.forEach(shabad => {
            shabads.push(shabad)
          });
          resolve(shabads);
        })
        .catch(err => reject(err));
    })
  }
}

const loadShabad = async (id: number) => {
  const API_URL = "https://api.banidb.com/v2/";
  const url = encodeURI(buildApiUrl({ id, API_URL }));
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const remapped = [];
        data.verses.forEach(pg => {
          remapped.push(remapLine(pg));
        });
        resolve(remapped);
      })
      .catch(err => reject(err));
  })

}
export default query;

export {
  remapLine,
  loadShabad
}