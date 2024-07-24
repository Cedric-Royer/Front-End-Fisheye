function mediaTemplate(data) {
    const { title, image, video, likes, date } = data;

    function getMediaElement() {
        const mediaElement = document.createElement('div');
        mediaElement.classList.add('media-item');

        if (image) {
            const img = document.createElement('img');
            img.src = `./assets/photographers/Media/${image}`;
            img.alt = title;
            img.loading = 'lazy';
            mediaElement.appendChild(img);
        } else if (video) {
            const videoElement = document.createElement('video');
            videoElement.src = `./assets/photographers/Media/${video}`;
            mediaElement.appendChild(videoElement);
        }

        const titleLikesContainer = document.createElement('div');
        titleLikesContainer.classList.add('title-likes-container');

        const mediaTitle = document.createElement('h3');
        mediaTitle.textContent = title;
        titleLikesContainer.appendChild(mediaTitle);

        const mediaLikes = document.createElement('p');
        const likesText = document.createElement('span');
        likesText.textContent = `${likes}`;
        const likesIcon = document.createElement('i');
        likesIcon.classList.add('fa-solid', 'fa-heart','icon-like');
        likesIcon.setAttribute("aria-label", "j'aime");
        likesIcon.setAttribute("role", "button");
        mediaLikes.appendChild(likesText);
        mediaLikes.appendChild(likesIcon);
        titleLikesContainer.appendChild(mediaLikes);

        likesIcon.addEventListener('click', () => {
            let currentLikes = parseInt(likesText.textContent);
            currentLikes++;
            likesText.textContent = `${currentLikes}`;
        });        

        mediaElement.appendChild(titleLikesContainer);

        return mediaElement;
    }

    return { getMediaElement };
}

export default mediaTemplate;
