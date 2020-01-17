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
    database_1.default.query('SELECT * FROM customer', function (err, results) {
        res.send(results);
    });
});
router.post('', function (req, res) {
    if (req.body.customerId && req.body.name && req.body.contact && typeof req.body.customerId == 'string' && req.body.customerId.trim().length > 0) {
        database_1.default.query('INSERT INTO customer VALUES(?,?,?)', [req.body.customerId, req.body.name, req.body.contact], function (err, results) {
            if (err || results.affectedRows == 0) {
                res.sendStatus(500);
                console.log(err);
                return;
            }
            res.send(req.body.id);
            res.sendStatus(201);
        });
    }
    else {
        res.sendStatus(400);
    }
});
router.put('/:id', function (req, res) {
    console.log(req.params.id);
    if (req.body.customerId && req.body.name && req.body.contact && typeof req.body.customerId == 'string' && req.params.id == req.body.customerId && req.body.customerId.trim().length > 0) {
        database_1.default.query('UPDATE customer SET name=?,contact=? WHERE customerId=?', [req.body.name, req.body.contact, req.body.customerId], function (err, results) {
            if (err || results.affectedRows == 0) {
                res.send(err);
                res.sendStatus(500);
                console.log(err);
                return;
            }
            res.sendStatus(204);
        });
    }
    else {
        res.sendStatus(400);
    }
});
router.delete('/:id', function (req, res) {
    database_1.default.query('DELETE FROM customer WHERE customerId=?', [req.params.id], function (err, results) {
        if (err || results.affectedRows == 0) {
            res.send(err);
            res.sendStatus(500);
            console.log(err);
            return;
        }
        res.sendStatus(204);
    });
});
