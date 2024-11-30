document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('checkoutForm');
    const placeOrderButton = document.getElementById('placeOrder');

    placeOrderButton.addEventListener('click', async (event) => {
        event.preventDefault();
        if (validateForm()) {
            disableSubmitButton(placeOrderButton);
            await placeOrder();
        } else {
            form.classList.add('was-validated');
        }
    });

    function validateForm() {
        let isValid = true;

        const firstNameInput = document.getElementById('firstName');
        const lastNameInput = document.getElementById('lastName');
        const phoneNumberInput = document.getElementById('phoneNumber');
        const streetInput = document.getElementById('street');
        const houseNumberInput = document.getElementById('houseNumber');
        const zipCodeInput = document.getElementById('zipCode');
        const cityInput = document.getElementById('city');
        const emailInput = document.getElementById('email');

        const namePattern = /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/;
        const phonePattern = /^(?:\+48\s?\d{3}\s?\d{3}\s?\d{3}|\+48\d{9}|\d{9}|\d{3}\s?\d{3}\s?\d{3})$/;
        const zipCodePattern = /^\d{2}-\d{3}$/;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!firstNameInput.value || !namePattern.test(firstNameInput.value)) {
            isValid = false;
            alert('Proszę wprowadzić poprawne imię (bez cyfr i znaków specjalnych).');
        }

        if (!lastNameInput.value || !namePattern.test(lastNameInput.value)) {
            isValid = false;
            alert('Proszę wprowadzić poprawne nazwisko (bez cyfr i znaków specjalnych).');
        }

        if (!phoneNumberInput.value || !phonePattern.test(phoneNumberInput.value)) {
            isValid = false;
            alert('Proszę wprowadzić poprawny numer telefonu.');
        }

        if (!emailInput.value || !emailPattern.test(emailInput.value)) {
            isValid = false;
            alert('Proszę wprowadzić poprawny adres email.');
        }

        if (!streetInput.value) {
            isValid = false;
            alert('Proszę wprowadzić nazwę ulicy.');
        }

        if (!houseNumberInput.value) {
            isValid = false;
            alert('Proszę wprowadzić numer domu.');
        }

        if (zipCodeInput.value && !zipCodePattern.test(zipCodeInput.value)) {
            isValid = false;
            alert('Proszę wprowadzić poprawny kod pocztowy (format XX-XXX).');
        }

        if (!cityInput.value) {
            isValid = false;
            alert('Proszę wprowadzić nazwę miasta.');
        }

        return isValid;
    }

    async function placeOrder() {
        const storedCart = localStorage.getItem('cart');
        const cartItems = storedCart ? JSON.parse(storedCart) : [];
        const orderedProducts = cartItems.map(item => {
            if (item.type === 'Drewno do rozpałki') {
                return {
                    type: item.type,
                    volume: item.volume,
                    price: item.price
                };
            } else {
                return {
                    type: item.type,
                    length: item.length,
                    volume: item.volume,
                    price: item.price
                };
            }
        });

        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            phoneNumber: document.getElementById('phoneNumber').value,
            street: document.getElementById('street').value,
            houseNumber: document.getElementById('houseNumber').value,
            apartmentNumber: document.getElementById('apartmentNumber').value,
            zipCode: document.getElementById('zipCode').value,
            city: document.getElementById('city').value,
            email: document.getElementById('email').value,
            orderedProducts: orderedProducts
        };
        try {
            const response = await fetch('https://drewno-kominkowe-torun.pl/email/send-cart-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                form.style.display = 'none';
                placeOrderButton.style.display = 'none';
                localStorage.clear();
                window.location.href = 'success';
            } else {
                const errorMessage = await response.text();
                alert('Błąd podczas składania zamówienia: ' + errorMessage);
            }
        } catch (error) {
            alert('Wystąpił błąd: ' + error.message);
        } finally {
            enableSubmitButton(placeOrderButton);
        }
    }
});

function disableSubmitButton(button) {
    button.disabled = true;
    button.innerText = 'Wysyłanie...';
    button.classList.add('btn-disabled');
}

function enableSubmitButton(button) {
    button.disabled = false;
    button.innerText = 'Zamów';
    button.classList.remove('btn-disabled');
}