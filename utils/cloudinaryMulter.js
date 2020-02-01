const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
var Person = require('../models/person')

cloudinary.config({
    cloud_name: 'ishant',
    api_key: '197661493971768',
    api_secret: process.env.CLOUDINARY_API_KEY
});

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "images_disaster_project",
    allowedFormats: ["jpg", "jpeg", "png"],
    transformation: [{
        width: 500,
        height: 500,
        crop: "limit"
    }]
});

const parser = multer({
    storage: storage
});

module.exports = {
    parser
}