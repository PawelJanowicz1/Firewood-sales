package org.example.firewoodsales.service;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.example.firewoodsales.POJO.Cart;
import org.example.firewoodsales.model.Product;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CartService {
    private final HttpSession session;

    private static final String CART_SESSION_KEY = "CART";

    public void addProduct(Product product) {
        Cart cart = getCart();
        cart.addProduct(product);
        session.setAttribute(CART_SESSION_KEY, cart);
    }

    public void deleteProduct(Product product) {
        Cart cart = getCart();
        cart.deleteProduct(product);
        session.setAttribute(CART_SESSION_KEY, cart);
    }

    private Cart getCart() {
        Cart cart = (Cart) session.getAttribute(CART_SESSION_KEY);
        if (cart == null) {
            cart = new Cart();
            session.setAttribute(CART_SESSION_KEY, cart);
        }
        return cart;
    }

    public Cart getCurrentCart() {
        return getCart();
    }
}