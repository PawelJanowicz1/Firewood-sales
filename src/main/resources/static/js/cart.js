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
    const emptyCartButton = document.getElementById('emptyCart');

    cartContent.innerHTML = '';

    if (cart.length === 0) {
        cartContent.innerHTML = '<p>Koszyk jest pusty.</p>';
        emptyCartButton.style.display = 'none';
        return;
    }

    emptyCartButton.style.display = 'block';

    const list = document.createElement('ul');
    list.className = 'list-group';

    cart.forEach((product, index) => {
        const item = document.createElement('li');
        item.className = 'list-group-item d-flex justify-content-between align-items-center';

        let displayText = '';
        if (product.type === 'Drewno do rozpałki') {
            displayText = `${product.type}, ${product.length} szt.`;
        } else {
            displayText = `${product.type}, ${product.length} cm, ${product.volume} mp`;
        }
        item.textContent = displayText;

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

function showToast(message) {
    const toastContainer = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast align-items-center text-bg-success border-0';
    toast.role = 'alert';
    toast.ariaLive = 'assertive';
    toast.ariaAtomic = 'true';
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">${message}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;

    toastContainer.appendChild(toast);

    const bootstrapToast = new bootstrap.Toast(toast);
    bootstrapToast.show();

    toast.addEventListener('hidden.bs.toast', () => {
        toastContainer.removeChild(toast);
    });
}
