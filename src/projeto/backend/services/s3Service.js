const fs = require('fs');
const path = require('path');
const { PutObjectCommand, ListObjectsV2Command } = require('@aws-sdk/client-s3');
const s3Client = require('../config/s3Config');
const { getFallbackMimeType } = require('../utils/mimeUtil');

const uploadToSupabaseS3 = async (bucket, fileName, filePath) => {
  try {
    const fileStream = fs.createReadStream(filePath);
    const contentType = getFallbackMimeType(fileName);

    const params = {
      Bucket: bucket,
      Key: fileName,
      Body: fileStream,
      ContentType: contentType,
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    console.log(`Uploaded to Supabase S3: ${fileName}`);
    return `https://${process.env.SUPABASE_S3_ENDPOINT}/storage/v1/object/public/${bucket}/${fileName}?t=${encodeURIComponent(new Date().toISOString())}`;
  } catch (err) {
    console.error(`Failed to upload ${fileName} to Supabase S3:`, err);
    return null;
  }
};

const fetchImagesFromS3 = async (bucket) => {
  try {
    const params = { Bucket: bucket };
    const command = new ListObjectsV2Command(params);
    const { Contents: files } = await s3Client.send(command);

    return files.map((file) => ({
      name: file.Key,
      url: `https://${process.env.SUPABASE_S3_ENDPOINT}/storage/v1/object/public/${bucket}/${file.Key}?t=${encodeURIComponent(new Date().toISOString())}`,
    }));
  } catch (error) {
    console.error('Error fetching images from S3:', error);
    return [];
  }
};

module.exports = { uploadToSupabaseS3, fetchImagesFromS3 };
