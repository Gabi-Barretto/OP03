const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  `https://${process.env.SUPABASE_HOST}`,
  process.env.SUPABASE_KEY
);

const fetchImages = async (bucket) => {
  try {
    const { data: files, error } = await supabase.storage.from(bucket).list();

    if (error) {
      console.error('Error fetching images from Supabase:', error);
      return { error };
    }

    return files.map((file) => ({
      name: file.name,
      url: `${process.env.SUPABASE_S3_ENDPOINT}/${bucket}/${file.name}`,
    }));
  } catch (error) {
    console.error('Error fetching images:', error);
    return { error: 'Failed to fetch images' };
  }
};

module.exports = { fetchImages };
