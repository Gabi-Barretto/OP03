const path = require('path');
const fs = require('fs');
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const s3Client = require('../config/s3Config');
const { getFallbackMimeType } = require('../utils/mimeUtil');
const { createProgressBar } = require('../utils/progressUtil');

console.log(`⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⠴⠲⠲⠦⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠞⠁⢤⣸⡄⠀⠆⠙⢦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠋⠀⠙⠊⠀⠙⢢⡤⠄⡄⢱⡄⢀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⠃⠀⠀⠀⢀⣀⣠⣤⣿⣤⣤⣶⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣶⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣴⣾⣶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣴⣶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣉⣀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⢀⣤⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⢰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠏⠛⠈⠛⠛⠻⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠉⠀⠀⠀⠀⠀⢀⣤⠀⠀⠙⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠱⣤⣀⠀⠀⠀⣠⣻⠏⠀⠀⠀⠀⢻⣿⣿⣿⡿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠁⠸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡆⠀⠙⠛⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣧⣴⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣥⠖⢉⡓⢤⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⡇⠀⠀⠀⠀⠀⣀⣀⡠⢤⣤⢄⠀⠀⡴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⢋⣩⡴⠟⠛⠻⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⣴⣶⣽⠟⠿⠉⠋⠉⠀⠻⣷⡴⠁⡜⠉⠛⢿⣿⣿⠿⠛⢋⣩⡴⠾⠛⠉⠀⠀⠀⠀⠈⠑⠦⡀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⣀⣠⡊⠹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⣴⣽⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠜⠀⢀⡠⠔⠋⢀⣠⠶⠋⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠳⣄⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⣰⠋⢿⡀⠀⣏⢿⣿⣿⣿⣿⣿⣿⣿⡿⠟⠁⢈⢄⠀⠀⠀⠀⠀⠀⠀⣀⡠⢒⣉⠴⠂⠉⣀⡴⠞⢻⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠣⡀⠀⠀⠀
    ⠀⠀⠀⠀⣰⠁⠈⢾⣧⡀⣘⣄⠈⢯⡉⢉⣿⠋⠉⠀⠀⠀⠀⠁⠉⠖⠢⠄⠔⢒⡩⠵⠂⠉⣀⣤⠶⠋⠁⠀⠀⠘⣦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠱⡀⠀⠀
    ⠀⠀⠀⠀⢧⣤⣤⡤⠛⢉⢄⡮⣦⣄⠈⠙⠣⢄⣠⠞⠉⠉⢩⢩⡷⠤⠤⠒⠊⠁⣠⣤⠶⠛⠉⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢱⡀⠀
    ⠀⠀⠀⠀⢸⡧⣿⣶⣨⠒⣁⠀⡇⣨⣿⠶⣤⣤⣿⠤⡤⡄⢸⢸⣇⣤⣤⡴⠚⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢃⠀
    ⠀⣀⣄⣰⠋⢠⣺⠞⠀⠀⠀⠀⣧⢼⣿⣀⠖⢹⡇⢸⢸⡝⠉⠉⢀⢔⣋⠹⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢾⢵⠀⠀⠀⠀⠀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡀
    ⠀⢿⡀⠈⠳⣵⠁⡠⢄⠀⠀⢀⣸⣴⣇⠇⠀⠈⢧⣼⣾⣁⡀⠀⡈⡞⠛⣌⣀⣀⣀⣀⣀⣀⣀⠀⢀⣀⣀⣀⣼⣃⣀⣀⣀⣀⣀⣀⡗⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇
    ⢀⣼⡋⣶⣄⢈⡿⠀⠈⣷⠀⡏⣼⣿⣿⠀⠈⣿⣿⣿⣿⣿⡇⠀⡇⢸⣤⢿⣏⣉⣉⣉⣉⣉⣉⡉⣉⢉⠉⠉⠉⠉⠉⠉⠉⠉⣹⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇
    ⢸⡆⠉⠉⠉⠁⢀⣠⣾⠏⠀⣿⣿⣿⣿⢠⠘⠛⡛⢛⣛⠛⠃⠀⠃⠀⣉⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣦⣖⣄⡀⡀⠀⠀⠀⠈⣇⠀⠀⠀⠀⠀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡇
    ⠀⠉⢲⠲⣖⠊⠉⠉⠀⠀⠀⣿⣿⣿⣿⡾⠀⢸⡇⢸⢸⠀⠀⠀⠀⠀⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣶⣿⣶⣶⣾⣷⣲⣖⡖⢺⡽⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠁
    ⠀⠀⠈⢳⣽⣆⠀⠀⠀⠀⠀⣾⣿⣿⣿⣇⠀⠈⠳⠾⠞⠀⠀⢠⢰⠀⣰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠿⠛⣋⣉⣷⣼⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀
    ⠀⠀⠀⠀⠙⢝⢢⡀⠀⠀⠀⠙⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⢛⣛⡭⠔⠒⠋⠉⠀⠀⠈⡅⠈⠓⠒⢿⡀⠀⠀⠀⠀⣠⠇⠀
    ⠀⠀⠀⠀⠀⠀⠙⠻⢦⣄⣀⣀⣀⣉⣓⣭⣍⣉⡙⠛⠛⠻⠿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡽⠞⠛⠉⠀⠀⠀⠀⠀⠀⠀⢀⠀⡇⠀⠀⠀⠀⠙⠒⠓⠒⠚⠁⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣦⣨⡭⠙⢛⣿⠿⣟⡛⠉⠉⠉⠉⠉⢹⠀⠀⠘⠛⠛⢻⣇⠀⠀⠀⠀⠀⠀⠀⠄⢲⣎⠀⠀⢻⠓⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣯⢾⠀⢠⣿⠁⠀⠀⠀⠀⠀⠀⠀⠀⡞⠀⠀⠀⠀⠀⠀⠹⣧⠀⠀⠀⠀⠀⠀⠀⠀⣻⠆⠀⠸⡇⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠛⠒⠒⠓⠒⠒⠒⠒⠒⠒⠂⠀⠉⠁⠀⠀⠀⠀⠀⠀⠀⠛⠒⠲⠶⠦⠤⠤⠤⠤⠽⠭⠤⠼⠵⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    Scanning images folder...
    `);


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
  return [
    {
      name: '1.jpg',
      url: 'https://nshnjknplbtlaolcimgh.supabase.co/storage/v1/object/public/Images/1.jpg?t=2024-12-06T12%3A05%3A40.993Z'
    },
    {
      name: '2.jpg',
      url: 'https://nshnjknplbtlaolcimgh.supabase.co/storage/v1/object/public/Images/2.jpg'
    },
    {
      name: '3.jpg',
      url: 'https://nshnjknplbtlaolcimgh.supabase.co/storage/v1/object/public/Images/3.jpg?t=2024-12-06T12%3A06%3A23.593Z'
    },
    {
      name: '4.jpg',
      url: 'https://nshnjknplbtlaolcimgh.supabase.co/storage/v1/object/public/Images/4.jpg?t=2024-12-06T12%3A06%3A31.098Z'
    },
    {
      name: '5.jpg',
      url: 'https://nshnjknplbtlaolcimgh.supabase.co/storage/v1/object/public/Images/5.jpg?t=2024-12-06T12%3A06%3A43.675Z'
    },
    {
      name: '6.jpg',
      url: 'https://nshnjknplbtlaolcimgh.supabase.co/storage/v1/object/public/Images/6.jpg'
    }
  ];
};

