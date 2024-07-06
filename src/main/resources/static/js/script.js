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
    // Nasłuchiwanie kliknięć dla przycisków "Dodaj do koszyka"
    document.querySelectorAll('.btn-add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const type = button.dataset.type;
            addToCart(type);
        });
    });

    // Nasłuchiwanie kliknięcia dla przycisku "Koszyk"
    const cartButton = document.getElementById('showCartButton');
    if (cartButton) {
        cartButton.addEventListener('click', () => {
            showCart();
        });
    }
});

function addToCart(type) {
    let product;
    if (type === 'Buk' || type === 'Dąb' || type === 'Grab' || type === 'Sosna' || type === 'Brzoza') {
        const lengthElement = document.getElementById(type.toLowerCase() + 'Length');
        const length = parseInt(lengthElement.value);
        product = {
            type: type,
            length: length
        };
    } else if (type === 'Drewno do rozpałki') {
        const quantityElement = document.getElementById('rozpalkaQuantity');
        const quantity = parseInt(quantityElement.value);
        product = {
            type: type,
            quantity: quantity
        };
    } else {
        console.error('Nieznany typ produktu: ' + type);
        return;
    }

    fetch('http://localhost:8086/cart/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json'
        },
        body: JSON.stringify(product),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Nie udało się dodać produktu do koszyka');
            }
            console.log('Produkt został dodany do koszyka');
        })
        .catch(error => {
            console.error('Błąd podczas dodawania produktu do koszyka:', error);
        });
}

function showCart() {
    fetch('http://localhost:8086/cart', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json'
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Nie udało się pobrać zawartości koszyka');
            }
            return response.json();
        })
        .then(cart => {
            console.log('Aktualna zawartość koszyka:', cart);
            alert('Aktualna zawartość koszyka: ' + JSON.stringify(cart));
        })
        .catch(error => {
            console.error('Błąd podczas pobierania zawartości koszyka:', error);
        });
}