import express = require("express");
import pool from "./db/database";
import {type} from "os";

const router = express.Router();
export default router;

router.get('',(req, res) => {
   pool.query('SELECT * FROM delivery',(err, results) =>{
      // res.send(results);
      res.send(results);

   })
});
router.post('',(req, res) => {
   if(!(req.body.deliveryId && req.body.orderId && req.body.address && req.body.states && typeof req.body.deliveryId == 'string'
       && req.body.deliveryId.trim().length>0)){
      res.sendStatus(400);
      return;
   }else{
      pool.query('INSERT INTO delivery VALUES (?,?,?,?)',[req.body.deliveryId,req.body.orderId,req.body.address,req.body.states],(err, results) => {
         if(err || results.affectedRows==0){
            // res.send(err);
            res.sendStatus(500);
            console.log(err);
            return;
         }else{
            res.sendStatus(201);
         }

      })

   }

});

router.put('/:id',(req, res) => {
   if(!(req.body.deliveryId && req.body.orderId && req.body.address && req.body.states && typeof req.body.deliveryId == 'string'
       && req.body.deliveryId.trim().length>0 && req.params.id==req.body.deliveryId)){
      res.sendStatus(400);
      return;
   }

   pool.query('UPDATE delivery SET orderId=?,address=?,states=? WHERE deliveryId=?',[req.body.orderId,req.body.address,req.body.states,req.body.deliveryId],(err, results) => {
      if(err || results.affectedRows==0){
         res.send(err);
         res.sendStatus(500);
         console.log(err);
         return;
      }
      res.sendStatus(204);
      
   })
});

router.delete('/:id',(req, res) => {

   pool.query('DELETE FROM delivery WHERE deliveryId=?',[req.params.id],(err, results) => {
      if(err || results.affectedRows==0){
         res.send(err);
         res.sendStatus(500);
         console.log(err);
         return;
      }
      res.sendStatus(204);
   })
});
