/* eslint-disable import/extensions */
import { Action, Thunk, Computed } from 'easy-peasy';
import {
  QueryType, entryObj, pothiEntry, ModType, lengthType,
} from '../../types/types';

import { loadShabad, loadBani } from '../database/BanidbApi';

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
}

export type Models = 'currentModel' | 'pothiModel' | 'viewerModel';

type Element = 'Pangtee' | 'Eng' | 'Teeka' | 'Translit' | null;

export interface ThemeModel {
    isDarkMode: boolean,
    updateDarkMode: Action<ThemeModel>
}
export interface CurrentModel {
    currentName: string[];
    currentItems: Computed<CurrentModel, entryObj[]>;

    updateCurrentName: Action<CurrentModel, [string, string]>;

    addedEntry: Action<CurrentModel, [number, string, string[], pothiEntry]>;
    removeEntry: Action<CurrentModel, string>;

    createMod: Action<CurrentModel, { lineid: number, element: Element, type: ModType, value: any, parentID: string}>;
    deleteMod: Action<CurrentModel, { lineid: number, element: Element, parentID: string}>;

    addEntry: Thunk<CurrentModel, [number, string, pothiEntry], Injections,
    StoreModel>
}

export interface PothiModel {
    pothiNames: string[][];
    isDataReady: boolean;

    updatePothis: Action<PothiModel>;
    updateIsReady: Action<PothiModel, boolean>;
    createPothi: Action<PothiModel, string>;
    deletePothi: Action<PothiModel, [string, string]>;
}

export interface ViewerModel {
    fontSizes: FontSizes;
    displayElements: DisplayElements;
    baniLength: lengthType;

    updateFontSize: Action<ViewerModel, [string, number]>;
    updateDisplayElement: Action<ViewerModel, string>;
    updateLength: Action<ViewerModel, lengthType>
}

export interface SearchModel {
    searchType: number;
    queryType: QueryType;

    updateSeachType: Action<SearchModel, number>;
    updateQueryType: Action<SearchModel, QueryType>;
}
export interface AddedModel {
 addedItems: number[],
 updateAddedItems: Action<AddedModel, number>
}
export interface EditModel {
    isEditMode: boolean;
    selectedInfo: [number | null, Element, string | null];

    updateEditMode: Action<EditModel>;
    updatedSelectedInfo: Action<EditModel, [number | null, Element, string | null]>;
}
export interface StoreModel {
    themeModel : ThemeModel;
    currentModel: CurrentModel;
    pothiModel: PothiModel;
    viewerModel: ViewerModel;
}

export interface Injections {
    loadShabad: typeof loadShabad,
    loadBani: typeof loadBani
}
