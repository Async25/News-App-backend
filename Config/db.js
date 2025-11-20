const mongoose = require('mongoose')

//  dabase function to connect with dataBase

  const Database = async function (url) {

    try {
        await mongoose.connect(url)
    } catch (error) {
        console.log(`Error while connecting to Database: ${error}`)

    }
}

module.exports = { Database };
