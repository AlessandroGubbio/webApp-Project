package it.valueson.portale.entity;


import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import java.time.LocalDate;


@Entity
@Data
@ToString(exclude = "pdfBase64")
@EqualsAndHashCode(exclude = "pdfBase64")
@Table(name = "tbl_cedolini")
public class Cedolino {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date", nullable = false)
    private LocalDate date;

    @ManyToOne
    @JoinColumn(name = "idUtente", nullable = false)
    private TblUtenti user;

    private byte[] pdfBase64;
}

