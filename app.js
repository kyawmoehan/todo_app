const express = require('express');
const todoController = require('./controllers/todoController');

const app = new express();
const PORT = process.env.PORT || 3000;

// set view engine
app.set('view engine', 'ejs');
// static file
app.use(express.static('./public'));

// fire controller
todoController(app);

// listen to port
app.listen(PORT, (err) => {
    if(err) {
        console.log(err);
    } else {
        console.log(`Server running on port ${PORT}`);
    }
});