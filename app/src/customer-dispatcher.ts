import express = require("express");
import pool from "./db/database";

const router = express.Router();
export default router;

router.get('',(req, res) => {
    pool.query('SELECT * FROM customer',(err, results) => {
        res.send(results);
    })
})
