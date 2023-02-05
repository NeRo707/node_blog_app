const express = require('express');
const { default: mongoose } = require('mongoose');
const morgan = require('morgan');
const blogRoutes = require('./routes/blogRoutes');


//express app
const app = express();
//your Database URI goes here
const dbURI = 'type your database URI';
mongoose.set("strictQuery", false);
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => {app.listen(3000); console.log('connected to db')})
.catch((err) => {console.log(err)});

//middleware and static
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true}));
app.use(morgan('dev'))

//routes
app.get('/', (req, res) => {

  res.redirect('/blogs');

});

app.get('/about', (req, res) => {
  //console.log(req.url);
  res.render('about', { title: 'About' });
});

//blog routes

app.use('/blogs', blogRoutes);

app.use((req, res)=>{

  //console.log(req.url);
  res.status(404).render('404', { title: '404' });


});