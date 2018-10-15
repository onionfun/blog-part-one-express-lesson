const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
//morgan is a nice middleware that logs requests to your server
const morgan = require('morgan')
//Run the db connection file
require('./db/db');
app.use(morgan('short'));
app.use(methodOverride('_method'));
app.use(bodyParser({urlencoded: true, extended: false}))
const authorController = require('./controllers/author');
//every route that starts with /authors will be finished in author controller
app.use('/authors', authorController);

app.get('/', (req, res)=>{
    res.render('index.ejs');
})

app.listen(3000, ()=>{
    console.log("The server is running, go catch it");
})