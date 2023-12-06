// const errorHandlerMiddleware = (err,req,res,next) => {
//     return res.status(500).json({msg:err})
// }

// module.exports = errorHandlerMiddleware

// This is till custom error handling

// Modifications after creating custom error class


const {CustomAPIError} = require('../errors/custom-error')
const errorHandlerMiddleware = (err,req,res,next) => {
    if(err instanceof CustomAPIError){
        return res.status(err.statusCode).json({ msg:err.message })
    }
    return res.status(500).json({msg: 'Something went wrong, please try again'})
}

module.exports = errorHandlerMiddleware