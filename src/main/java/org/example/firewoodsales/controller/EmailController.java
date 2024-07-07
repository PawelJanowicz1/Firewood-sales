package org.example.firewoodsales.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.firewoodsales.dto.ContactRequest;
import org.example.firewoodsales.dto.OrderRequest;
import org.example.firewoodsales.service.EmailService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/email")
@CrossOrigin(origins = "localhost:8086")
public class EmailController {

    private final EmailService emailService;

    @PostMapping("/send-email")
    ResponseEntity<?> sendEmail(@RequestBody @Valid ContactRequest contactRequest) {
        emailService.sendSimpleEmail(contactRequest);
        return ResponseEntity.ok("Email has been sent successfully");
    }

    @PostMapping("/send-cart-email")
    ResponseEntity<?> sendCartEmail(@RequestBody OrderRequest orderRequest) {
        emailService.sendOrderEmail(orderRequest);
        return ResponseEntity.ok("Email z zamówieniem został wysłany pomyślnie");
    }
}