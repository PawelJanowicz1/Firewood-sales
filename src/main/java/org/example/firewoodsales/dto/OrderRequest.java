package org.example.firewoodsales.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import java.util.List;

public record OrderRequest(
        @NotBlank String firstName,
        @NotBlank String lastName,
        @Pattern(regexp = "\\d{9}", message = "Numer telefonu musi zawierać 9 cyfr") String phoneNumber,
        @NotBlank String street,
        @NotBlank String city,
        @NotBlank String houseNumber,
        String apartmentNumber,
        @Pattern(regexp = "\\d{2}-\\d{3}", message = "Kod pocztowy musi być w formacie xx-xxx") String zipCode,
        @Email(message = "Email should be valid") String email,
        List<ProductRequest> orderedProducts
) {}