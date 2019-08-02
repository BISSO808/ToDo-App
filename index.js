const express= require('express');
const path =require('path');
const bodyParser = require ('body-parser');
//port and variable
const port= 3000;
//Init app
const app = express();
const MongoClient= require('mongodb').MongoClient;
const ObjectID= require('mongodb').ObjectID;
const url = 'mongodb://localhost:27017/todoapp';
//Middle ware for body parser This body-parser module parses the JSON, buffer, string and URL encoded data submitted using HTTP POST request.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));

//view setup
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');

//connect to the database
MongoClient.connect(url,(err,database)=>{
console.log('MongoDb is connected.....');
if(err) throw err;
db= database;
Todos =db.collection('todos');

app.listen(port,() =>{
    console.log('The server is running in the server ' + port);
});
});
app.get('/',(req, res, next) =>{
    Todos.find({}).toArray((err,todos)=>{
if (err){
    return console.log(err);
}
console.log(todos);
res.render('index',{
    todos:todos
});
    });
});
app.post('/todo/add', (req,res,next)=>{
//create to do object
const todo ={
    text : req.body.text,
    body: req.body.body
}
//insert to the db
Todos.insert(todo, (err, result)=>{
if(err){
    return console.log(err);
}
console.log('Todo added...');
res.redirect('/');
});
});
app.delete('/todo/delete/:id',(req, res,next)=>{
const query={_id: ObjectID(req.params.id)}
Todos.deleteOne(query,(err,response) =>{
    if(err){
        return console.log(error);
    }
    console.log("removed");
    res.send(200);
});
});
app.get('/todo/edit/:id',(req, res, next) =>{
    const query ={_id: ObjectID(req.params.id)};
    Todos.find(query).next((err,todo)=>{
if (err){
    return console.log(err);
}

res.render('edit',{
    todo:todo
});
});
});
app.post('/todo/edit/:id', (req,res,next)=>{
    //create to do object
    const query ={_id: ObjectID(req.params.id)};
 const todo ={
        text : req.body.text,
        body: req.body.body
    }
    //insert to the db
    
 Todos.updateOne(query,{$set:todo}, (err, result)=>{
    if(err){
        return console.log(err);
    }
console.log('Todo updated...');
 res.redirect('/');
 }); 
 });