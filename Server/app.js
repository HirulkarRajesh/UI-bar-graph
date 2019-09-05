const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs')

var app = express();
const _port=3000;
//body parser
app.use(bodyparser.json({limit: '500mb'}));
app.use(bodyparser.urlencoded({ extended: true }));

// adding middleware cors
app.use(cors());
app.use(express.static(path.join(__dirname,'public')));

app.get('/', function(req, res) {
	res.send('Expense Watch API is running at http://localhost:' + _port + '/api');
});
app.get('/readData',function(req,res){
    
    let json_data = {}
    fs.readFile('data/data.json', 'utf-8', (err, data) => {
      if (err) throw err
      if(data){
        json_data = JSON.parse(data);
      
      }
      
      res.send(json_data)

    });
    
});

app.listen(_port,()=>{
    console.log("server run on port: "+_port);
});