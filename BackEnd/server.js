// server.js

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
const mongoose = require('mongoose');

const mongoDB = 'mongodb+srv://admin:admin@cluster0-oao4y.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(mongoDB, {useNewUrlParser:true});

const Schema = mongoose.Schema;

const guitarSchema = new Schema({
  model:String,
  colour:String,
  image:String
});

const GuitarModel = mongoose.model('guitar',guitarSchema);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept");
  next();
  });

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world');
})

app.get('/api/guitars', (req,res,next) => {

  console.log("get request")
  GuitarModel.find((err,data)=>{
    res.json({guitars:data});
  })
})

app.delete('/api/guitars/:id', (req,res) =>{
  console.log(req.params.id);

  GuitarModel.deleteOne({_id:req.params.id},(error,data)=>{
    if(error)
      res.json(error);
      
    res.json(data);
  })
})

app.get('/api/guitars/search/:model/:criteria', (req,res)=>{
  console.log(req.params.model);
  console.log(req.params.criteria);
if(req.params.criteria == 'model')
  {
  GuitarModel.find({ 'model': req.params.model},
(error,data) =>{
  res.json(data);
})
  }
})


app.post('/api/guitars', (req,res) =>{
console.log('post Sucessfull');
console.log(req.body)
console.log(req.body.model);
console.log(req.body.colour);
console.log(req.body.image);

GuitarModel.create({
  model: req.body.model,
  colour: req.body.colour,
  image: req.body.image
});
res.json('data uploaded')


})

app.get('/api/guitars/:id',(req,res)=>{
  console.log(req.params.id);

  GuitarModel.findById(req.params.id, (err, data)=>{
    res.json(data);
  })
})


app.put('/api/guitars/:id', (req, res)=>{
  console.log(req.body);
  console.log("Edit "+req.params.id);

  GuitarModel.findByIdAndUpdate(req.params.id,
    req.body, {new:true}, (error, data)=>{
      res.send(data);
    })
})

app.listen(PORT, function () {
  console.log('Server is running on Port: ', PORT);
});