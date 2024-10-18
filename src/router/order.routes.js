import { Router } from "express";
import { verifyAdmin } from "../middleware/role.middleware.js";

import {
  createOrder,
  getCurrentUserOrder,
  getAllOrder,
  cancleOrder,
  manageUserOrder,
  deleteOrder,
} from "../controller/order.controller.js";

import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

//user route

router.route("/").post(verifyJWT, createOrder);
router.route("/me").get(verifyJWT, getCurrentUserOrder);
router.route("/cancle/:id").patch(verifyJWT, cancleOrder);
router.route("/delete/order/:id").delete(verifyJWT, deleteOrder);

// admin only route

router.route("/").get(verifyJWT, verifyAdmin, getAllOrder);
router.route("/mange/:id").patch(verifyJWT, verifyJWT, manageUserOrder);

export default router;
