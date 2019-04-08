var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	email:{
	type:String,
	required:true
	},
	password:{
	type:String,
	required:true
	},
	DOB:String,
	
	username:String,
	role:String

	});
	mongoose.model('user',userSchema);
