const express = require('express');
// the Author model communicates with database
const Author = require('../models/authors');
//router creates MIDDLEWARE to be used on the /authors routes
const router = express.Router();
//all routes in this file automagically start with /authors
//because we only USE this controller on the /authors route.
router.get('/', (req, res)=>{
    Author.find({}, (err, foundAuthors)=>{
        //we give an object to the render function to give the template data
        //the keys will be the variable names in the template
        //the values will be what actually shows up on the page
        res.render('authors/index.ejs', {
            //the template will have a variable named authors
            //its value will be foundAuthors, our array of authors
            authors: foundAuthors
        })
    })
})

router.get('/new', (req, res)=>{
    res.render('authors/new.ejs');
})
//BE SURE YOUR SHOW IS BENEATH /NEW, otherwise /new will be treated as an /:id
router.get('/:id', (req, res)=>{
    Author.findById(req.params.id, (err, foundAuthor)=>{
        res.render("authors/show.ejs", {
            author: foundAuthor
        })
    })
})

router.get('/:id/edit', (req, res)=>{
    Author.findById(req.params.id, (err, foundAuthor)=>{
        res.render('authors/edit.ejs', {
            author: foundAuthor
        })
    })
})

router.post('/', (req, res)=>{
    //test post routes by console.logging req.body
    //make sure you get the data you need!
    console.log(`req.body is ${JSON.stringify(req.body)}`);
    //the callback is what happens when the database is done
    // we MUST proceed in the callback to be sure it finished
    Author.create(req.body, (err, newAuthor)=>{
        console.log(newAuthor);
        if(err){
            console.log(err);
        } else {
            //post routes always REDIRECT as a response
            res.redirect('/authors');
        }
    })
})

router.delete('/:id', (req, res)=>{
    Author.findByIdAndDelete(req.params.id, (err, result)=>{
        res.redirect('/authors')
    })
})

router.put('/:id', (req, res)=>{
    Author.findByIdAndUpdate(req.params.id, req.body, (err, newAuthor)=>{
        res.redirect(`/authors/${req.params.id}`)
    })
})

module.exports = router;