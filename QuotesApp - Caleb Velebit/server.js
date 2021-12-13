////////// EXPRESS ///////////////////////////////////
const express = require("express");
const app = express();

////////// MONGOOSE //////////////////////////////////
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/quotes', {useNewUrlParser: true});
const UserSchema = new mongoose.Schema({
 name: {type: String, required:[true, "Name must be at least 2 characters"], minlength:2},
 quote: {type: String, required:[true, "Quote must be at least 2 characters"], minlength:2}
}, {timestamps:true})
const User = mongoose.model('User', UserSchema);

////////// VALIDATION ////////////////////////////////
const flash = require('express-flash');
app.use(flash());

///////// EXPRESS CONNECTION PORT ////////////////////
app.listen(8000, () => console.log("listening on port 8000"));

///////// POST SETUP              ////////////////////
app.use(express.urlencoded({extended: true}));

///////// EJS CONNECTION          //////////////////// 
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

///////// SESSION SETUP      /////////////////////////
const session = require('express-session');
app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

//////// INDEX GET ROUTE /////////////////////////////
app.get('/', (req, res) => {
    res.render('index');
})

//////// SKIP GET ROUTE /////////////////////////////
app.get('/skip', (req, res) => {
    res.render('quotes', { users: none });
})

//////// QUOTE GET ROUTE /////////////////////////////
app.get('/quotes', (req, res) => {
    User.find()
        .then(user => res.render("quotes", {users: user}))
        .catch(err => res.json(err));
});

/////////// PROCESS POST REQUEST ////////////////////

app.post('/process', (req, res) => {
    const user = new User();
    user.name = req.body.name;
    user.quote = req.body.quote;
    user.save()
        .then(() => res.redirect('/quotes'))
        .catch(err => {
            console.log( "We have an error!", err);
            for(var key in err.errors) {
                req.flash('registration', err.errors[key].message);
            }
            res.redirect('/');
        });
});

