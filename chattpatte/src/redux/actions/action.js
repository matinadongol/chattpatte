export const getItems = () => async(dispatch) => {
  try{
    const data = await fetch("/getItems", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const res = await data.json()
    console.log("action.js data",res)
    dispatch({type:"SUCCESS_GET_ITEMS", payload:res})
  } catch(error){
    console.log("error in action: ", error)
    dispatch({type:"FAIL_GET_ITEMS", payload:error.response})
  }
}