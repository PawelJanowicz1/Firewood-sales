package org.example.firewoodsales.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@Controller("/")
public class ViewController {

    @CrossOrigin(origins = "https://drewno-kominkowe-torun.pl")
    @GetMapping("/offer")
    String offerView(){
        return "offer";
    }

    @CrossOrigin(origins = "https://drewno-kominkowe-torun.pl")
    @GetMapping("/contact")
    String contactView(){
        return "contact";
    }

    @CrossOrigin(origins = "https://drewno-kominkowe-torun.pl")
    @GetMapping("/cart")
    public String cartView(){
        return "cart";
    }

    @CrossOrigin(origins = "https://drewno-kominkowe-torun.pl")
    @GetMapping("/checkout")
    String checkoutView(){
        return "checkout";
    }

    @CrossOrigin(origins = "https://drewno-kominkowe-torun.pl")
    @GetMapping("/success")
    String successView(){
        return "success";
    }
}
