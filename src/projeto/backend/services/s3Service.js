const fs = require('fs');
const path = require('path');
const { PutObjectCommand, ListObjectsV2Command, GetObjectCommand } = require('@aws-sdk/client-s3');
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
    const { Contents: files = [] } = await s3Client.send(command);

    return files.map((file) => ({
      name: file.Key,
      url: `https://${process.env.SUPABASE_S3_ENDPOINT}/storage/v1/object/public/${bucket}/${file.Key}?t=${encodeURIComponent(new Date().toISOString())}`,
    }));
  } catch (error) {
    console.error('Error fetching images from S3:', error);
    return [];
  }
};

/**
 * Downloads a file from Supabase S3 to the local file system.
 */
const downloadFromSupabaseS3 = async (bucket, fileName, localDir) => {
  try {
    const params = {
      Bucket: bucket,
      Key: fileName,
    };

    const command = new GetObjectCommand(params);
    const response = await s3Client.send(command);

    const localFilePath = path.join(localDir, fileName);
    const writeStream = fs.createWriteStream(localFilePath);

    return new Promise((resolve, reject) => {
      response.Body.pipe(writeStream)
        .on('error', (err) => {
          console.error(`Error writing file ${fileName} to disk:`, err);
          reject(err);
        })
        .on('close', () => {
          console.log(`Downloaded ${fileName} to ${localFilePath}`);
          resolve(localFilePath);
        });
    });
  } catch (error) {
    console.error(`Failed to download ${fileName} from Supabase S3:`, error);
    return null;
  }
};

/**
 * Scans the Supabase S3 bucket and checks if images are present locally.
 * If not, downloads the missing images.
 */
const syncLocalImagesWithSupabase = async (bucket) => {
  try {
    const localDir = path.resolve(__dirname, '../../public/images');
    
    // Ensure local directory exists
    if (!fs.existsSync(localDir)) {
      fs.mkdirSync(localDir, { recursive: true });
    }

    // Fetch images from S3
    const remoteImages = await fetchImagesFromS3(bucket);
    if (!remoteImages.length) {
      console.log('No images found in the specified bucket.');
      return;
    }

    // Get list of local images
    const localImages = fs.readdirSync(localDir).filter((file) => {
      // Optional: Add some filtering logic to ensure these are images if needed
      return fs.statSync(path.join(localDir, file)).isFile();
    });

    // Determine which images are missing locally
    const remoteImageNames = remoteImages.map(img => img.name);
    const missingImages = remoteImageNames.filter(fileName => !localImages.includes(fileName));

    if (missingImages.length === 0) {
      console.log('All images are up-to-date locally.');
      return;
    }

    console.log(`Found ${missingImages.length} missing images. Downloading...`);
    for (const fileName of missingImages) {
      await downloadFromSupabaseS3(bucket, fileName, localDir);
    }

    console.log('Local sync complete.');
  } catch (error) {
    console.error('Error syncing local images with Supabase:', error);
  }
};

module.exports = { uploadToSupabaseS3, fetchImagesFromS3, downloadFromSupabaseS3, syncLocalImagesWithSupabase };
