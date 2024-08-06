package it.valueson.portale.service;

import it.valueson.portale.dto.CedolinoDTO;
import it.valueson.portale.dto.PresenzaDTO;
import it.valueson.portale.entity.Presenza;
import it.valueson.portale.entity.Progetto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface PresenzaService {
    List<Presenza> getPresenzaByUserId(Long userId);

    Presenza creaPresenza(PresenzaDTO presenza);

    PresenzaDTO findByidUtenteAndData(long idUtente, LocalDate date);
}
