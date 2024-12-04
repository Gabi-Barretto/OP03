const express = require('express');
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
const { createClient } = require('@supabase/supabase-js');
const { S3Client, PutObjectCommand, ListObjectsV2Command } = require('@aws-sdk/client-s3');
const cliProgress = require('cli-progress');
const cors = require('cors');
require('dotenv').config({ path: '.env' });

let mime; // Declare MIME globally
(async () => {
  mime = await import('mime'); // Dynamically import MIME
  mime = mime.default; // Use the default export from the ESM module
  console.log('MIME module loaded');
})();

// Log environment variables for debugging
console.log('SUPABASE_HOST:', process.env.SUPABASE_HOST);
console.log('SUPABASE_DB_URL:', process.env.SUPABASE_DB_URL);
console.log('SUPABASE_BUCKET:', process.env.SUPABASE_BUCKET);
console.log('SUPABASE_S3_ENDPOINT:', process.env.SUPABASE_S3_ENDPOINT);
console.log('SUPABASE_S3_REGION:', process.env.SUPABASE_S3_REGION);

// Initialize Express
const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL Connection
const pool = new Pool({
  connectionString: process.env.SUPABASE_DB_URL,
});

pool.on('connect', () => {
  console.log('Connected to the database.');
});

// Initialize Supabase client
const supabase = createClient(
  `https://${process.env.SUPABASE_HOST}`,
  process.env.SUPABASE_KEY
);

// Initialize S3 client for S3-compatible API
const s3Client = new S3Client({
  region: process.env.SUPABASE_S3_REGION,
  endpoint: process.env.SUPABASE_S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.SUPABASE_S3_ACCESS_KEY,
    secretAccessKey: process.env.SUPABASE_S3_SECRET_KEY,
  },
  forcePathStyle: true,
});

// Function to determine fallback MIME type
const getFallbackMimeType = (fileName) => {
  const extension = path.extname(fileName).toLowerCase();
  switch (extension) {
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.gif':
      return 'image/gif';
    case '.webp':
      return 'image/webp';
    default:
      return 'application/octet-stream';
  }
};

// Function to upload an image to Supabase S3-compatible storage
const uploadToSupabaseS3 = async (bucket, fileName, filePath) => {
  try {
    const fileStream = fs.createReadStream(filePath);

    // Wait for MIME module to load
    while (!mime) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    let contentType = mime.getType(filePath);

    if (!contentType) {
      contentType = getFallbackMimeType(fileName);
      console.log(`Fallback MIME type for ${fileName}: ${contentType}`);
    }

    const params = {
      Bucket: bucket,
      Key: fileName,
      Body: fileStream,
      ContentType: contentType,
    };

    const command = new PutObjectCommand(params);
    const response = await s3Client.send(command);

    console.log(`Uploaded to Supabase S3: ${fileName}`);
    return `https://${process.env.SUPABASE_S3_ENDPOINT}/${bucket}/${fileName}`;
  } catch (err) {
    console.error(`Failed to upload ${fileName} to Supabase S3:`, err);
    return null;
  }
};

// Function to sync images with Supabase storage
const syncImages = async () => {
  try {
    const imagesDir = path.join(__dirname, '../public/images');
    const files = fs.readdirSync(imagesDir);

    console.log('Scanning images folder...');

    const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    progressBar.start(files.length, 0);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const filePath = path.join(imagesDir, file);
      const fileStat = fs.statSync(filePath);

      if (fileStat.isFile()) {
        const imageName = file;

        try {
          const bucket = process.env.SUPABASE_BUCKET;
          const filePathInBucket = await uploadToSupabaseS3(bucket, imageName, filePath);

          if (filePathInBucket) {
            console.log(`Uploaded: ${imageName}`);
          } else {
            console.log(`Failed to upload: ${imageName}`);
          }
        } catch (error) {
          console.error(`Error processing image ${imageName}:`, error);
        }
      }

      progressBar.update(i + 1);
    }

    progressBar.stop();
    console.log('Image sync complete.');
  } catch (error) {
    console.error('Error syncing images:', error);
  }
};

// API Route to fetch images
app.get('/api/images', async (req, res) => {
  try {
    const bucket = process.env.SUPABASE_BUCKET;
    const params = { Bucket: bucket };

    const command = new ListObjectsV2Command(params);
    const { Contents: files } = await s3Client.send(command);

    const images = files.map((file) => ({
      name: file.Key,
      url: `${process.env.SUPABASE_S3_ENDPOINT}/${bucket}/${file.Key}`,
    }));

    res.json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await syncImages();
});
