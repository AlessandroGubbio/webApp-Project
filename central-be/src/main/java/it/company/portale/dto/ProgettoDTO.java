package it.valueson.portale.dto;

import lombok.*;
import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProgettoDTO {
    private Long id_progetto;
    private String titolo;
    private String nome_cliente;
    private LocalDate data_inizio;
    private LocalDate data_fine;
}