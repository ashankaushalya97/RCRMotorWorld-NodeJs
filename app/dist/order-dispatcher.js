"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
exports.default = router;
router.get('', function (req, res) {
    res.send("Order Dispatcher");
});
