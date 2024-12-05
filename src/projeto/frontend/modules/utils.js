
export function getImage(img) {

    // Endpoint returning the image URL
    const apiUrl = 'http://localhost:5000/api/images/' + img;

    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
        throw new Error('Failed to fetch the image URL');
        }
        return response.json();
    })
    .then(data => {
        const imageUrl = data;

        sky.setAttribute("src", imageUrl);
    })
    .catch(error => {
        console.error('Error:', error);
    });

}