package org.example.firewoodsales.controller;

import lombok.RequiredArgsConstructor;
import org.example.firewoodsales.POJO.Cart;
import org.example.firewoodsales.model.Product;
import org.example.firewoodsales.service.CartService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @PostMapping("/add")
    public void addProductToCart(@RequestBody Product product) {
        cartService.addProduct(product);
    }

    @PostMapping("/delete")
    public void deleteProductFromCart(@RequestBody Product product) {
        cartService.deleteProduct(product);
    }

    @GetMapping
    public Cart getCart() {
        return cartService.getCurrentCart();
    }
}
