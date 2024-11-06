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
        if (phoneNumber != null && !phoneNumber.isEmpty()) {
            sb.append("Numer Telefonu:  ").append(phoneNumber).append("\n");
        } else {
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
        SimpleMailMessage simpleMailMessageToClient = new SimpleMailMessage();
        simpleMailMessage.setFrom(fromEmail);
        simpleMailMessage.setTo(adminEmail);

        String firstName = orderRequest.firstName();
        String lastName = orderRequest.lastName();
        String phoneNumber = orderRequest.phoneNumber();
        String street = orderRequest.street();
        String city = orderRequest.city();
        String houseNumber = orderRequest.houseNumber();
        String apartmentNumber = orderRequest.apartmentNumber();
        String zipCode = orderRequest.zipCode();
        String email = orderRequest.email();
        List<ProductRequest> orderedProducts = orderRequest.orderedProducts();

        String subject = "Nowe zamówienie od " + firstName + " " + lastName;
        StringBuilder sb = new StringBuilder();
        sb.append("Dane klienta: ").append("\n").append("\n");
        sb.append("Imię: ").append(firstName).append("\n");
        sb.append("Nazwisko: ").append(lastName).append("\n");
        sb.append("Numer telefonu: ").append(phoneNumber).append("\n");
        sb.append("Adres: ").append(street).append(" ").append(houseNumber);
        if (apartmentNumber != null && !apartmentNumber.isEmpty()) {
            sb.append("/").append(apartmentNumber);
        }
        sb.append("\n");
        sb.append("Miasto:").append(" ").append(city);
        sb.append("\n");
        sb.append("Kod pocztowy: ").append(zipCode).append("\n");
        if (email != null && !email.isEmpty()) {
            sb.append("Email: ").append(email).append("\n");
        } else {
            sb.append("Klient nie podał adresu email\n");
        }
        sb.append("\n");

        sb.append("Zamówione produkty:\n").append("\n");
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

        StringBuilder sb2 = new StringBuilder();

        sb2.append("Twoje zamówienie zostało złożone na poniższe dane:").append("\n").append("\n");
        sb2.append("Imię: ").append(firstName).append("\n");
        sb2.append("Nazwisko: ").append(lastName).append("\n");
        sb2.append("Numer telefonu: ").append(phoneNumber).append("\n");
        sb2.append("Adres: ").append(street).append(" ").append(houseNumber);
        if (apartmentNumber != null && !apartmentNumber.isEmpty()) {
            sb2.append("/").append(apartmentNumber);
        }
        sb2.append("\n");
        sb2.append("Miasto:").append(" ").append(city);
        sb2.append("\n");
        sb2.append("Kod pocztowy: ").append(zipCode).append("\n").append("\n");
        sb2.append("Zamówione produkty:\n").append("\n");
        orderedProducts.forEach(product -> {
            sb2.append("- ").append(product.type()).append(": ");
            if (product.type().equals("Drewno do rozpałki")) {
                sb2.append("ilość: ").append(product.volume()).append(" szt");
            } else {
                sb2.append("Długość szczapy: ").append(product.length()).append(" cm, ");
                sb2.append("ilość: ").append(product.volume()).append(" mp");
            }
            sb2.append(", Kwota: ").append(product.price()).append(" zł");
            sb2.append("\n");
        });

        double totalAmount2 = orderedProducts.stream()
                .mapToDouble(ProductRequest::price)
                .sum();

        sb2.append("\nŁączna kwota zamówienia: ").append(totalAmount2).append(" zł");


        sb2.append("\n");
        sb2.append("\n");
        sb2.append("\n");

        sb2.append("Do zobaczenia wkrótce!");

        simpleMailMessage.setSubject(subject);
        simpleMailMessage.setText(sb.toString());

        simpleMailMessageToClient.setFrom(fromEmail);
        simpleMailMessageToClient.setTo(email);

        simpleMailMessageToClient.setSubject("Dziękujemy za złożenie zamówienia! - Drewko-drewko");
        simpleMailMessageToClient.setText(sb2.toString());

        mailSender.send(simpleMailMessageToClient);
        mailSender.send(simpleMailMessage);

        Client client = new Client(firstName + " " + lastName, email, phoneNumber, sb.toString());
        clientRepository.save(client);
    }
}