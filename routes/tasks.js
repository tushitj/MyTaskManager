/**
 * Created by tushitjain on 8/1/17.
 */
var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

var db = mongojs('mongodb://tushit:tushit@ds129013.mlab.com:29013/mytasklist_tushit' ,['tasks']);

//Get all tasks
router.get('/tasks',function (req,res,next) {
    db.tasks.find(function (err,tasks) {
        if(err){
            res.send(err);
        }
        res.json(tasks);
    })
});

//get single task
router.get('/task/:id',function (req,res,next) {
    db.tasks.findOne({_id: mongojs.ObjectID(req.params.id)},function (err,tasks) {
        if(err){
            res.send(err);
        }
        res.json(tasks);
    })
});

//save the task
router.post('/task',function(req,res,next){
    var task = req.body;
    if(!task.title || !(task.isDone + '')){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    }else{
        db.tasks.save(task,function (err,task) {
            if(err){
                res.send(err);
            }
            res.json(task);
        });
    }
});

//Delete the tasks
router.delete('/task/:id',function (req,res,next) {
    db.tasks.remove({_id: mongojs.ObjectID(req.params.id)},function (err,tasks) {
        if(err){
            res.send(err);
        }
        res.json(tasks);
    })
});

//Update the tasks
router.put('/task/:id',function (req,res,next) {
    var task = req.body;
    var updateTask = {};

    if(task.isDone){
        updateTask.isDone = task.isDone;
    }
    if(task.title){
        updateTask.title = task.title;
    }
    if(!updateTask){
        res.status(400);
        res.json({
            "error" : "Bad Data"
        });
    }else{
        db.tasks.update({_id: mongojs.ObjectID(req.params.id)}, updateTask, {},function (err,tasks) {
            if(err){
                res.send(err);
            }
            res.json(tasks);
        })

    }

});

module.exports = router;