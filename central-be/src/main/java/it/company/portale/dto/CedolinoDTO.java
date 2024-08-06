package it.valueson.portale.dto;

import it.valueson.portale.entity.TblUtenti;
import lombok.*;

import java.time.LocalDate;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CedolinoDTO {
    private Long id;
    private LocalDate date;
    @ToString.Exclude
    private TblUtenti userId;
    @ToString.Exclude
    private byte[] pdfBase64;
}


