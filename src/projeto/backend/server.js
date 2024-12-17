const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const imageRoutes = require('./routes/imageRoutes');
const { syncLocalImagesWithSupabase } = require('./services/s3Service');

dotenv.config({ path: '.env' });

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files (HTML, CSS, JS, etc.) from the "public" directory
app.use(express.static(path.join(__dirname, '../frontend')));
app.use("/public", express.static(path.join(__dirname, '../public')));


// Handle the root request to serve the main HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));  // Update with your main HTML file name
});

app.use('/api', imageRoutes);


const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  const bucket = process.env.SUPABASE_BUCKET;
  await syncLocalImagesWithSupabase(bucket);
});
