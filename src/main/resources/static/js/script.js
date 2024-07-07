document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', async (event) => { // Dodano 'async' tutaj
        event.preventDefault();
        await sendContactForm();
    });
});


function validateForm(name, email, phoneNumber, message) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{9}$/;

    if (!name.trim()) {
        alert('Pole "Imię" nie może być puste.');
        return false;
    }
    if (!emailPattern.test(email)) {
        alert('Pole "Email" musi zawierać poprawny adres email.');
        return false;
    }
    if (phoneNumber && !phonePattern.test(phoneNumber)) {
        alert('Pole "Numer telefonu" musi zawierać 9 cyfr.');
        return false;
    }
    if (!message.trim()) {
        alert('Pole "Wiadomość" nie może być puste.');
        return false;
    }
    return true;
}

async function sendContactForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const message = document.getElementById('message').value;

    if (!validateForm(name, email, phoneNumber, message)) {
        return;
    }

    const payload = {
        name: name,
        email: email,
        phoneNumber: phoneNumber ? phoneNumber : null,
        message: message
    };

    try {
        const response = await fetch('http://localhost:8086/email/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            document.getElementById('contactForm').style.display = 'none';
            document.getElementsByClassName('successMessage')[0].style.display = 'block';
            document.getElementsByClassName('form-container')[0].classList.remove('custom-border');
        } else {
            const errorMessage = await response.text();
            alert('Błąd podczas wysyłania emaila: ' + errorMessage);
        }
    } catch (error) {
        alert('Wystąpił błąd: ' + error.message);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = [
        { type: 'Buk', id: 'addToCart1', lengthSelectId: 'bukLength', volumeSelectId: 'bukVolume', pricePerMp: 100 },
        { type: 'Dąb', id: 'addToCart2', lengthSelectId: 'dabLength', volumeSelectId: 'dabVolume', pricePerMp: 110 },
        { type: 'Grab', id: 'addToCart3', lengthSelectId: 'grabLength', volumeSelectId: 'grabVolume', pricePerMp: 120 },
        { type: 'Sosna', id: 'addToCart4', lengthSelectId: 'sosnaLength', volumeSelectId: 'sosnaVolume', pricePerMp: 90 },
        { type: 'Brzoza', id: 'addToCart5', lengthSelectId: 'brzozaLength', volumeSelectId: 'brzozaVolume', pricePerMp: 95 },
        { type: 'Drewno do rozpałki', id: 'addToCart6', lengthSelectId: 'rozpalkaQuantity', pricePerMp: 50 }
    ];

    addToCartButtons.forEach(button => {
        const addToCartButton = document.getElementById(button.id);
        if (addToCartButton) {
            addToCartButton.addEventListener('click', () => {
                const lengthSelect = document.getElementById(button.lengthSelectId);
                if (lengthSelect) {
                    const length = lengthSelect.value;
                    let volume = null;

                    if (button.type !== 'Drewno do rozpałki') {
                        const volumeSelect = document.getElementById(button.volumeSelectId);
                        if (volumeSelect) {
                            volume = volumeSelect.value;
                        }
                    }

                    if (length) {
                        addToCart(button.type, length, volume, button.pricePerMp);
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

function addToCart(productType, length, volume, pricePerMp) {
    const product = {
        type: productType,
        length: parseInt(length, 10),
        volume: volume ? parseInt(volume, 10) : undefined,
        pricePerMp: pricePerMp
    };

    const cart = getCart();
    cart.push(product);
    saveCart(cart);

    if (productType === 'Drewno do rozpałki') {
        showToast(`Dodano do koszyka: ${productType}, ${length} szt.`);
    } else {
        showToast(`Dodano do koszyka: ${productType}, ${length} cm, ${volume ? volume + ' mp' : ''}`);
    }
}

function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function deleteFromCart(productType, length) {
    let cart = getCart();
    cart = cart.filter(product => !(product.type === productType && product.length === parseInt(length)));
    saveCart(cart);
    alert(`Usunięto z koszyka: ${productType}, ${length} cm`);
}