const express = require('express');
const mongoose = require('mongoose');

// connect to database
const MONGODB_URI = "mongodb+srv://todo_app:todo_12345@todo-p07dj.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// create a schema
const todoSchema = new mongoose.Schema({
    item: String
})

const Todo = mongoose.model('Todo', todoSchema);

// let data = [
//     {item: 'get milk'},{item: 'have dinner'},{item: 'go to bed'}
// ];

module.exports = (app) => {
    // handle post from form
    app.use(express.urlencoded({extended: true}));

    app.get('/', (req, res) => {
        // get data from mogodb
        Todo.find({}, (err, data) => {
            if(err) throw err;
            res.render('todo', {todos: data});
        });
    });

    app.post('/', (req, res) => {
        // get data from view and add to mongodb
        const newTodo = Todo(req.body).save((err, data) => {
            if(err) throw err;
            res.json(data);
        });
    });

    app.delete('/:item', (req, res) => {
        // delete the request item from mongodb
        Todo.find({item: req.params.item.replace(/\-/g, ' ')}).remove((err, data) => {
            if(err) throw err;
            res.json(data);
        });
    });

};