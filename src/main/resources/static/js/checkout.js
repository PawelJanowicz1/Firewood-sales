document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('checkoutForm');
    const placeOrderButton = document.getElementById('placeOrder');
    const mainContent = document.getElementById('mainContent');
    const navbar = document.querySelector('.navbar');

    placeOrderButton.addEventListener('click', async (event) => {
        event.preventDefault();
        if (form.checkValidity()) {
            await placeOrder();
        } else {
            form.classList.add('was-validated');
        }
    });

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
            email: document.getElementById('email').value,
            orderedProducts: orderedProducts
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
        }
    }
});
