const Items = require("./model/itemsSchema")
const itemsData = require("./constants/itemsData")

const DefaultData = async() => {
  try{
    await Items.deleteMany({})
    const storeData = await Items.insertMany(itemsData)
    //console.log("stored data: ", storeData)
  } catch(error){
    console.log("error" + error.message)
  }
}

module.exports = DefaultData()
