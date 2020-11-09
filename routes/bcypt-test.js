const express = require("express");
const router = express.Router();

// 암호화 모듈
const bcrypt = require("bcrypt");
const saltRounds = 10;
const myPlaintextPassword = "abcd1234";
const someOtherPlaintextPassword = "abcd1234!";

let user = {
  hash1: "",
  hash2: "",
};

router.get("/hash", (req, res) => {
  // Tech 1
  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) return res.status(500).json({ err: err.message });

    bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
      if (err) return res.status(500).json({ err: err.message });

      console.log(`Tech 1 = ${hash}`);
      user.hash1 = hash;
    });
  });

  // Tech 2
  bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
    if (err) return res.status(500).json({ err: err.message });
    console.log(`Tech 2 = ${hash}`);
    user.hash2 = hash;
  });
  res.json({ success: "ok" });
});

router.get("/compare", (req, res) => {
  // Tech 1

  bcrypt.compare(myPlaintextPassword, user.hash1, function (err, result) {
    console.log(`Tech1 user.hash1 ${result}`);
  });

  bcrypt.compare(myPlaintextPassword, user.hash2, function (err, result) {
    console.log(`Tech1 user.hash2 ${result}`);
  });

  bcrypt.compare(someOtherPlaintextPassword, user.hash1, function (
    err,
    result
  ) {
    console.log(`Tech2 user.hash1 ${result}`);
  });
  bcrypt.compare(someOtherPlaintextPassword, user.hash2, function (
    err,
    result
  ) {
    console.log(`Tech2 user.hash2 ${result}`);
  });
  res.json({ success: "okay" });
});

module.exports = router;
