const express = require('express')
const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/custom-error')

const getAllTasks = asyncWrapper(async (req,res)=>{
    const tasks = await Task.find({})  // get all data or document, if we provide some conditions then data statisfying those will go in database
    res.status(200).json({tasks}) 
})
  
const createTask = asyncWrapper(async(req,res)=>{
    const task = await Task.create(req.body)
    res.status(201).json({task})
})

const getTask = asyncWrapper(async (req,res,next)=>{
    const { id:taskID } = req.params;  // If the id sytax is wrong, mongoose will give error written in catch block
    const task = await Task.findOne({_id:taskID})
    if(!task){
        // const error = new Error('Not Found')
        // error.status = 404
        // return next(error)
        return next(createCustomError(`No task with id : ${taskID}`,404))
        // return res.status(404).json({msg: `No task with id : ${taskID}`})
    }
    res.status(200).json({ task })
})

const updateTask = asyncWrapper(async (req,res) =>{
    const {id:taskID} = req.params
    const task = await Task.findOneAndUpdate({_id:taskID},req.body,{
        new: true,
        runValidators: true,
    })
    if(!task){
        return next(createCustomError(`No task with id : ${taskID}`,404))
        // return res.status(404).json({msg:`No task with id : ${taskID}`})
    }
    res.status(200).json({task})
})


const deleteTask = asyncWrapper(async (req,res)=>{
    const {id:taskID} = req.params
    const task = await Task.findOneAndDelete({_id:taskID});
    if(!task){
        // return res.status(404).json({msg:`No task with id : ${taskID}`})
    }
    res.status(200).json({ task })
})

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}

/*
    PUT VS PATCH
    put is for complete update, here the property we give will be there only.
    patch is for partial update, only the propery that we give gets updated , rest will stay same
*/
