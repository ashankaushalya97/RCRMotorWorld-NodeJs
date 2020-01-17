import express = require("express");
import pool from "./db/database";

const router = express.Router();
export default router;

router.get('',(req, res) => {
   pool.query('SELECT * FROM item',(err, results) => {
      res.send(results);
   })
});

router.post('',(req, res) => {
   if(!(req.body.itemId && req.body.categoryId && req.body.brand && req.body.description && req.body.qtyOnHand
       && req.body.buyPrice && req.body.unitPrice && typeof req.body.itemId == 'string'
       && req.body.itemId.trim().length>0)){
      res.sendStatus(400);
      return;
   }else{
      pool.query('INSERT INTO item VALUES (?,?,?,?,?,?,?)',[req.body.itemId,req.body.categoryId,req.body.brand,req.body.description,
         req.body.qtyOnHand,req.body.buyPrice,req.body.unitPrice],(err, results) => {
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
   if(!(req.body.itemId && req.body.categoryId && req.body.brand && req.body.description && req.body.qtyOnHand
       && req.body.buyPrice && req.body.unitPrice && typeof req.body.itemId == 'string'
       && req.body.itemId.trim().length>0) && req.body.itemId==req.params.id){
      res.sendStatus(400);
      return;
   }else{
      pool.query('UPDATE item SET categoryId=?,brand=?,description=?,qtyOnHand=?,buyPrice=?,unitPrice=? WHERE itemId=?',[req.body.categoryId,req.body.brand,req.body.description,
         req.body.qtyOnHand,req.body.buyPrice,req.body.unitPrice,req.body.itemId],(err, results) => {
         if(err || results.affectedRows==0){
            // res.send(err);
            res.sendStatus(500);
            console.log(err);
            return;
         }else{
            res.sendStatus(204);
         }

      })

   }
});

router.delete('/:id',(req, res) => {
   pool.query('DELETE FROM item WHERE itemId=?',[req.params.id],(err, results) => {
      if(err || results.affectedRows==0){
         // res.send(err);
         res.sendStatus(500);
         console.log(err);
         return;
      }else{
         res.sendStatus(204);
      }
   })
});
