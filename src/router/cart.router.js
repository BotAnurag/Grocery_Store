import { Router } from "express";

import { verifyJWT } from "../middleware/auth.middleware.js";

import {
  addToCart,
  getCart,
  removeFromCart,
} from "../controller/cart.controller.js";
import router from "./order.routes.js";

router.route("/add-to-cart").post(verifyJWT, addToCart);

router.route("/").get(verifyJWT, getCart);

router.route("/remove-cart").post(verifyJWT, removeFromCart);

export default router;
