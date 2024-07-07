package org.example.firewoodsales.service;

import lombok.RequiredArgsConstructor;
import org.example.firewoodsales.dto.ContactRequest;
import org.example.firewoodsales.dto.OrderRequest;
import org.example.firewoodsales.dto.ProductRequest;
import org.example.firewoodsales.model.Client;
import org.example.firewoodsales.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
@RequiredArgsConstructor
public class EmailService {

    private final ClientRepository clientRepository;
    private final JavaMailSenderImpl mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Value("${admin.email}")
    private String adminEmail;

    public ResponseEntity<?> sendSimpleEmail(ContactRequest contactRequest) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom(fromEmail);
        simpleMailMessage.setTo(adminEmail);

        String name = contactRequest.name();
        String email = contactRequest.email();
        String phoneNumber = contactRequest.phoneNumber();
        String message = contactRequest.message();

        String subject = "Prośba o kontakt od " + name;

        StringBuilder sb = new StringBuilder();
        sb.append("Imię:  ").append(name).append("\n");
        sb.append(("Email:  ")).append(email).append("\n");
        if(phoneNumber != null && !phoneNumber.isEmpty()) {
            sb.append("Numer Telefonu:  ").append(phoneNumber).append("\n");
        }else {
            phoneNumber = "Klient nie podał numeru telefonu";
            sb.append(phoneNumber).append("\n");
        }
        sb.append(("Wiadomość:  ")).append(message).append("\n");
        simpleMailMessage.setSubject(subject);
        simpleMailMessage.setText(sb.toString());
        mailSender.send(simpleMailMessage);
        Client client = new Client(name, email, phoneNumber, message);
        clientRepository.save(client);

        return ResponseEntity.ok("ok");
    }

    public void sendOrderEmail(OrderRequest orderRequest) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom(fromEmail);
        simpleMailMessage.setTo(adminEmail);

        String firstName = orderRequest.firstName();
        String lastName = orderRequest.lastName();
        String phoneNumber = orderRequest.phoneNumber();
        String street = orderRequest.street();
        String houseNumber = orderRequest.houseNumber();
        String apartmentNumber = orderRequest.apartmentNumber();
        String zipCode = orderRequest.zipCode();
        String email = orderRequest.email();
        List<ProductRequest> orderedProducts = orderRequest.orderedProducts();

        String subject = "Nowe zamówienie od " + firstName + " " + lastName;
        StringBuilder sb = new StringBuilder();
        sb.append("Imię: ").append(firstName).append("\n");
        sb.append("Nazwisko: ").append(lastName).append("\n");
        sb.append("Numer telefonu: ").append(phoneNumber).append("\n");
        sb.append("Adres: ").append(street).append(" ").append(houseNumber);
        if (apartmentNumber != null && !apartmentNumber.isEmpty()) {
            sb.append("/").append(apartmentNumber);
        }
        sb.append("\n");
        sb.append("Kod pocztowy: ").append(zipCode).append("\n");
        if (email != null && !email.isEmpty()) {
            sb.append("Email: ").append(email).append("\n");
        } else {
            sb.append("Klient nie podał adresu email\n");
        }
        sb.append("\n");

        sb.append("Zamówione produkty:\n");
        orderedProducts.forEach(product -> {
            sb.append("- ").append(product.type()).append(": ");
            if (product.type().equals("Drewno do rozpałki")) {
                sb.append("ilość: ").append(product.volume()).append(" szt");
            } else {
                sb.append("Długość szczapy: ").append(product.length()).append(" cm, ");
                sb.append("ilość: ").append(product.volume()).append(" mp");
            }
            sb.append(", Kwota: ").append(product.price()).append(" zł");
            sb.append("\n");
        });

        double totalAmount = orderedProducts.stream()
                .mapToDouble(ProductRequest::price)
                .sum();

        sb.append("\nŁączna kwota zamówienia: ").append(totalAmount).append(" zł");

        simpleMailMessage.setSubject(subject);
        simpleMailMessage.setText(sb.toString());

        mailSender.send(simpleMailMessage);

        Client client = new Client(firstName + " " + lastName, email, phoneNumber, sb.toString());
        clientRepository.save(client);
    }
}