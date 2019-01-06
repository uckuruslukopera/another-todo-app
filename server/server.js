const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./database/mongoose');
const { User } = require('./models/user');
const { Todo } = require('./models/todo');

const app = express();
app.use(bodyParser.json());

app.get('/todos', (req, resp) => {
    Todo.find()
         .then((todos) => {
            resp.json({todos: todos})
         }).catch((error) => {
            resp.status(400);
            resp.json(error);
         })
})

app.post('/todos', (req, resp) => {
    new Todo({
        text: req.body.text
    }).save().then((result) => {
        resp.json(result);
    }).catch((error) => {
        resp.status(400);
        resp.json(error);
    })
});

app.post('/users', (req, resp) => {
    new User({
        email: req.body.email
    }).save().then((result => {
        resp.json(result);
    })).catch((error) => {
        resp.status(400);
        resp.json(error);
    })
})

app.listen(3000, () => console.log('Started listening on 3000'));

module.exports = {app};

