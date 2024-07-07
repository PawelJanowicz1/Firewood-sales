package org.example.firewoodsales.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller("/")
public class ViewController {

    @GetMapping("/offer")
    String offerView(){
        return "offer";
    }

    @GetMapping("/contact")
    String contactView(){
        return "contact";
    }

    @GetMapping("/cart")
    public String cartView(){
        return "cart";
    }
}
