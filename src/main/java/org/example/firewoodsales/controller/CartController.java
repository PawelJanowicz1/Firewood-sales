package org.example.firewoodsales.controller;

import lombok.RequiredArgsConstructor;
import org.example.firewoodsales.POJO.Cart;
import org.example.firewoodsales.model.Product;
import org.example.firewoodsales.service.CartService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @PostMapping("/cart/add")
    public void addProductToCart(@RequestBody Product product) {
        cartService.addProduct(product);
    }

    @PostMapping("/cart/delete")
    public void deleteProductFromCart(@RequestBody Product product) {
        cartService.deleteProduct(product);
    }
}
