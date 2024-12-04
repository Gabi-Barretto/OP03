document.addEventListener("DOMContentLoaded", () => {
  const sky = document.getElementById("sky");

  // Function to convert Base64 to Blob
  const base64ToBlob = (base64, mimeType) => {
    console.log("Base64 string:", base64.slice(0, 50) + "...");
    const byteCharacters = atob(base64.split(",")[1]);
    const byteNumbers = Array.from(byteCharacters, (char) => char.charCodeAt(0));
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  };

  // Fetch images from the backend
  fetch("http://localhost:5000/api/images")
    .then((response) => response.json())
    .then((images) => {
      if (images && images.length > 0) {
        console.log("Fetched images:", images);

        const firstImage = images[0];
        if (firstImage && firstImage.base64) {
          // Check MIME type and prepend if missing
          let base64 = firstImage.base64;
          if (!base64.startsWith("data:image/")) {
            console.warn("MIME type missing from Base64 string. Prepending...");
            base64 = `data:image/jpeg;base64,${base64}`;
          }

          const mimeType = base64.includes("data:image/png")
            ? "image/png"
            : "image/jpeg";
          const blob = base64ToBlob(base64, mimeType);
          const blobURL = URL.createObjectURL(blob);

          console.log("Blob URL:", blobURL);

          // Add Blob URL for debugging (optional)
          const testImg = document.createElement("img");
          testImg.src = blobURL;
          testImg.style.width = "200px";
          testImg.style.margin = "10px";
          document.body.appendChild(testImg);

          // Set the Blob URL to <a-sky>
          sky.setAttribute("src", blobURL);
          console.log(`Displayed image: ${firstImage.name}`);
        } else {
          console.error("No valid Base64 image found in the database");
        }
      } else {
        console.error("No images found in the database");
      }
    })
    .catch((error) => {
      console.error("Error fetching images:", error);
    });
});