const fetchImageByName = async (bucket, imageName) => {
  const images = [
    {
      name: '1.jpg',
      url: 'https://nshnjknplbtlaolcimgh.supabase.co/storage/v1/object/public/Images/1.jpg?t=2024-12-06T12%3A05%3A40.993Z'
    },
    {
      name: '2.jpg',
      url: 'https://nshnjknplbtlaolcimgh.supabase.co/storage/v1/object/public/Images/2.jpg'
    },
    {
      name: '3.jpg',
      url: 'https://nshnjknplbtlaolcimgh.supabase.co/storage/v1/object/public/Images/3.jpg?t=2024-12-06T12%3A06%3A23.593Z'
    },
    {
      name: '4.jpg',
      url: 'https://nshnjknplbtlaolcimgh.supabase.co/storage/v1/object/public/Images/4.jpg?t=2024-12-06T12%3A06%3A31.098Z'
    },
    {
      name: '5.jpg',
      url: 'https://nshnjknplbtlaolcimgh.supabase.co/storage/v1/object/public/Images/5.jpg?t=2024-12-06T12%3A06%3A43.675Z'
    },
    {
      name: '6.jpg',
      url: 'https://nshnjknplbtlaolcimgh.supabase.co/storage/v1/object/public/Images/6.jpg'
    }
  ];

  const image = images.find((img) => img.name === imageName);
  if (!image) {
    throw new Error(`Image with name ${imageName} not found`);
  }
  return image;
};

const syncImages = async () => {
  try {
    const imagesDir = path.join(__dirname, '../../public/images');
    const files = fs.readdirSync(imagesDir);

    console.log(`Scanning images folder...`);

    const progressBar = createProgressBar(files.length);

    for (const file of files) {
      const filePath = path.join(imagesDir, file);
      const fileStat = fs.statSync(filePath);

      if (fileStat.isFile()) {
        const bucket = process.env.SUPABASE_BUCKET;
        const result = await uploadToSupabaseS3(bucket, file, filePath);

        if (result) console.log(`Uploaded: ${file}`);
        else console.log(`Failed to upload: ${file}`);
      }

      progressBar.increment();
    }

    progressBar.stop();
    console.log('Image sync complete.');
  } catch (error) {
    console.error('Error syncing images:', error);
  }
};

module.exports = { syncImages, fetchImagesFromS3, fetchImageByName };
