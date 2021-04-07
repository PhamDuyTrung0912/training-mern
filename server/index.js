const express = require('express');
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://trungti98:trungti98@mern-learning.efanj.mongodb.net/mern-learning?retryWrites=true&w=majority`,
            {
                useCreateIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            }
        )
        console.log('Mongoose connect')
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

connectDB();

const app = express();
const PORT = 5000

app.get("/", (req, res) => {
    res.send("Hello world")
})

app.listen(PORT, () => {
    console.log(`Server run ${PORT}`)
})