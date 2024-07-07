document.addEventListener('DOMContentLoaded', () => {
    displayCart();

    const emptyCartButton = document.getElementById('emptyCart');
    if (emptyCartButton) {
        emptyCartButton.addEventListener('click', emptyCart);
    }

    const checkoutButton = document.getElementById('checkout');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', checkout);
    }
});

function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function displayCart() {
    const cart = getCart();
    const cartContent = document.getElementById('cartContent');
    cartContent.innerHTML = '';

    if (cart.length === 0) {
        cartContent.innerHTML = '<p>Koszyk jest pusty.</p>';
        return;
    }

    const list = document.createElement('ul');
    list.className = 'list-group';

    cart.forEach((product, index) => {
        const item = document.createElement('li');
        item.className = 'list-group-item d-flex justify-content-between align-items-center';
        item.textContent = `${product.type}, ${product.length} cm`;

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger btn-sm';
        deleteButton.textContent = 'Usuń';
        deleteButton.addEventListener('click', () => {
            deleteFromCart(index);
        });

        item.appendChild(deleteButton);
        list.appendChild(item);
    });

    cartContent.appendChild(list);
}

function deleteFromCart(index) {
    let cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    displayCart();
}

function emptyCart() {
    localStorage.removeItem('cart');
    displayCart();
}

function checkout() {
    alert('Zamówienie zostało złożone!');
    emptyCart();
}