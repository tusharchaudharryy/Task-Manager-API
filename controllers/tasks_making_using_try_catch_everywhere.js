const express = require('express')
const Task = require('../models/Task')

const getAllTasks = async (req,res)=>{ 
    try{
        const tasks = await Task.find({})  // get all data or document, if we provide some conditions then data statisfying those will go in database
        res.status(200).json({tasks})
        // res.status(200).json({tasks, amount:tasks.length})
        // res.status(200).json({status:'success', data: {tasks, nbHits: tasks.length}})        // These are some other ways of sending responses
    }
    catch(error){
        res.status(500).json({msg:error})
    }
}

// const createTask = (req,res)=>{
//     // res.json({success:true, id:1})
//     res.json(req.body);
// }


// const createTask = async (req,res)=>{
//     const task = await Task.create(req.body)
//     res.status(201).json({task})
// }

// Here we are not handling the case when error occur while task creation
// Solution -> try/catch block
  
const createTask = async(req,res)=>{
    try{
        const task = await Task.create(req.body)
        res.status(201).json({task})
    }
    catch(error){
        res.status(500).json({msg:error})
    }
}

const getTask = async (req,res)=>{
    // res.send('Get Single task')
    try{
        const { id:taskID } = req.params;  // If the id sytax is wrong, mongoose will give error written in catch block
        const task = await Task.findOne({_id:taskID})
        if(!task){
            return res.status(404).json({msg: `No task with id : ${taskID}`})
        }
        res.status(200).json({ task })
    }
    catch(error){
        res.status(500).json({msg:error})
    }
}

const updateTask = async (req,res) =>{
    // res.send('Update task')
    try {
        const {id:taskID} = req.params
        const task = await Task.findOneAndUpdate({_id:taskID},req.body,{
            new: true,
            runValidators: true,
        })
        if(!task){
            return res.status(404).json({msg:`No task with id : ${taskID}`})
        }
        res.status(200).json({task})
    }
    catch(error){
        res.status(500).json({ msg: error})
    }
}


const deleteTask = async (req,res)=>{
    // res.send('Delete task')
    try {
        const {id:taskID} = req.params
        const task = await Task.findOneAndDelete({_id:taskID});
        if(!task){
            return res.status(404).json({msg:`No task with id : ${taskID}`})
        }
        res.status(200).json({ task })
    }
    catch(error) {
        res.status(500).json({ msg: error})
    }
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}

/*
    PUT VS PATCH
    put is for complete update
    patch is for partial update
*/
