let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');

let app = express();

let db = [];

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static('css'));
app.use(express.static('images'));
app.use(express.static('views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/listTasks', function(req, res){
    console.log(db);
    res.render('listTasks.html', {taskDb:db});
});

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname,"index.html"));
});

app.post('/data', function(req,res){
    var task = {
        name: req.body.taskName,
        due: req.body.taskDue,
        desc: req.body.taskDesc
    };
    db.push(task);
    res.render('taskAdded.html',{taskName:req.body.taskName});
});

app.get('/newTask.html', function(req,res){
    res.sendFile(path.join(__dirname,"newTask.html"));
});

app.listen(8080);