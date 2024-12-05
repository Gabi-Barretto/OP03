const { fetchImagesFromS3, uploadToSupabaseS3 } = require('../services/s3Service');
const { createProgressBar } = require('../utils/progressUtil');
const path = require('path');
const fs = require('fs');


console.log(`⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⠴⠲⠲⠦⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠞⠁⢤⣸⡄⠀⠆⠙⢦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠋⠀⠙⠊⠀⠙⢢⡤⠄⡄⢱⡄⢀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⠃⠀⠀⠀⢀⣀⣠⣤⣿⣤⣤⣶⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣶⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣴⣾⣶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣴⣶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣉⣀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⢀⣤⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⢰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠏⠛⠈⠛⠛⠻⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠉⠀⠀⠀⠀⠀⢀⣤⠀⠀⠙⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠱⣤⣀⠀⠀⠀⣠⣻⠏⠀⠀⠀⠀⢻⣿⣿⣿⡿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠁⠸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡆⠀⠙⠛⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣧⣴⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣥⠖⢉⡓⢤⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⡇⠀⠀⠀⠀⠀⣀⣀⡠⢤⣤⢄⠀⠀⡴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⢋⣩⡴⠟⠛⠻⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⣴⣶⣽⠟⠿⠉⠋⠉⠀⠻⣷⡴⠁⡜⠉⠛⢿⣿⣿⠿⠛⢋⣩⡴⠾⠛⠉⠀⠀⠀⠀⠈⠑⠦⡀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⣀⣠⡊⠹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⣴⣽⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠜⠀⢀⡠⠔⠋⢀⣠⠶⠋⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠳⣄⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⣰⠋⢿⡀⠀⣏⢿⣿⣿⣿⣿⣿⣿⣿⡿⠟⠁⢈⢄⠀⠀⠀⠀⠀⠀⠀⣀⡠⢒⣉⠴⠂⠉⣀⡴⠞⢻⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠣⡀⠀⠀⠀
    ⠀⠀⠀⠀⣰⠁⠈⢾⣧⡀⣘⣄⠈⢯⡉⢉⣿⠋⠉⠀⠀⠀⠀⠁⠉⠖⠢⠄⠔⢒⡩⠵⠂⠉⣀⣤⠶⠋⠁⠀⠀⠘⣦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠱⡀⠀⠀
    ⠀⠀⠀⠀⢧⣤⣤⡤⠛⢉⢄⡮⣦⣄⠈⠙⠣⢄⣠⠞⠉⠉⢩⢩⡷⠤⠤⠒⠊⠁⣠⣤⠶⠛⠉⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢱⡀⠀
    ⠀⠀⠀⠀⢸⡧⣿⣶⣨⠒⣁⠀⡇⣨⣿⠶⣤⣤⣿⠤⡤⡄⢸⢸⣇⣤⣤⡴⠚⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢃⠀
    ⠀⣀⣄⣰⠋⢠⣺⠞⠀⠀⠀⠀⣧⢼⣿⣀⠖⢹⡇⢸⢸⡝⠉⠉⢀⢔⣋⠹⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢾⢵⠀⠀⠀⠀⠀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡀
    ⠀⢿⡀⠈⠳⣵⠁⡠⢄⠀⠀⢀⣸⣴⣇⠇⠀⠈⢧⣼⣾⣁⡀⠀⡈⡞⠛⣌⣀⣀⣀⣀⣀⣀⣀⣀⠀⢀⣀⣀⣀⣼⣃⣀⣀⣀⣀⣀⣀⡗⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇
    ⢀⣼⡋⣶⣄⢈⡿⠀⠈⣷⠀⡏⣼⣿⣿⠀⠈⣿⣿⣿⣿⣿⡇⠀⡇⢸⣤⢿⣏⣉⣉⣉⣉⣉⣉⡉⣉⢉⠉⠉⠉⠉⠉⠉⠉⠉⠉⣹⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇
    ⢸⡆⠉⠉⠉⠁⢀⣠⣾⠏⠀⣿⣿⣿⣿⢠⠘⠛⡛⢛⣛⠛⠃⠀⠃⠀⣉⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣦⣖⣄⡀⡀⠀⠀⠀⠈⣇⠀⠀⠀⠀⠀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡇
    ⠀⠉⢲⠲⣖⠊⠉⠉⠀⠀⠀⣿⣿⣿⣿⡾⠀⢸⡇⢸⢸⠀⠀⠀⠀⠀⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣶⣿⣶⣶⣾⣷⣲⣖⡖⢺⡽⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠁
    ⠀⠀⠈⢳⣽⣆⠀⠀⠀⠀⠀⣾⣿⣿⣿⣇⠀⠈⠳⠾⠞⠀⠀⢠⢰⠀⣰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠿⠛⣋⣉⣷⣼⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀
    ⠀⠀⠀⠀⠙⢝⢢⡀⠀⠀⠀⠙⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⢛⣛⡭⠔⠒⠋⠉⠀⠀⠈⡅⠈⠓⠒⢿⡀⠀⠀⠀⠀⣠⠇⠀
    ⠀⠀⠀⠀⠀⠀⠙⠻⢦⣄⣀⣀⣀⣉⣓⣭⣍⣉⡙⠛⠛⠻⠿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡽⠞⠛⠉⠀⠀⠀⠀⠀⠀⠀⢀⠀⡇⠀⠀⠀⠀⠙⠒⠓⠒⠚⠁⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣦⣨⡭⠙⢛⣿⠿⣟⡛⠉⠉⠉⠉⠉⢹⠀⠀⠘⠛⠛⢻⣇⠀⠀⠀⠀⠀⠀⠀⠄⢲⣎⠀⠀⢻⠓⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣯⢾⠀⢠⣿⠁⠀⠀⠀⠀⠀⠀⠀⠀⡞⠀⠀⠀⠀⠀⠀⠹⣧⠀⠀⠀⠀⠀⠀⠀⠀⣻⠆⠀⠸⡇⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠛⠒⠒⠓⠒⠒⠒⠒⠒⠒⠂⠀⠉⠁⠀⠀⠀⠀⠀⠀⠀⠛⠒⠲⠶⠦⠤⠤⠤⠤⠽⠭⠤⠼⠵⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    Scanning images folder... 
    `);
    

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

const fetchImageByName = async (bucket, imageName) => {
  try {
    const images = await fetchImagesFromS3(bucket);
    const image = images.find((img) => img.name === imageName);

    if (!image) {
      throw new Error(`Image with name ${imageName} not found`);
    }

    return image;
  } catch (error) {
    console.error(`Error fetching image ${imageName}:`, error);
    throw new Error('Failed to fetch image');
  }
};

module.exports = { syncImages, fetchImagesFromS3, fetchImageByName };
