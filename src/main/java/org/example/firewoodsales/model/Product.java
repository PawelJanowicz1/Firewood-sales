package org.example.firewoodsales.model;

import jakarta.persistence.*;
import lombok.Data;
import org.example.firewoodsales.POJO.Cart;

@Entity
@Data
public class Product  {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private String type;

    @Column
    private int length;

}
