import {configureStore} from "@reduxjs/toolkit";
import itemsReducer from "./itemsSlice";

const chattpatteStore = configureStore({
  reducer: {
    items: itemsReducer
  },
});

export default chattpatteStore;