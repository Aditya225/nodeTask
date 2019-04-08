var mongoose = require('mongoose');
var user = mongoose.model('user');
var jwt = require('jsonWebtoken');
var bcrypt = require('bcrypt'); 
module.exports.register = function(req,res)
{
	user.create({
		email:req.body.email,
		password:bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
		DOB:req.body.DOB,
		username:req.body.username,
		role:req.body.role
	},function(err,userInfo)
	{
		if(err)
		{
			res.status(403).json(err);
		}
		else{
			res.status(200).json(userInfo);
		}
	});
};

 module.exports.logIn = function(req,res)
 {
 	var email = req.body.email;
 	var  password = req.body.password;
 	user.findOne({email: email},function(err,userInfo)
 	{
 		if(err)
 		{
 			res.status(403).json(err);
 			}else if(!userInfo)
 			{
 				res.status(401).json('user not found');
 			}
 			if(bcrypt.compareSync(password, userInfo.password)){
 			var token = jwt.sign({email: userInfo.email},'s3cr3t',{expiresIn:36000});
 			res.status(200).json({success:true, token:token,userInfo:userInfo});
 		}else
 		res.status(400).json('unauthorized');
 });
};
module.exports.authCheck = function(req,res,next)
{
	var bearerHeader = req.headers['authorization'];
	if(typeof bearerHeader !=='undefined')
		var bearer = bearerHeader.split(' ')[1];
		
		req.token = bearer
		
	jwt.verify(req.token, 's3cr3t', function(err,decoded)
	{
		if(err)
			res.status(401).json('unauthorized');
		else
			req.user= decoded.email;
		next()
	})
	
};
		//find all the data who role as admin

		module.exports.findAll = function(req,res)
		{
			user.find({ role: "admin"},function(err,userInfo)
			{
				if(err)
					res.status(401).json(err);
					else
						res.status(200).json(userInfo);
			});
		};
		// delete  all the data whose  roll as admin 
		module.exports.exact = function(req,res)
		{
			user.remove({ role: req.body.role, email: req.body.email},function(err)
			{
				if(err)
					res.status(403).json(err);
				else
					res.status(200).json("data has been deleted");
			});
		};