const { S3Client } = require('@aws-sdk/client-s3');
require('dotenv').config();

const s3Client = new S3Client({
  region: process.env.SUPABASE_S3_REGION,
  endpoint: process.env.SUPABASE_S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.SUPABASE_S3_ACCESS_KEY,
    secretAccessKey: process.env.SUPABASE_S3_SECRET_KEY,
  },
  forcePathStyle: true,
});

module.exports = s3Client;
