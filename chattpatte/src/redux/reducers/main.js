
import { combineReducers } from "@reduxjs/toolkit"
import { getItemsReducer } from "./ItemsReducer"

const rootReducers = combineReducers({
  getItemsData: getItemsReducer
})

export default rootReducers