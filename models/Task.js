const mongoose = require('mongoose')

// Schema is used to define the structure of a document

/*

const TaskSchema = mongoose.Schema({
    name:String,completed:Boolean   // req.body mein agar name hai toh vo aa jayega, completed nahi hai toh vo nahi aayega and if completed ki jagah complete likh diya tabh bhi nahi aayega
    // In short, except name and completed all other data will be ignored
})

*/

// If we use the above structure, we won't be validating user's data i.e. user may not pass anything etc.

// Validations

const TaskSchema = mongoose.Schema({
    name: {
        type:String,
        required: [true,'must provide name'],
        trim: true,
        maxlength: [20,'name can not be more than 20 characters'],
    },
    completed: {
        type: Boolean,
        default: false,
    }
})


// We can think of model as the representation for the collection
// In mongoose, model is a wrapper for schema
// So, If the schema defines the structure for the document, like the type validations and etc., a Mongoose model provides an interface to the database
// So, using the model we will be able to create, update, query and delete our documents with great ease

module.exports = mongoose.model('Task',TaskSchema)  // This is how we create a model. It needs two arguments, first is the name and second one is the schema. Then we exported this model
