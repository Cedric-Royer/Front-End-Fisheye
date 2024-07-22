function mediaTemplate(data) {
    const { id, photographerId, title, image, likes, date, price } = data;

    function getPhotographerMedia() {
        // Create the media element
        const mediaElement = document.createElement('div');
        mediaElement.classList.add('media-element');

        // Add image or video element
        //const mediaContent = document.createElement('img'); // Assuming it's an image, adjust if it could be a video
        //mediaContent.setAttribute('src', `assets/media/${image}`);
        //mediaContent.setAttribute('alt', title);
        //mediaElement.appendChild(mediaContent);

        // Add title
        const mediaTitle = document.createElement('h3');
        mediaTitle.textContent = title;
        mediaElement.appendChild(mediaTitle);

        // Add likes
        const mediaLikes = document.createElement('span');
        mediaLikes.textContent = likes;
        mediaElement.appendChild(mediaLikes);

        // Add date
        const mediaDate = document.createElement('span');
        mediaDate.textContent = date;
        mediaElement.appendChild(mediaDate);

        // Add price
        const mediaPrice = document.createElement('span');
        mediaPrice.textContent = `${price}€`;
        mediaElement.appendChild(mediaPrice);

        return mediaElement;
    }

    return { getPhotographerMedia };
}

export default mediaTemplate;
