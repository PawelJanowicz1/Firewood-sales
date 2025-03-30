package org.example.firewoodsales.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
@Table(name = "clients_torun")
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    @NotBlank
    private String name;

    @Column
    @NotBlank
    @Email
    private String email;

    @Column
    @NotBlank
    private String phoneNumber;

    @Column
    @NotBlank(message = "message cannot be blank")
    private String message;

    public Client(String name, String email, String phoneNumber, String message) {
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.message = message;
    }
}
