const express = require('express');
const { fetchImagesFromS3, fetchImageByName } = require('../controllers/imageController');
const router = express.Router();

// Fetch all images
router.get('/images', async (req, res) => {
  try {
    const bucket = process.env.SUPABASE_BUCKET;
    const images = await fetchImagesFromS3(bucket);
    res.json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

// Fetch a single image by name
router.get('/images/:imageName', async (req, res) => {
  const { imageName } = req.params;

  try {
    const bucket = process.env.SUPABASE_BUCKET;
    const image = await fetchImageByName(bucket, imageName);
    res.json(image);
  } catch (error) {
    console.error(`Error fetching image ${imageName}:`, error.message);
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
