import express = require("express");
import pool from "./db/database";

const router = express.Router();
export default router;

router.post('',(req, res) => {
   if(!req.body.orderId && req.body.date && req.body.customerId && typeof req.body.orderId && req.body.orderId.trim().length>0){
      res.sendStatus(400);
      return;
   }

   pool.getConnection((err, connection) => {
      connection.beginTransaction();
      if(err){
         res.sendStatus(500);
         return;
      }

      connection.query('INSERT INTO orders VALUES (?,?,?)',[req.body.orderId,req.body.date,req.body.customerId],(err1, results) => {
         if(err || results.affectedRows==0){
            res.status(500);
            res.send("Error to insert order");
            console.log(err);
            connection.rollback();
            return;
         }
         console.log("Order inserted!");

         for (let i = 0; i <req.body.orderDetails.length; i++) {
            connection.query('INSERT INTO orderDetail VALUES (?,?,?,?)',[req.body.orderId,req.body.orderDetails[i].itemId,
            req.body.orderDetails[i].qty,req.body.orderDetails[i].unitPrice ],(err2, results1) => {
               if(err2 || results1.affectedRows==0){
                  res.status(500);
                  res.send("Error insert order Details");
                  console.log(err2);
                  connection.rollback();
                  return;
               }
            });
            console.log("OrderDetails inserted!");

            connection.query('UPDATE item set qtyOnHand=(qtyOnHand-?) WHERE itemId=?',[req.body.orderDetails[i].qty,req.body.orderDetails[i].itemId],(err2, results1) => {
               if(err2 || results1.affectedRows==0){
                  console.log("Error in item ");
                  connection.rollback();
                  res.status(500);
                  res.send("Error updating item data");
                  console.log(err2);
                  return;
               }
               console.log("Item Qty updated!");
            });

         }
         connection.commit();
         res.status(201);
         res.send('<h1>Order Inserted</h1>');
      });


   });


});
