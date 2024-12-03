document.addEventListener('DOMContentLoaded', () => {
  const sky = document.getElementById('sky');

  // Fetch the first image from the backend
  fetch('http://localhost:5000/api/images') // Adjust the endpoint if needed
    .then((response) => response.json())
    .then((images) => {
      if (images && images.length > 0) {
        const firstImage = images[0]; // Fetch the first image
        console.log('Loading image:', firstImage.name);

        // Set the base64 data as the background for the sky
        sky.setAttribute('src', firstImage.base64);
      } else {
        console.error('No images found in the database');
      }
    })
    .catch((error) => {
      console.error('Error fetching images:', error);
    });
});
