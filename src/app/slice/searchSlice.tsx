import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { uniList } from "../../../public/uni_list";

//Fuse.js
import Fuse from "fuse.js";

export interface SearchState {
  value: any;
  savedList: any;
  search: string;
  sessionId?: string;
  loaded: boolean;
}

const initialState: SearchState = {
  value: [],
  savedList: [],
  search: "",
  sessionId: undefined,
  loaded: false,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    updateSessionId: (state, action: PayloadAction<string>) => {
      state.sessionId = action.payload;
    },
    updateloaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
    updateSavedList: (state, action: PayloadAction<any>) => {
      if (action.payload) {
        state.savedList = action.payload.history; // TODO:fix this
      } else {
        state.savedList = [];
      }
    },
    updateSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    update: (state, action: PayloadAction<string>) => {
      const fuseOptions = {
        // isCaseSensitive: false,
        // includeScore: false,
        // shouldSort: true,
        // includeMatches: false,
        // findAllMatches: false,
        // minMatchCharLength: 1,
        // location: 0,
        threshold: 0.2,
        // distance: 100,
        // useExtendedSearch: false,
        ignoreLocation: true,
        // ignoreFieldNorm: false,
        // fieldNormWeight: 1,
        keys: ["name", "country"],
      };

      const fuse = new Fuse(uniList, fuseOptions);

      let res = fuse.search(action.payload);

      let unis = res.map((uni: any) => {
        uni = {
          ...uni.item,
        };
        return uni;
      });

      state.value = unis;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  update,
  updateSearch,
  updateSessionId,
  updateSavedList,
  updateloaded,
} = searchSlice.actions;

export default searchSlice.reducer;
