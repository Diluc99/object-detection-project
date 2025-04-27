const express = require('express');
const cors = require('cors');
const multer = require('multer');
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// Configure AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const s3 = new AWS.S3();
const rekognition = new AWS.Rekognition();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// Ensure uploads directory exists
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Endpoint to handle image upload and detection
app.post('/detect', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    // Upload to S3
    const fileContent = fs.readFileSync(req.file.path);
    const s3FileName = `images/${Date.now()}-${path.basename(req.file.path)}`;
    
    await s3.upload({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: s3FileName,
      Body: fileContent
    }).promise();

    // Detect objects using Rekognition
    const params = {
      Image: {
        S3Object: {
          Bucket: process.env.S3_BUCKET_NAME,
          Name: s3FileName
        }
      },
      MaxLabels: 10,
      MinConfidence: 70
    };

    const detectionResult = await rekognition.detectLabels(params).promise();
    
    // Clean up local file
    fs.unlinkSync(req.file.path);
    
    res.json({
      detectedObjects: detectionResult.Labels,
      imageName: s3FileName
    });
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).json({ error: 'Failed to process image' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});