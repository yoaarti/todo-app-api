const express = require('express');
const router  = express.Router();
const db = require('./db');


router.get('/todo',function(req,res){
    let query = `SELECT * FROM todo_list`;
    db.runQuery(query , function (err, data) {
        if (err) 
            return res.json({ error: err })
        else
            return res.json( { data : data} );
      })
})

router.post('/todo',function(req,res){
    let data = req.body;
    const query = `INSERT INTO todo_list(title,description) VALUES("${data.title}", "${data.description}")`
    db.runQuery(query,function(err,data){
        if(err)
            res.json({error:err})
        else
            res.json({data: data})
    })
})


router.delete('/todo/:id',function(req,res){
    let id = req.params.id;
    const query = `DELETE FROM todo_list WHERE id=${id}`
    db.runQuery(query,function(err,data){
        if(err)
            return req.json({error: err})
         else
            res.json({data: data})
    })

})

router.put('/todo/:id',function(req,res){
    let id = req.params.id;
    let body = req.body;

    let subQuery = Object.keys(body).map(key=>{
        return key+' = "'+body[key]+'"'
    })
    const query = `UPDATE todo_list SET ${subQuery.join()},updated_at=NOW()  WHERE id=${id}`;
    db.runQuery(query,function(err,data){
        if(err)
            return res.json({error: err})
         else
            return res.json({data: data})
    })
})

module.exports = router;