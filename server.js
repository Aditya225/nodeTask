require('./Model/config');
var express = require('express');
var app = express();
var jwt = require('jsonWebtoken');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var jwt = require('jsonwebtoken');
app.use(bodyParser.urlencoded({extended:true}));
var routers = require('./routes/router');
app.use('/news',routers);

var path = require('path');

app.get('/',function(req,res)
{
	res.json('hello');
});
app.listen(8081);
