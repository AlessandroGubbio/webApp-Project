package it.valueson.portale.service;

import it.valueson.portale.dto.ProgettoDTO;
import it.valueson.portale.entity.Progetto;
import jakarta.transaction.Transactional;

import java.util.List;

public interface ProgettoService {

    List<Progetto> getAllProgetti();

    @Transactional
    ProgettoDTO creaProgetto(ProgettoDTO progettoDTO);

    @Transactional
    ProgettoDTO modificaProgetto(Long id, ProgettoDTO progettoDTO);
}
