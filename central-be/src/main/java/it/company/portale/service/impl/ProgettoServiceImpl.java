package it.valueson.portale.service.impl;


import it.valueson.portale.dto.ProgettoDTO;
import it.valueson.portale.entity.Progetto;
import it.valueson.portale.exception.ResourceNotFoundException;
import it.valueson.portale.repository.ProgettoRepository;
import it.valueson.portale.service.ProgettoService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProgettoServiceImpl implements ProgettoService {
    @Autowired
    ProgettoRepository progettoRepository;

    @Override
    public List<Progetto> getAllProgetti() {
            return progettoRepository.findAll();
    }

    @Transactional
    @Override
    public ProgettoDTO creaProgetto(ProgettoDTO progettoDTO) {
        Progetto progetto = toEntity(progettoDTO);
        Progetto savedProgetto = progettoRepository.save(progetto);
        return toDTO(savedProgetto);
    }

    @Transactional
    @Override
    public ProgettoDTO modificaProgetto(Long id, ProgettoDTO progettoDTO) {
        Progetto progettoEsistente = progettoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Progetto non trovato"));

        progettoEsistente.setTitolo(progettoDTO.getTitolo());
        progettoEsistente.setNome_cliente(progettoDTO.getNome_cliente());
        progettoEsistente.setData_inizio(progettoDTO.getData_inizio());
        progettoEsistente.setData_fine(progettoDTO.getData_fine());

        Progetto progettoAggiornato = progettoRepository.save(progettoEsistente);
        return toDTO(progettoAggiornato);
    }

    private ProgettoDTO toDTO(Progetto progetto) {
        return ProgettoDTO.builder()
                .id_progetto(progetto.getId_progetto())
                .titolo(progetto.getTitolo())
                .nome_cliente(progetto.getNome_cliente())
                .data_inizio(progetto.getData_inizio())
                .data_fine(progetto.getData_fine())
                .build();
    }

    private Progetto toEntity(ProgettoDTO progettoDTO) {
        return Progetto.builder()
                .id_progetto(progettoDTO.getId_progetto())
                .titolo(progettoDTO.getTitolo())
                .nome_cliente(progettoDTO.getNome_cliente())
                .data_inizio(progettoDTO.getData_inizio())
                .data_fine(progettoDTO.getData_fine())
                .build();
    }

}
