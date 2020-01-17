import express = require("express");
import pool from "./db/database";

const router = express.Router();
export default router;

router.get('',(req, res) => {
    pool.query('SELECT * FROM customer',(err, results) => {
        res.send(results);
    })
})

router.post('',(req, res) => {
    if(req.body.customerId && req.body.name && req.body.contact && typeof req.body.customerId == 'string' && req.body.customerId.trim().length>0){

        pool.query('INSERT INTO customer VALUES(?,?,?)',[req.body.customerId,req.body.name,req.body.contact],(err, results) => {
            if(err || results.affectedRows ==0){
                res.sendStatus(500);
                console.log(err);
                return;
            }
            res.send(req.body.id);
            res.sendStatus(201);
        })

    }else{
        res.sendStatus(400);
    }

});

router.put('/:id',(req, res) => {

    console.log(req.params.id);

    if(req.body.customerId && req.body.name && req.body.contact && typeof req.body.customerId == 'string' && req.params.id==req.body.customerId && req.body.customerId.trim().length>0){
        pool.query('UPDATE customer SET name=?,contact=? WHERE customerId=?',[req.body.name,req.body.contact,req.body.customerId],(err, results) => {
           if(err || results.affectedRows==0){
               res.send(err);
               res.sendStatus(500);
               console.log(err);
               return;
           }
           res.sendStatus(204);
       })

    }else{
        res.sendStatus(400);
    }

});

router.delete('/:id',(req, res) => {

    pool.query('DELETE FROM customer WHERE customerId=?',[req.params.id],(err, results) => {
        if(err || results.affectedRows==0){
            res.send(err);
            res.sendStatus(500);
            console.log(err);
            return;
        }
        res.sendStatus(204);
    })
});

