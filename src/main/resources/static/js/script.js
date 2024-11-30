document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const submitButton = contactForm.querySelector('button[type="submit"]');

    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (validateForm()) {
            disableSubmitButton(submitButton);
            await sendContactForm();
        } else {
            enableSubmitButton(submitButton);
        }
    });
});

function validateForm() {
    let isValid = true;

    const nameInput = document.getElementById('name');
    const phoneNumberInput = document.getElementById('phoneNumber');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const namePattern = /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/;
    const phonePattern = /^(?:\+48\s?\d{3}\s?\d{3}\s?\d{3}|\+48\d{9}|\d{9}|\d{3}\s?\d{3}\s?\d{3})$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const messagePattern = /^[\w\s.,;:'"\-ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/;

    if (!nameInput.value.trim() || nameInput.value.length > 12 || !namePattern.test(nameInput.value)) {
        isValid = false;
        alert('Proszę wprowadzić poprawne imię (maksymalnie 12 liter, bez cyfr i znaków specjalnych).');
    }

    if (!emailInput.value.trim() || emailInput.value.length > 25 || !emailPattern.test(emailInput.value)) {
        isValid = false;
        alert('Proszę wprowadzić poprawny adres email (maksymalnie 25 znaków).');
    }

    if (phoneNumberInput.value.trim() && !phonePattern.test(phoneNumberInput.value)) {
        isValid = false;
        alert('Proszę wprowadzić poprawny numer telefonu.');
    }

    if (!messageInput.value.trim() || messageInput.value.length > 500 || !messagePattern.test(messageInput.value)) {
        isValid = false;
        alert('Proszę wprowadzić poprawną wiadomość (maksymalnie 500 znaków).');
    }

    return isValid;
}

async function sendContactForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phoneNumber = document.getElementById('phoneNumber').value.trim();
    const message = document.getElementById('message').value.trim();

    const payload = {
        name: name,
        email: email,
        phoneNumber: phoneNumber ? phoneNumber : null,
        message: message
    };

    try {
        const response = await fetch('https://drewno-kominkowe-torun.pl/email/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            document.getElementById('contactForm').style.display = 'none';
            const formContainer = document.getElementsByClassName('form-container')[0];
            formContainer.classList.remove('form-container', 'custom-border');
            document.getElementsByClassName('successMessage')[0].style.display = 'block';
        } else {
            const errorMessage = await response.text();
            alert('Błąd podczas wysyłania emaila: ' + errorMessage);
        }
    } catch (error) {
        alert('Wystąpił błąd: ' + error.message);
    } finally {
        const submitButton = document.querySelector('button[type="submit"]');
        enableSubmitButton(submitButton);
    }
}

function disableSubmitButton(button) {
    button.disabled = true;
    button.innerText = 'Wysyłanie...';
    button.classList.add('btn-disabled');
}

function enableSubmitButton(button) {
    button.disabled = false;
    button.innerText = 'Wyślij';
    button.classList.remove('btn-disabled');
}

document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = [
        { type: 'Buk', id: 'addToCart1', lengthSelectId: 'bukLength', volumeSelectId: 'bukVolume' },
        { type: 'Dąb', id: 'addToCart2', lengthSelectId: 'dabLength', volumeSelectId: 'dabVolume' },
        { type: 'Grab', id: 'addToCart3', lengthSelectId: 'grabLength', volumeSelectId: 'grabVolume' },
        { type: 'Sosna', id: 'addToCart4', lengthSelectId: 'sosnaLength', volumeSelectId: 'sosnaVolume' },
        { type: 'Brzoza', id: 'addToCart5', lengthSelectId: 'brzozaLength', volumeSelectId: 'brzozaVolume' },
        { type: 'Drewno do rozpałki', id: 'addToCart6', lengthSelectId: 'rozpalkaQuantity' }
    ];

    addToCartButtons.forEach(button => {
        const addToCartButton = document.getElementById(button.id);
        if (addToCartButton) {
            addToCartButton.addEventListener('click', () => {
                const lengthSelect = document.getElementById(button.lengthSelectId);
                let volume = null;
                if (button.type !== 'Drewno do rozpałki') {
                    const volumeSelect = document.getElementById(button.volumeSelectId);
                    if (volumeSelect) {
                        volume = volumeSelect.value;
                    }
                }

                let price = 0;

                switch (button.type) {
                    case 'Buk':
                        price = 340 * parseInt(volume, 10);
                        break;
                    case 'Dąb':
                        price = 320 * parseInt(volume, 10);
                        break;
                    case 'Grab':
                        price = 390 * parseInt(volume, 10);
                        break;
                    case 'Sosna':
                        price = 250 * parseInt(volume, 10);
                        break;
                    case 'Brzoza':
                        price = 300 * parseInt(volume, 10);
                        break;
                    case 'Drewno do rozpałki':
                        price = 20 * parseInt(lengthSelect.value, 10);
                        break;
                    default:
                        price = 0;
                        break;
                }

                if (lengthSelect) {
                    const length = lengthSelect.value;
                    if (length) {
                        addToCart(button.type, length, volume, price);
                    } else {
                        alert('Nie wybrano rozmiaru drewna');
                    }
                } else {
                    console.error(`Element with ID ${button.lengthSelectId} not found.`);
                }
            });
        } else {
            console.error(`Element with ID ${button.id} not found.`);
        }
    });
});

function addToCart(productType, length, volume, price) {
    const product = {
        type: productType,
        volume: productType === 'Drewno do rozpałki' ? parseInt(length, 10) : parseInt(volume, 10),
        price: price
    };

    if (productType !== 'Drewno do rozpałki') {
        product.length = parseInt(length, 10);
    }

    const cart = getCart();
    cart.push(product);
    saveCart(cart);

    if (productType === 'Drewno do rozpałki') {
        showToast(`Dodano do koszyka: ${productType}, ${length} szt.`);
    } else {
        showToast(`Dodano do koszyka: ${productType}, ${length} cm, ${volume ? volume + ' mp' : ''}`);
    }
}

function deleteFromCart(productType, length) {
    let cart = getCart();
    cart = cart.filter(product => !(product.type === productType && product.length === parseInt(length)));
    saveCart(cart);
    alert(`Usunięto z koszyka: ${productType}, ${length} cm`);
}