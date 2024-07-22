import {getPhotographerPortraitPath, getPhotographerPagePath} from '../utils/paths.js';

function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const photographerPortraitPath = getPhotographerPortraitPath(portrait);
    const photographerPagePath = getPhotographerPagePath(id);

    function getPhotographerCard() {
        const photographerCard = document.createElement('article');

        const photographerLink = document.createElement('a');
        photographerLink.setAttribute("href", photographerPagePath);

        const photographerIdPhoto = document.createElement('img');
        photographerIdPhoto.setAttribute("src", photographerPortraitPath);
        photographerIdPhoto.setAttribute("alt", "");

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

    function getPhotographerHeader(container) {
        const photographerIdPhoto = document.createElement('img');
        photographerIdPhoto.setAttribute("src", photographerPortraitPath);
        photographerIdPhoto.setAttribute("alt", "");

        const photographerInfos = document.createElement('div');
        photographerInfos.classList.add("infos");

        const photographerName = document.createElement('h1');
        photographerName.textContent = name;

        const photographerLocation = document.createElement('span');
        photographerLocation.textContent = `${city}, ${country}`;
        photographerLocation.classList.add("location");

        const photographerTagline = document.createElement('span');
        photographerTagline.textContent = tagline;
        photographerTagline.classList.add("tagline");

        container.appendChild(photographerIdPhoto);
        photographerInfos.appendChild(photographerName);
        photographerInfos.appendChild(photographerLocation);
        photographerInfos.appendChild(photographerTagline);
        container.appendChild(photographerInfos);
    }

    return {getPhotographerCard, getPhotographerHeader};
}

export default photographerTemplate;