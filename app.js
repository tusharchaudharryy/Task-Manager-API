const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const port = process.env.PORT || 3000 // This is while we are hosting website. If port is already given, we will use that else we will use 3000. For local environment, it is not defined

// Middleware
app.use(express.static('./public'))
app.use(express.json()) // If we don't use this then we won't get data in req.body()

// Routes

// app.get('/hello',(req,res)=>{
//     res.send('Task Manager App')
// })

// app.get('api/v1/tasks') -----------> get all the tasks
// app.post('/api/v1/tasks') ---------> create a new task
// app.get('/api/v1/tasks/:id') ------> get single task
// app.patch('/api/v1/tasks/:id') ----> update task
// app.delete('/api/v1/tasks/:id') ---> delete task

app.use('/api/v1/tasks',tasks);
app.use(notFound);  // It will apply to everything below it. But there is nothing below it, so no problem for the correct url's. Only the url's we have not defined will get not found response
app.use(errorHandlerMiddleware)

const start = async () =>{
    try{
        await connectDB(process.env.MONGO_URI) // process is a global variable // here we do process.env.VariableName
        app.listen(port,() => console.log(`Server is listening on port ${port}...`))
    }
    catch(error){
        console.log(error)
    }
}

start();


