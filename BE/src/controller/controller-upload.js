"use strict"
const UtilCloudinary = require("../util/util.cloudinary");

class ControllerUpload {

    async uploadImage(req, res, next) {
        // console.log(req);
        // console.log(req.files);

        // let result = UtilCloudinary.upload(req.files[0].path);

        return res.status(200).json({
            status: true,
            message: "upload success",
            url:  req.files[0].path.replace('png', 'jpeg'),
            data: {
                secure_url: req.files[0].path.replace('png', 'jpeg')
            }
        })
    }
}

module.exports = new ControllerUpload();