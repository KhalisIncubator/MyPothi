/* eslint-disable import/extensions */
import {
  Action, Thunk, Computed, ActionOn, ThunkOn,
} from 'easy-peasy';
import {
  QueryType, entryObj, pothiEntry, ModType, lengthType,
} from '../../types/types';

import { loadShabad, loadBani } from '../database/BanidbApi';

interface Info {
    source: string,
    writer: string,
    raag: string,
}
interface Sources {
    vishraamSource: 'sttm' | 'sttm2' | 'ig',
    teekaSource: 'FT' | 'SS',
    translationLang: 'English' | 'Spanish'
    translitLang: 'English' | 'Hindi' | 'IPA'
}
interface Theme {
    isDarkMode: boolean,
    trueDarkMode: boolean,
    choseSystem: boolean,
}
interface SearchPrefs {
    baniLength: lengthType
}
interface FontSizes {
    gurmukhi: number;
    eng: number;
    teeka: number;
    translit: number;
}

interface DisplayElements {
    displayEng: boolean;
    displayTeeka: boolean;
    displayTranslit: boolean;
    displayVishraams: boolean;
}

export type Models = 'currentModel' | 'pothiModel' | 'viewerModel';

type Element = 'Pangtee' | 'Eng' | 'Teeka' | 'Translit' | null;

export interface ThemeModel {
    theme: Theme,
    updateTheme: Action<ThemeModel, string>
}
export interface CurrentModel {
    currentName: string[];
    currentItems: Computed<CurrentModel, entryObj[]>;

    updateCurrentName: Action<CurrentModel, [string, string]>;

    addedEntry: Action<CurrentModel, [number, string, string[], pothiEntry, Info ]>;
    undoCreation: Action<CurrentModel>;
    removeEntry: Action<CurrentModel, [string, number]>;

    createMod: Action<CurrentModel, { lineid: number, element: Element, type: ModType, value: any, parentID: string}>;
    deleteMod: Action<CurrentModel, { lineid: number, element: Element, parentID: string}>;

    addEntry: Thunk<CurrentModel, [number, string, pothiEntry], Injections,
    StoreModel>

    onNameChange: ActionOn<CurrentModel, StoreModel>;
    onAction: ActionOn<CurrentModel, StoreModel>;
}

export interface PothiModel {
    pothiNames: string[][];

    renamePothi: Action<PothiModel, [string, string, string]>;
    updatePothis: Action<PothiModel>;
    createPothi: Action<PothiModel, string>;
    deletePothi: Action<PothiModel, [string, string]>;
}

export interface ViewerModel {
    fontSizes: FontSizes;
    displayElements: DisplayElements;
    searchPreferences: SearchPrefs;
    sources: Sources

    updateFontSize: Action<ViewerModel, [string, number]>;
    updateDisplayElement: Action<ViewerModel, string>;
    updateSource: Action<ViewerModel, [string, string]>;
    updateSearch: Action<ViewerModel, ['baniLength', lengthType]>
}

export interface SearchModel {
    searchType: number;
    queryType: QueryType;

    updateSeachType: Action<SearchModel, number>;
    updateQueryType: Action<SearchModel, QueryType>;
}
export interface AddedModel {
 addedItems: any[],
 updateAddedItems: Action<AddedModel, {sID: number, queryType: string}>
 onUndo: ActionOn<AddedModel, StoreModel>;
 onChangeGutka: ActionOn<AddedModel, StoreModel>;
 onDelete: ActionOn<AddedModel, StoreModel>;
}
export interface EditModel {
    isEditMode: boolean;
    selectedInfo: [number | null, Element, string | null];

    updateEditMode: Action<EditModel>;
    updatedSelectedInfo: Action<EditModel, [number | null, Element, string | null]>;
}
export interface FullScreenModel {
    isFullScreen: boolean,
    toggleMode: Action<FullScreenModel>
}
export interface ModalModel {
    showModal: boolean,
    text: string,

    toggleModal: Action<ModalModel, [boolean, string?]>
    onEntryAdded: ThunkOn<ModalModel, Injections, StoreModel>;
}
export interface StoreModel {
    modalModel: ModalModel;
    addedModel: AddedModel;
    themeModel : ThemeModel;
    currentModel: CurrentModel;
    pothiModel: PothiModel;
    viewerModel: ViewerModel;
}

export interface Injections {
    loadShabad: typeof loadShabad,
    loadBani: typeof loadBani
}
