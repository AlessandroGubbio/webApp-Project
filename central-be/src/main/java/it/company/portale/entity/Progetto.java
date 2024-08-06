package it.valueson.portale.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@ToString
@EqualsAndHashCode
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tbl_progetti")
public class Progetto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_progetto", unique = true, nullable = false)
    private Long id_progetto;

    @Column(name = "titolo", unique = true, nullable = false)
    private String titolo;

    @Column(name = "nome_cliente", nullable = false)
    private String nome_cliente;

    @Column(name = "data_inizio", nullable = false)
    private LocalDate data_inizio;

    @Column(name = "data_fine", nullable = false)
    private LocalDate data_fine;

    @ToString.Exclude
    @JsonIgnore
    @OneToMany(mappedBy = "progetto")
    private List<Presenza> presenze = new ArrayList<>();
}