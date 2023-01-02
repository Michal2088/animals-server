const express = require("express");
const router = express.Router();

const jwt = require("../../config/jwt");
const userModel = require("../../models/Users.model");
const bcrypt = require("../../config/bcrypt");
const resetPasswordValidation = require("../../validation/resetPassword.validation");

router.post("/:token", async (req, res) => {
  try {
    /*
        take token from params and verify it
        if success then the payload will have the email and the secret key
        for example:
        payload {
            email: 'iphonebetter101@gmail.com',
            secretKey: 'iy6yyfee',
            iat: 1667988690,
            exp: 1667992290
        } 
    */
    const payload = await jwt.verifyToken(
      req.params.token,
      process.env.JWT_RESET_PASSWORD_KEY
    );
    /*
        take password from req.body and check if it met our password requirements
    */
    const validatedValue = await resetPasswordValidation(req.body);
    /*
        try to find email in our db
    */
    const user = await userModel.findUserByEmail(payload.email);
    if (!user) {
      return res.json({ msg: "password reset successfuly" });
    }
    /*
        hash the new password
    */
    const hashedPassword = await bcrypt.createHash(validatedValue.password);
    /*
        store the new password in our db
    */
    await userModel.updateUserPasswordByEmail(payload.email, hashedPassword);
    /*
        send msg
    */
    res.json({ msg: "password reset successfuly" });
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
