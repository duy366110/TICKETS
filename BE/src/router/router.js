const router = require('express').Router();
const routerUpload = require("./router-upload");

router.use("/upload", routerUpload);

module.exports = router;