document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('checkoutForm');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (form.checkValidity()) {
            await placeOrder();
        } else {
            form.classList.add('was-validated');
        }
    });
});

async function placeOrder() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const street = document.getElementById('street').value;
    const houseNumber = document.getElementById('houseNumber').value;
    const apartmentNumber = document.getElementById('apartmentNumber').value;
    const zipCode = document.getElementById('zipCode').value;
    const email = document.getElementById('email').value;

    const cart = getCart();

    const formData = {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        street: street,
        houseNumber: houseNumber,
        apartmentNumber: apartmentNumber,
        zipCode: zipCode,
        email: email,
        cart: cart
    };

    try {
        const response = await fetch('http://localhost:8086/email/send-cart-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert('Zamówienie zostało złożone!');
            emptyCart();
        } else {
            const errorMessage = await response.text();
            alert('Błąd podczas składania zamówienia: ' + errorMessage);
        }
    } catch (error) {
        alert('Wystąpił błąd: ' + error.message);
    }
}