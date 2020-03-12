import { QueryType, storedGutka, entryObj, gutkaEntry } from '../../dev_env/types';
import { Action, Computed } from 'easy-peasy';


type FontSizes = {
  gurmukhi: number,
  eng: number,
  teeka: number,
  translit: number,
}

type DisplayElements = {
  displayEng: boolean,
  displayTeeka: boolean,
  displayTranslit: boolean
}

export type Models = 'currentModel' | 'gutkaModel' | 'viewerModel';

type Element = 'Pangtee' | 'EngTransl' | 'Teeka' | 'Translit' | null;
interface CurrentModel {
  currentName: string[],
  currentItems: entryObj[],

  updateItems: Action<CurrentModel, [string?, string?]>
  updateCurrentName: Action<CurrentModel, [string, string]>,
  addEntry: Action<CurrentModel, [number, string, gutkaEntry]>,
  removeEntry: Action<CurrentModel, string>
  initialUpdate: Action<CurrentModel, [string[], entryObj[]]>
}

interface GutkaModel {
  gutkaNames: string[][],
  isDataReady: boolean,

  updateGutkas: Action<GutkaModel>,
  updateIsReady: Action<GutkaModel, boolean>,
  createGutka: Action<GutkaModel, string>,
  deleteAGutka: Action<GutkaModel, [string, string]>,
  initialUpdate: Action<GutkaModel, [string[][], boolean]>
}

interface ViewerModel {
  fontSizes: FontSizes,
  displayElements: DisplayElements,

  updateFontSize: Action<ViewerModel, [string, number]>
  updateDisplayElement: Action<ViewerModel, [string, boolean]>
}

interface SearchModel {
  searchType: number,
  queryType: QueryType

  updateSeachType: Action<SearchModel, number>,
  updateQueryType: Action<SearchModel, QueryType>
}
interface EditModel {
  isEditMode: boolean,
  selectedInfo: [number | null, Element];

  updateEditMode: Action<EditModel>,
  updatedSelectedInfo: Action<EditModel, [number, Element]>
}
interface StoreModel {
  currentModel: CurrentModel,
  gutkaModel: GutkaModel,
  viewerModel: ViewerModel,
}

export {
  CurrentModel,
  GutkaModel,
  ViewerModel,
  SearchModel,
  EditModel,
  StoreModel
}