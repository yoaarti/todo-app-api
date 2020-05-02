const express = require('express');
const router  = express.Router();
const db = require('./db');


router.post('/signup',function(req,res){
    let data = req.body;
    const query = `INSERT INTO user(first_name,last_name,mobile_number,email,password) VALUES("${data.first_name}","${data.last_name}", "${data.mobile_number}","${data.email}","${data.password}")`
    db.runQuery(query,function(err,data){
        if(err)
            res.json({error:err})
        else
            res.json({data: data})
    })
})

router.post('/login',function(req,res){
	let body = req.body;
	const query = `SELECT * FROM user WHERE (email ="${body.email}")`;
	db.runQuery(query,function(err,data){
		if(err)
            res.json({error:err})
        else if(data.length==0){
    		res.json({error:"User doesn't exists.!!!"});
    	}
    	else if(body.password!=data[0].password){
    		console.log(data)
			res.json({error: "Password doesn't match.!!!"})
		}
		else{
        	res.json({data: body});
        }
	})
})

module.exports = router;