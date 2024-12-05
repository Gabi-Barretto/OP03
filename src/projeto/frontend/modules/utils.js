
export function getImage(img) {

    // Endpoint returning the image URL
    const apiUrl = 'http://localhost:8080/api/images/' + img;

    console.log("daowpdapw");

    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
        throw new Error('Failed to fetch the image URL');
        }
        return response.json();
    })
    .then(data => {
        const imageUrl = data.url;

        sky.setAttribute("src", imageUrl);
    })
    .catch(error => {
        console.error('Error:', error);
    });

}