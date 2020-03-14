/* eslint-disable import/extensions */
import { Action } from 'easy-peasy';
import { QueryType, entryObj, gutkaEntry } from '../../dev_env/types';

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

export type Models = 'currentModel' | 'gutkaModel' | 'viewerModel';

type Element = 'Pangtee' | 'Eng' | 'Teeka' | 'Translit' | null;

export interface ThemeModel {
    isDarkMode: boolean,
    updateDarkMode: Action<ThemeModel>
}
export interface CurrentModel {
    currentName: string[];
    currentItems: entryObj[];

    updateItems: Action<CurrentModel, [string?, string?]>;
    updateCurrentName: Action<CurrentModel, [string, string]>;
    addEntry: Action<CurrentModel, [number, string, gutkaEntry]>;
    removeEntry: Action<CurrentModel, string>;
    initialUpdate: Action<CurrentModel, [string[], entryObj[]]>;
}

export interface GutkaModel {
    gutkaNames: string[][];
    isDataReady: boolean;

    updateGutkas: Action<GutkaModel>;
    updateIsReady: Action<GutkaModel, boolean>;
    createGutka: Action<GutkaModel, string>;
    deleteAGutka: Action<GutkaModel, [string, string]>;
    initialUpdate: Action<GutkaModel, [string[][], boolean]>;
}

export interface ViewerModel {
    fontSizes: FontSizes;
    displayElements: DisplayElements;

    updateFontSize: Action<ViewerModel, [string, number]>;
    updateDisplayElement: Action<ViewerModel, [string, boolean]>;
}

export interface SearchModel {
    searchType: number;
    queryType: QueryType;

    updateSeachType: Action<SearchModel, number>;
    updateQueryType: Action<SearchModel, QueryType>;
}
export interface EditModel {
    isEditMode: boolean;
    selectedInfo: [number | null, Element];

    updateEditMode: Action<EditModel>;
    updatedSelectedInfo: Action<EditModel, [number, Element]>;
}
export interface StoreModel {
    themeModel : ThemeModel;
    currentModel: CurrentModel;
    gutkaModel: GutkaModel;
    viewerModel: ViewerModel;
}
