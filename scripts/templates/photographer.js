function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/IDPhotos/${portrait}`;

    function getUserCardDOM() {
        const photographerCard = document.createElement('article');
        const photographerLink = document.createElement('a');
        photographerLink.setAttribute("href", "#");
        const photographerIdPhoto = document.createElement('img');
        photographerIdPhoto.setAttribute("src", picture);
        photographerIdPhoto.setAttribute("alt", name);
        const photographerName = document.createElement('h2');
        photographerName.textContent = name;
        const photographerDetails = document.createElement('div');
        photographerDetails.classList.add("details");
        const photographerLocation = document.createElement('span');
        photographerLocation.textContent = city + ", " + country;
        photographerLocation.classList.add("location");
        const photographerTagline = document.createElement('span');
        photographerTagline.textContent = tagline;
        photographerTagline.classList.add("tagline");
        const photographerPrice = document.createElement('span');
        photographerPrice.textContent = price + "€/jour";
        photographerPrice.classList.add("price");
        photographerLink.appendChild(photographerIdPhoto);
        photographerLink.appendChild(photographerName);
        photographerCard.appendChild(photographerLink);
        photographerDetails.appendChild(photographerLocation);
        photographerDetails.appendChild(photographerTagline);
        photographerDetails.appendChild(photographerPrice);
        photographerCard.appendChild(photographerDetails);
        return photographerCard;
    }
    return { name, picture, getUserCardDOM };
}