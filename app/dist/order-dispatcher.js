"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var database_1 = __importDefault(require("./db/database"));
var router = express.Router();
exports.default = router;
router.post('', function (req, res) {
    if (!req.body.orderId && req.body.date && req.body.customerId && typeof req.body.orderId && req.body.orderId.trim().length > 0) {
        res.sendStatus(400);
        return;
    }
    database_1.default.getConnection(function (err, connection) {
        connection.beginTransaction();
        if (err) {
            res.sendStatus(500);
            return;
        }
        connection.query('INSERT INTO orders VALUES (?,?,?)', [req.body.orderId, req.body.date, req.body.customerId], function (err1, results) {
            if (err || results.affectedRows == 0) {
                res.status(500);
                res.send("Error to insert order");
                console.log(err);
                connection.rollback();
                return;
            }
            console.log("Order inserted!");
            for (var i = 0; i < req.body.orderDetails.length; i++) {
                connection.query('INSERT INTO orderDetail VALUES (?,?,?,?)', [req.body.orderId, req.body.orderDetails[i].itemId,
                    req.body.orderDetails[i].qty, req.body.orderDetails[i].unitPrice], function (err2, results1) {
                    if (err2 || results1.affectedRows == 0) {
                        res.status(500);
                        res.send("Error insert order Details");
                        console.log(err2);
                        connection.rollback();
                        return;
                    }
                });
                console.log("OrderDetails inserted!");
                connection.query('UPDATE item set qtyOnHand=(qtyOnHand-?) WHERE itemId=?', [req.body.orderDetails[i].qty, req.body.orderDetails[i].itemId], function (err2, results1) {
                    if (err2 || results1.affectedRows == 0) {
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
