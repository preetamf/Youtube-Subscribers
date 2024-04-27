const dotenv = require("dotenv");
dotenv.config();
const mongoose = require('mongoose')
const subscriberModel = require('./models/subscribers')
const data = require('./data')

// Connect to DATABASE
const DATABASE_URL = process.env.DATABASE_URL;
mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection
db.on('error', (err) => console.log(err))
db.once('open', () => console.log('Database created...'))

const refreshAll = async () => {
    try {
        await subscriberModel.deleteMany({});
        await subscriberModel.insertMany(data);
    } catch (error) {
        console.error("Error during data refresh:", error);
    } finally {
        await mongoose.disconnect();
    }
};

refreshAll()
