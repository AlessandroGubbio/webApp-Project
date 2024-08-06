package it.valueson.portale.entity;


import jakarta.persistence.*;
import lombok.*;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Data
@ToString
@EqualsAndHashCode
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tbl_presenze")
public class Presenza {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_presenza", unique = true, nullable = false)
    private Long id_presenza;

    @Column(name = "id_utente", nullable = false)
    private Long idUtente;

    @Column(name = "data", nullable = false)
    private LocalDate data;

    @Column(name = "ingresso", nullable = false)
    private LocalTime ingresso;

    @Column(name = "uscita", nullable = false)
    private LocalTime uscita;

    @Column(name = "ore_totali", nullable = false)
    private double totale;

    @Column(name = "permesso", nullable = false)
    private Integer permesso;

    @Column(name = "ferie", nullable = false)
    private Integer ferie;

    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "id_progetto")
    private Progetto progetto;

    @PrePersist
    @PreUpdate
    public void calculateTotale() {
        if (ingresso != null && uscita != null) {
            Duration durata = Duration.between(ingresso, uscita);
            this.totale = durata.toHours();
        }
    }

}
