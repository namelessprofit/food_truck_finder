'use strict'

//import dependencies
var express = require('express'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    db = require('./models');


//TODO: require model's files

//Create instances
var app = express();
var router = express.Router();


//Set port
const port = process.env.API_PORT || 3001;

//db config
//ADD YOUR INFO HERE!
// mongoose.connect("mongodb://admin:123@ds153710.mlab.com:53710/wayfarer-app")

//config API to use bodyParser and look for JSON in req.body
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());
app.use(cors());

//Prevent CORS errors
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'false');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  //Remove caching
   res.setHeader('Cache-Control', 'no-cache');
   res.setHeader('Content-Type', 'application/json;charset=utf-8');
   next();
 });

//set route path
router.get('/', function(req, res) {
  res.json({message: 'API initialized'});
});

//get all users
app.get('/api/users', function(req, res) {
  db.User.find({}, function(err, users){
    res.json(users);
  })
});

//creating user
app.post('/api/user', function(req, res) {
  db.User.create(req.body, function(err, user) {
      if (err) { console.log('error', err); }
      console.log(user);
      res.json(user);
    });
})

//delete user
app.delete('/api/user/:userId', function(req, res){
  db.User.findOneAndRemove({ _id: req.params.userId }, function(err, foundUser){
    res.json(foundUser);
  });
})

//edit user
app.put('/api/user/:userId', function(req, res){
console.log(req.body)
db.User.findOneAndUpdate({_id: req.params.userId}, req.body, {new:true}, function(err, foundUser) {
    if (err) {
      console.log('got an error');
    }
  console.log(foundUser)
    res.json(foundUser)
});
  // at this point person is null.
});

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/food_truck_finder");

app.listen(port, function() {
 console.log(`api running on port ${port}`);
});
