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
    fetch('images/files.csv')
        .then(response => response.text())
        .then(data => {
            // Parse CSV data
            const rows = data.split('\n');
            const headers = rows[0].split(',');
            const filenameIndex = headers.indexOf('filename');
            const filenames = rows.slice(1).map(row => row.split(',')[filenameIndex]);

            
            // Loop through the image filenames and create image elements
            filenames.forEach(filename => {
                const imagePath = 'images/' + filename.trim(); // Path to the image file
                const img = document.createElement('img');
                const imgContainer = document.createElement('div');
                imgContainer.className = 'img-container';
                img.src = imagePath;
                img.addEventListener('click', () => openLightbox(imagePath));
                imgContainer.appendChild(img);
                gallery.appendChild(imgContainer);
            });
            
        })
        .catch(error => console.error('Error fetching CSV file:', error));
});
