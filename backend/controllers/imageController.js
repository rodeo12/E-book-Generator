const cloudinary = require('../config/cloudinaryConfig');

// Controller to handle image upload
exports.uploadImage = async (req, res) => {
  try {
    const file = req.body.image; // Assuming image is sent as a base64 string
    const result = await cloudinary.uploader.upload(file, {
      folder: 'bribooks',
    });
    res.json({ url: result.secure_url });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload image', details: error.message });
  }
};
