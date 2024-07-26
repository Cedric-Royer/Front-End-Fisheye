import { getMediaImagePath, getMediaVideoPath } from '../utils/paths.js';

function mediaTemplate(data) {
    const { title, image, video, likes } = data;

    const mediaImagePath = getMediaImagePath(image);
    const mediaVideoPath = getMediaVideoPath(video);

    function getMediaElement(index) {
        const mediaElement = document.createElement('div');
        mediaElement.classList.add('media-item');

        if (image) {
            const link = document.createElement('a');
            link.href = '#';
            link.setAttribute("arial-label", `${title} voir en plus grand`);
            link.addEventListener('click', (event) => {
                event.preventDefault();
                window.openCarousel(index);
            });

            const img = document.createElement('img');
            img.src = mediaImagePath;
            img.alt = title;
            img.loading = 'lazy';

            link.appendChild(img);
            mediaElement.appendChild(link);
        } else if (video) {
            const link = document.createElement('a');
            link.href = '#';
            link.addEventListener('click', (event) => {
                event.preventDefault();
                window.openCarousel(index);
            });

            const videoElement = document.createElement('video');
            videoElement.src = mediaVideoPath;
            videoElement.controls = false;

            link.appendChild(videoElement);
            mediaElement.appendChild(link);
        }

        const titleLikesContainer = document.createElement('div');
        titleLikesContainer.classList.add('title-likes-container');

        const mediaTitle = document.createElement('h2');
        mediaTitle.textContent = title;
        mediaTitle.setAttribute("lang", "en");
        titleLikesContainer.appendChild(mediaTitle);

        const mediaLikes = document.createElement('p');
        const likesText = document.createElement('span');
        likesText.textContent = `${likes}`;
        const likesIcon = document.createElement('i');
        likesIcon.classList.add('fa-solid', 'fa-heart', 'icon-like');
        likesIcon.setAttribute("aria-label", "j'aime");
        likesIcon.setAttribute("role", "button");
        mediaLikes.appendChild(likesText);
        mediaLikes.appendChild(likesIcon);
        titleLikesContainer.appendChild(mediaLikes);

        likesIcon.addEventListener('click', (event) => {
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
