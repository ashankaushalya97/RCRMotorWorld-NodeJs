import express = require("express");
import cors = require("cors");
import customerRouter from "./customer-dispatcher";
import itemRouter from "./item-dispatcher";
import orderRouter from "./order-dispatcher";
import deliveryRouter from "./delivery-dispatcher";


const router = express.Router();
export default router;

router.use(express.json());
router.use(cors());

router.use('/api/v1/customers/',customerRouter);
router.use('/api/v1/items/',itemRouter);
router.use('/api/v1/orders/',orderRouter);
router.use('/api/v1/deliveries/',deliveryRouter);
