const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js")

main().then(() => {
    console.log("connected to DB")
}).catch(err => {
    console.log(err)
})

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Staycation');
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: "6752bb44b401cf1e1de8f500"}))
    await Listing.insertMany(initData.data);
    console.log(initData.data)
    console.log("data intialized")
}

initDB()

