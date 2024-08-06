package it.valueson.portale.dto;

import lombok.*;

import java.io.Serializable;
import java.time.LocalDate;

@Data
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class NewsDTO implements Serializable {
    private Long idNews;
    private LocalDate date;
    private String description;
    private byte[] image;
    private String title;
}
