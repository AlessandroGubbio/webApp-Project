package it.valueson.portale.dto;

import it.valueson.portale.entity.TblUtenti;
import lombok.*;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DocDTO {
    private Long id;
    private LocalDate date;
    private long userId;
    private byte[] pdfBase64;
}
