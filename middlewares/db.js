const mongoose = require('mongoose')



const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true, 
            useFindAndModify: false
        })

        console.log(`Mongo DB Connected ${conn.connection.host}`)
    } catch(error) {
        console.group(error);
        process.exit(1);
    }
} 

module.exports = connectDB;