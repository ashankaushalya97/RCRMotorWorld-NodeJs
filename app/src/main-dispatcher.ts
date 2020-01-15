import express = require("express");
import cors = require("cors");

const router = express.Router();
export default router;

router.use(express.json());
router.use(cors());
