import express = require("express");
import cors = require("cors");
import customerRouter from "./customer-dispatcher";

const router = express.Router();
export default router;

router.use(express.json());
router.use(cors());

router.use('/api/v1/customers/',customerRouter);
