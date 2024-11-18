const express = require("express");

const user = require("../controllers/user.controller");
const AuthToken = require("../middleware/AuthToken")

const router = express.Router();


router.route("/")
    .get(user.findAll)
    // .get(AuthToken.verifyToken, user.findAll)
    .delete(user.deleteAll);
// SIGN UP/ LOGIN
router.route("/register").post(user.create)
router.route("/login").post(user.login)    

// REFRESH TOKEN
router.route("/refresh").post(user.refreshToken)    

// LOGOUT
router.route("/logout").post(AuthToken.verifyToken, user.logout)

// Cart
router.route("/cart")
    .post(AuthToken.verifyToken, user.addCart)
    .put(AuthToken.verifyToken, user.updateCart)
    .get(AuthToken.verifyToken, user.findAllCartUser)

router.route("/cart/:id")
    .delete(AuthToken.verifyToken, user.deleteCart)



// Order
router.route("/order")
    .post(AuthToken.verifyToken, user.addOrder)
    .put(AuthToken.verifyToken, user.updateOrder)
    .get(AuthToken.verifyToken, user.findAllOrderUser)

router.route("/:id")
    .get(AuthToken.verifyToken, user.findOne)
    .put(user.update)
    .delete(user.delete)
    // .delete(AuthToken.verifyTokenAdmin, user.delete);
module.exports = router;