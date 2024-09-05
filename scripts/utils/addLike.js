export function addLike(likesText, mediaElement) {
    if (!mediaElement.hasAttribute('data-liked')) {
        let currentLikes = parseInt(likesText.textContent, 10);
        currentLikes++;
        likesText.textContent = `${currentLikes}`;
        mediaElement.setAttribute('data-liked', 'true');

        const totalLikesElement = document.getElementById('total-likes');
        let totalLikes = parseInt(totalLikesElement.textContent, 10);
        totalLikes++;
        totalLikesElement.textContent = `${totalLikes}`;
    }
}
