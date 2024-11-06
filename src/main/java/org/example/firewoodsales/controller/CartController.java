package org.example.firewoodsales.controller;

import lombok.RequiredArgsConstructor;
import org.example.firewoodsales.model.Product;
import org.example.firewoodsales.service.CartService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @CrossOrigin(origins = "https://drewno-kominkowe-torun.pl")
    @PostMapping("/cart/add")
    public void addProductToCart(@RequestBody Product product) {
        cartService.addProduct(product);
    }

    @CrossOrigin(origins = "https://drewno-kominkowe-torun.pl")
    @PostMapping("/cart/delete")
    public void deleteProductFromCart(@RequestBody Product product) {
        cartService.deleteProduct(product);
    }
}
