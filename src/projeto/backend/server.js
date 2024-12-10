const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const imageRoutes = require('./routes/imageRoutes');
const { syncLocalImagesWithSupabase } = require('./services/s3Service');

dotenv.config({ path: '.env' });

const app = express();
app.use(cors());
app.use(express.json());


app.use('/api', imageRoutes);


const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  const bucket = process.env.SUPABASE_BUCKET;
  await syncLocalImagesWithSupabase(bucket);
});
