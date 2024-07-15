document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        await sendContactForm();
    });
});


function validateForm(name, email, phoneNumber, message) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{9}$/;

    if (!name.trim()) {document.addEventListener('DOMContentLoaded', () => {
        const contactForm = document.getElementById('contactForm');
        contactForm.addEventListener('submit', async (event) => {
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
                                price = 20;
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
                price: productType === 'Drewno do rozpałki' ? 20 : price
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
                        price = 20;
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
        price: productType === 'Drewno do rozpałki' ? 20 : price
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