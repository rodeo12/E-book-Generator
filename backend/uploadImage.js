const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require("dotenv").config();

cloudinary.config({
    
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'uploads', // Optional folder for Cloudinary uploads
        allowed_formats: ['jpg', 'jpeg', 'png'] // Allowed image formats
    }
});

const upload = multer({ storage }).single('image');

function uploadImage(req, res) {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error uploading image' });
        }
        if (!req.file || !req.file.path) {
            return res.status(400).json({ error: 'No image file provided' });
        }

        const imageUrl = req.file.path;
        res.status(200).json({ imageUrl });
    });
}

module.exports = uploadImage;
