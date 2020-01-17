"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var database_1 = __importDefault(require("./db/database"));
var router = express.Router();
exports.default = router;
router.get('', function (req, res) {
    database_1.default.query('SELECT * FROM item', function (err, results) {
        res.send(results);
    });
});
router.post('', function (req, res) {
    if (!(req.body.itemId && req.body.categoryId && req.body.brand && req.body.description && req.body.qtyOnHand
        && req.body.buyPrice && req.body.unitPrice && typeof req.body.itemId == 'string'
        && req.body.itemId.trim().length > 0)) {
        res.sendStatus(400);
        return;
    }
    else {
        database_1.default.query('INSERT INTO item VALUES (?,?,?,?,?,?,?)', [req.body.itemId, req.body.categoryId, req.body.brand, req.body.description,
            req.body.qtyOnHand, req.body.buyPrice, req.body.unitPrice], function (err, results) {
            if (err || results.affectedRows == 0) {
                // res.send(err);
                res.sendStatus(500);
                console.log(err);
                return;
            }
            else {
                res.sendStatus(201);
            }
        });
    }
});
router.put('/:id', function (req, res) {
    if (!(req.body.itemId && req.body.categoryId && req.body.brand && req.body.description && req.body.qtyOnHand
        && req.body.buyPrice && req.body.unitPrice && typeof req.body.itemId == 'string'
        && req.body.itemId.trim().length > 0) && req.body.itemId == req.params.id) {
        res.sendStatus(400);
        return;
    }
    else {
        database_1.default.query('UPDATE item SET categoryId=?,brand=?,description=?,qtyOnHand=?,buyPrice=?,unitPrice=? WHERE itemId=?', [req.body.categoryId, req.body.brand, req.body.description,
            req.body.qtyOnHand, req.body.buyPrice, req.body.unitPrice, req.body.itemId], function (err, results) {
            if (err || results.affectedRows == 0) {
                // res.send(err);
                res.sendStatus(500);
                console.log(err);
                return;
            }
            else {
                res.sendStatus(204);
            }
        });
    }
});
router.delete('/:id', function (req, res) {
    database_1.default.query('DELETE FROM item WHERE itemId=?', [req.params.id], function (err, results) {
        if (err || results.affectedRows == 0) {
            // res.send(err);
            res.sendStatus(500);
            console.log(err);
            return;
        }
        else {
            res.sendStatus(204);
        }
    });
});
