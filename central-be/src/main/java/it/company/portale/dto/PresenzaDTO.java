package it.valueson.portale.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PresenzaDTO {
    private Long idPresenza;
    private Long idUtente;
    private LocalDate data;
    private LocalTime ingresso;
    private LocalTime uscita;
    private double totale;
    private Integer permesso;
    private Integer ferie;
    private Long idProgetto;
}
