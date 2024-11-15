"use strict"
const router = require('express').Router();
const ControllerUpload = require("../controller/controller-upload");

router.post("/single", ControllerUpload.uploadImage);

module.exports = router;