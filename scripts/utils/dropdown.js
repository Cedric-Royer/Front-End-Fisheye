export function setupDropdown(displayPhotographerMedia) {
    const dropdownButton = document.querySelector('.dropbtn');
    const selectedOption = document.querySelector('#selected-option');
    const dropdownContent = document.querySelector('.dropdown-content');
    const chevronDown = dropdownButton.querySelector('.fa-chevron-down');
    const chevronUp = dropdownButton.querySelector('.fa-chevron-up');
    const dropdownLinks = document.querySelectorAll('.dropdown-content a');
    let focusedIndex = 0;

    function toggleDropdown() {
        const isOpen = dropdownContent.classList.contains('show');
        dropdownContent.classList.toggle('show');
        chevronDown.classList.toggle('hidden', isOpen);
        chevronUp.classList.toggle('hidden', !isOpen);
        dropdownButton.classList.toggle('hidden-option', isOpen);

        if (!isOpen) {
            focusedIndex = 0;
            updateFocus();
        } else {
            dropdownButton.focus();
        }
    }

    dropdownButton.addEventListener('click', toggleDropdown);

    dropdownLinks.forEach((link, index) => {
        link.addEventListener('click', async (event) => {
            event.preventDefault();
            const sortBy = link.getAttribute('data-value');

            switch (sortBy) {
                case 'popularity':
                    selectedOption.textContent = 'Popularité';
                    break;
                case 'date':
                    selectedOption.textContent = 'Date';
                    break;
                case 'title':
                    selectedOption.textContent = 'Titre';
                    break;
                default:
                    selectedOption.textContent = 'Popularité';
            }

            await displayPhotographerMedia(sortBy);
            dropdownContent.classList.remove('show');
            dropdownButton.classList.remove('hidden-option');
            dropdownButton.focus();
        });

        link.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'ArrowDown':
                    event.preventDefault();
                    focusedIndex = (focusedIndex + 1) % dropdownLinks.length;
                    updateFocus();
                    break;
                case 'ArrowUp':
                    event.preventDefault();
                    focusedIndex = (focusedIndex - 1 + dropdownLinks.length) % dropdownLinks.length;
                    updateFocus();
                    break;
                case 'Enter':
                case ' ':
                    event.preventDefault();
                    dropdownLinks[focusedIndex].click();
                    break;
            }
        });
    });

    function updateFocus() {
        dropdownLinks.forEach((link, index) => {
            if (index === focusedIndex) {
                link.focus();
            }
        });
    }

    function handleDropdownKeyboard(event) {
        if (dropdownContent.classList.contains('show')) {
            switch (event.key) {
                case 'ArrowDown':
                    event.preventDefault();
                    focusedIndex = (focusedIndex + 1) % dropdownLinks.length;
                    updateFocus();
                    break;
                case 'ArrowUp':
                    event.preventDefault();
                    focusedIndex = (focusedIndex - 1 + dropdownLinks.length) % dropdownLinks.length;
                    updateFocus();
                    break;
                case 'Escape':
                    event.preventDefault();
                    dropdownContent.classList.remove('show');
                    dropdownButton.classList.remove('hidden-option');
                    dropdownButton.focus();
                    break;
            }
        } else if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleDropdown();
        }
    }

    // Attacher l'écouteur d'événements pour la touche Escape
    document.addEventListener('keydown', handleDropdownKeyboard);
}
