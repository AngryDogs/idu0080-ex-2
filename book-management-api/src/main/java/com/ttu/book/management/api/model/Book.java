package com.ttu.book.management.api.model;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Entity
@Builder
public class Book {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @NotNull
    private String title;

    @NotNull
    private String author;

    @NotNull
    private String genre;

    @NotNull
    private BigDecimal price;
}
