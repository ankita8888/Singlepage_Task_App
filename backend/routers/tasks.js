const express = require("express");
const router = express.Router()
const Task = require('../models/task')

router.get('/', async(req,res)=>{
    try{
        const tasks = await Task.find()
        res.json(tasks)
    }
    catch(err){
        res.send("error" + err);
    }
})

router.get('/:id', async(req,res)=>{
    try{
        const task = await Task.findById(req.params.id)
        res.json(task)
    }
    catch(err){
        res.send("error" + err);
    }
})

router.put('/:id', async(req,res)=>{
    try{
        const task = await Task.findById(req.params.id)
        console.log(req.body)
        task.reminder = req.body.reminder
        task.text = req.body.text
        task._id = req.body._id
        task.day = req.body.day
        const t1 = await task.save()
        res.json(t1)
    }
    catch(err){
        res.send("error" + err);
    }
})
 
router.post('/', async(req,res) => {
    const task = new Task({ 
        text: req.body.text,
        day: req.body.day,
        reminder: req.body.reminder,
    })

    try{
        const t1 = await task.save() 
        res.json(t1);
    }
    catch(err){
        res.send('Error : '+err)
    }
})

router.delete('/:id', async(req,res)=>{
    try{
        const task = await Task.findById(req.params.id)
        const t1 = await task.delete()
        res.json(t1);
    }
    catch(err){ 
        res.send('Error : ' +err)
    }
})

module.exports = router