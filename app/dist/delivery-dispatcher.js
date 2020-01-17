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
    database_1.default.query('SELECT * FROM delivery', function (err, results) {
        // res.send(results);
        res.send(results);
    });
});
router.post('', function (req, res) {
    if (!(req.body.deliveryId && req.body.orderId && req.body.address && req.body.states && typeof req.body.deliveryId == 'string'
        && req.body.deliveryId.trim().length > 0)) {
        res.sendStatus(400);
        return;
    }
    else {
        database_1.default.query('INSERT INTO delivery VALUES (?,?,?,?)', [req.body.deliveryId, req.body.orderId, req.body.address, req.body.states], function (err, results) {
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
    if (!(req.body.deliveryId && req.body.orderId && req.body.address && req.body.states && typeof req.body.deliveryId == 'string'
        && req.body.deliveryId.trim().length > 0 && req.params.id == req.body.deliveryId)) {
        res.sendStatus(400);
        return;
    }
    database_1.default.query('UPDATE delivery SET orderId=?,address=?,states=? WHERE deliveryId=?', [req.body.orderId, req.body.address, req.body.states, req.body.deliveryId], function (err, results) {
        if (err || results.affectedRows == 0) {
            res.send(err);
            res.sendStatus(500);
            console.log(err);
            return;
        }
        res.sendStatus(204);
    });
});
router.delete('/:id', function (req, res) {
    database_1.default.query('DELETE FROM delivery WHERE deliveryId=?', [req.params.id], function (err, results) {
        if (err || results.affectedRows == 0) {
            res.send(err);
            res.sendStatus(500);
            console.log(err);
            return;
        }
        res.sendStatus(204);
    });
});
