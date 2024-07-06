package org.example.firewoodsales.POJO;

import lombok.Data;
import org.example.firewoodsales.model.Product;

import java.util.ArrayList;
import java.util.List;

@Data
public class Cart {

    private List<Product> products = new ArrayList<>();

    public void addProduct(Product product) {
        products.add(product);
    }

    public void deleteProduct(Product product) {
        products.remove(product);
    }
}