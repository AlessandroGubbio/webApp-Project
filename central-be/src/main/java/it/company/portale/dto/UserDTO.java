package it.valueson.portale.dto;

import lombok.*;

import java.io.Serializable;
import java.util.List;

@Data
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class  UserDTO implements Serializable {
    private Long idUser;
    private String nome;
    private String cognome;
    private String mail;
    @ToString.Exclude
    private String password;
    private String role;
}
