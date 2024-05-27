const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors= require("cors");
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');

// Load environment variables from .env file
dotenv.config();

// Import routes
// const imageRoutes = require('./routes/imageRoutes');
// const bookRoutes = require('./routes/bookRoutes');
const uploadImage = require('./uploadImage');

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
// app.use('/api/images', imageRoutes);
// app.use('/api/books', bookRoutes);



// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));




cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload-image', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Upload file to Cloudinary
  cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
    if (error) {
      console.error('Error uploading to Cloudinary:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(200).json({ url: result.url });
  }).end(req.file.buffer);
});


// Start server
const PORT = process.env.PORT || 6969;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
