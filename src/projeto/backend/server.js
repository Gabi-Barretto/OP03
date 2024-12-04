const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const express = require('express');
const fs = require('fs');
const { Pool } = require('pg');
const cliProgress = require('cli-progress');


const app = express();


app.use(express.json());

const pool = new Pool({
  connectionString: process.env.SUPABASE_DB_URL,
});

pool.on('connect', () => {
  console.log('Connected to the database.');
});


const insertImage = async (name, base64) => {
  try {
    await pool.query(
      'INSERT INTO private.images (name, base64) VALUES ($1, $2)',
      [name, base64]
    );
  } catch (error) {
    console.error('Error inserting image:', error);
  }
};


const syncImages = async () => {
  try {
    const imagesDir = path.join(__dirname, '../public/images');
    const files = fs.readdirSync(imagesDir);

    console.log('Scanning images folder...');

    // Create a progress bar
    const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    progressBar.start(files.length, 0);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const filePath = path.join(imagesDir, file);
      const fileStat = fs.statSync(filePath);

      if (fileStat.isFile()) {
        const imageName = file;

        try {
          // Check if the image already exists in the database
          const res = await pool.query('SELECT * FROM private.images WHERE name = $1', [imageName]);

          if (res.rowCount === 0) {
            // Convert the image to Base64
            const base64 = fs.readFileSync(filePath, { encoding: 'base64' });
            const mimeType = `image/${path.extname(file).slice(1)}`; // e.g., image/jpeg
            const base64Data = `data:${mimeType};base64,${base64}`;

            // Insert image into the database
            await insertImage(imageName, base64Data);

            console.log(`Uploaded: ${imageName}`);
          } else {
            console.log(`Already in database: ${imageName}`);
          }
        } catch (queryError) {
          console.error(`Error processing image ${imageName}:`, queryError);
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


app.get('/api/images', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM private.images');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await syncImages();
  console.log('All processes are done. The server is fully operational.');
});
