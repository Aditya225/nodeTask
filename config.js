var mongoose = require('mongoose');
var url = "mongodb://localhost:27017/registers";

mongoose.connect(url);

mongoose.connection.on('connected',function()
{
	console.log('database is connected with' + url);
});

mongoose.connection.on('disconnected',function()
{
	console.log("database is not connected");
});
mongoose.connection.on('err',function(err)
{
	console.log('error' + err);
});
require('./user.model.js');


