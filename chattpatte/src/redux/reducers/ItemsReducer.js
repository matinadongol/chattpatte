const items = []

export const getItemsReducer = (state={items}, action)=>{
  switch(action.type){
    case "SUCCESS_GET_ITEMS":
      return {items : action.payload}
    case "FAIL_GET_ITEMS":
      return {items : action.payload}
    default:
      return state
  }
}