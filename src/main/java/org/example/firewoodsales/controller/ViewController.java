package org.example.firewoodsales.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller("/")
public class ViewController {

    @GetMapping("/contact")
    String contactView(){
        return "contact";
    }
}
