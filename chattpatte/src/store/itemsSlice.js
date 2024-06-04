import { createSlice } from "@reduxjs/toolkit";
import { menuItems } from "../data/menuItems";

const itemsSlice = createSlice({
  name: "items",
  initialState: menuItems,
  reducers:{
    addInitialItems: (state, action) => {
      return state;
    }
  }
});

export const itemsActions = itemsSlice.actions;

export default itemsSlice.reducer;