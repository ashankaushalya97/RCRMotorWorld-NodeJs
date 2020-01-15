"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var customer_dispatcher_1 = __importDefault(require("./customer-dispatcher"));
var router = express.Router();
exports.default = router;
router.use(express.json());
router.use(cors());
router.use('/api/v1/customers/', customer_dispatcher_1.default);
