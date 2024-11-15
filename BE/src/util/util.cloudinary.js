require('dotenv').config();
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const ConfigEnv = require("../configs/config.env");


class CLOUDINARY {

    constructor() {
        cloudinary.config({
            cloud_name: ConfigEnv.CLOUDINARY_NAME,
            api_key: ConfigEnv.CLOUDINARY_KEY,
            api_secret: ConfigEnv.CLOUDINARY_SECRET,
        })
    }

    // UPLOAD FILE LÊN CLOUD
    storage = new CloudinaryStorage({
        cloudinary,
        allowedFormats: ['jpeg', 'jpg', 'png'],
        filename: function (req, file, cb) {
            cb(null, file.originalname); 
        },
        params: {
            folder: ConfigEnv.CLOUDINARY_DIRECTORY,
            transformation: [
                { 
                    format: 'jpeg'  // Chuyển đổi sang định dạng JPEG
                }
            ]
        }
    })


    // KIEN TRA FILE TON TAI TREN CLOUD
    async exists(public_id) {
        try {
            let result = await cloudinary.api.resource(public_id);
            return {status: true, result};


        } catch (err) {
            return {status: false, result: null};
        }
    }



    // XOÁ ĐƠN FILE TRÊN CLOUD
    async destroy(path = '') {
        try {
            let status = await cloudinary.api.delete_resources_by_prefix(path);
            return {status: true, message: 'Delete image successfully'};


        } catch (err) {
            return {status: false, message: 'Delete image unsuccessfully'};
        }
    }

    // XOÁ NHIỀU FILE TRÊN CLOUD
    async destroyMany(images = []) {
        try {
            let status = await cloudinary.api.delete_resources(images);
            return { status: true, message: 'Delete many images successfully'};

        } catch (error) {
            return {status: false, message: 'Delete many images unsuccessfully',error};
        }
    }

    // Upload file lên Cloudinary
    async upload(file) {
        try {
            const result = await cloudinary.uploader.upload(file.path, {
                folder: ConfigEnv.CLOUDINARY_DIRECTORY,
                resource_type: 'auto', // Tự động phát hiện loại file
            });
            return { status: true, url: result.secure_url, public_id: result.public_id };
        } catch (err) {
            return { status: false, message: 'Upload failed', error: err };
        }
    }
}

module.exports = new CLOUDINARY();