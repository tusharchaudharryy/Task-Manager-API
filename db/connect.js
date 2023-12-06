// CRUD -> Creat, Read, Update and Delete

const mongoose = require('mongoose');
/*
const connectionString = 'mongodb+srv://Sahil:<Password>@nodeandexpressproject.vz1qrsx.mongodb.net/TASK-MANAGER?retryWrites=true&w=majority'
*/

// using the above will make our password visible to all instead what we will do is, we will put it into .env file


/*
mongoose
    .connect(connectionString,{
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        // If we are using Version 6 of mongoDB then we donot need to write these lines.
        // These lines are only to remove warnings/error which comes in terminal while connecting to database
    })
    .then(()=>console.log("Connected to the DB..."))
    .catch((err)=>console.log(err))

module.exports = mongoose
*/

// By using the above method -> we listen to the server first then connect to the database
// But then what is the use of server
// We should connect to the database first and if that is succesful then we should listen to the server
// For we are refactoring the code or basically we are doing refactor connect

const connectDB = (url) => {
    return mongoose.connect(url,{
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        // If we are using Version 6 of mongoDB then we donot need to write these lines.
        // These lines are only to remove warnings/error which comes in terminal while connecting to database
    })

    // we are returning a promise here
}

module.exports = connectDB
