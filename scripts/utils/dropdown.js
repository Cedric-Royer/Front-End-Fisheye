export function setupDropdown(displayPhotographerMedia) {
    const dropdownButton = document.querySelector('.dropbtn');
    const selectedOption = document.querySelector('#selected-option');
    const dropdownContent = document.querySelector('.dropdown-content');
    const chevronDown = dropdownButton.querySelector('.fa-chevron-down');
    const chevronUp = dropdownButton.querySelector('.fa-chevron-up');
    const dropdownLinks = document.querySelectorAll('.dropdown-content a');
    let focusedIndex = 0;
    let isDropdownOpen = false;

    function toggleDropdown() {
        const isOpen = dropdownContent.classList.contains('show');
        dropdownContent.classList.toggle('show');
        chevronDown.classList.toggle('hidden', isOpen);
        chevronUp.classList.toggle('hidden', !isOpen);
        dropdownButton.classList.toggle('hidden-option', isOpen);
        isDropdownOpen = !isOpen;

        if (!isOpen) {
            focusedIndex = 0;
            updateFocus();
        } else {
            dropdownButton.focus();
        }
    }

    dropdownButton.addEventListener('click', toggleDropdown);

    function handleSelection(link) {
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

        displayPhotographerMedia(sortBy)
            .then(() => {
                dropdownContent.classList.remove('show');
                dropdownButton.classList.remove('hidden-option');
                dropdownButton.focus();
                isDropdownOpen = false;
            });
    }

    dropdownLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            handleSelection(link);
        });
        
        link.addEventListener('focus', () => {
            link.classList.add('focused');
        });

        link.addEventListener('blur', () => {
            link.classList.remove('focused');
        });

        link.addEventListener('mouseover', () => {
            link.classList.add('focused');
        });

        link.addEventListener('mouseout', () => {
            link.classList.remove('focused');
        });
    });

    function updateFocus() {
        dropdownLinks.forEach((link, index) => {
            if (index === focusedIndex) {
                link.focus();
            } else {
                link.blur();
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
                    isDropdownOpen = false;
                    break;
            }
        } else if (event.key === 'Enter' || event.key === ' ') {
            if (document.activeElement === dropdownButton) {
                event.preventDefault();
                toggleDropdown();
            }
        }
    }

    function handleGlobalKeyboard(event) {
        if (event.key === 'Escape' && isDropdownOpen) {
            event.preventDefault();
            dropdownContent.classList.remove('show');
            dropdownButton.classList.remove('hidden-option');
            dropdownButton.focus();
            isDropdownOpen = false;
        }
    }

    function closeDropdown() {
        dropdownContent.classList.remove('show');
        chevronDown.classList.remove('hidden');
        chevronUp.classList.add('hidden');
        dropdownButton.classList.remove('hidden-option');
        dropdownButton.focus();
        isDropdownOpen = false;
        focusedIndex = 0; 
    }

    function handleClickOutside(event) {
        if (isDropdownOpen && !dropdownContent.contains(event.target) && !dropdownButton.contains(event.target)) {
            closeDropdown();
        }
    }

    document.addEventListener('click', handleClickOutside);
    dropdownButton.addEventListener('keydown', handleDropdownKeyboard);
    dropdownContent.addEventListener('keydown', handleDropdownKeyboard);
    document.addEventListener('keydown', handleGlobalKeyboard);
}
