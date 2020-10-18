type Vishraam = {
  t: 'v' | 'y'
  p: number | string
}
type ApiVishraams = {
  sttm?: Vishraam,
  sttm2?: Vishraam,
  ig?: Vishraam
}
export type RemappedLine = {
  id?: number;
  sID: number;
  Gurbani: {
    ascii: string;
    unicode?: string;
  };
  Translations: {
    English?: string;
    Punjabi: {
      SS?: string; // prof sahib singh ji
      FT?: string; // faridkot teeka
    };
    Spanish?: string;
  };
  Transliteration: {
    English: string;
    Hindi?: string;
    IPA?: string,
    UR?: string,
  };
  Vishraams: ApiVishraams[]
  
}

export type ShabadInfo = {
  shabadId:   number;
  shabadName: number;
  pageNo:     number;
  source:     Source;
  raag:       Raag;
  writer:     Writer;
}

export type Raag = {
  raagId:       number;
  gurmukhi:     string;
  unicode:      string;
  english:      string;
  raagWithPage: string;
}

export type Source = {
  sourceId: string;
  gurmukhi: string;
  unicode:  string;
  english:  string;
  pageNo:   number;
}

export type Writer = {
  writerId: number;
  gurmukhi: string;
  unicode:  null;
  english:  string;
}

export type ValueOf<T> = T[keyof T]