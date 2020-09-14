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
