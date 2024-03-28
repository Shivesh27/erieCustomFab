document.addEventListener('DOMContentLoaded', function () {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const gallery = document.querySelector('.gallery');

    // Function to open the lightbox
    function openLightbox(imgSrc) {
        lightboxImg.src = imgSrc;
        lightbox.style.display = 'flex';
    }

    // Function to close the lightbox
    function closeLightbox() {
        lightbox.style.display = 'none';
    }

    // Close the lightbox when the close button is clicked
    document.querySelector('.close').addEventListener('click', closeLightbox);

    // Dynamically load images from the 'images' folder
    const folderPath = 'images';
    fetch(folderPath)
        .then(response => response.text())
        .then(text => {
            // Parse HTML response to get links to images
            const parser = new DOMParser();
            const htmlDoc = parser.parseFromString(text, 'text/html');
            const links = htmlDoc.querySelectorAll('a');

            console.log(htmlDoc)

            // Iterate over image links and add them to the gallery
            links.forEach(link => {
                const href = link.getAttribute('href');
                // Check if the href is a valid image file (you can adjust this regex as needed)
                if (/\.(jpg|jpeg|png|gif)$/i.test(href)) {
                    const imgSrc = link.getAttribute('href');
                    const img = document.createElement('img');
                    const imgContainer = document.createElement('div');
                    imgContainer.className = 'img-container';
                    img.src = imgSrc;
                    img.addEventListener('click', () => openLightbox(imgSrc));
                    imgContainer.appendChild(img);
                    gallery.appendChild(imgContainer);
                }
            });
        })
        .catch(error => console.error('Error loading images:', error));
});
