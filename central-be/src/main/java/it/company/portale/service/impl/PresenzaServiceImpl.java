package it.valueson.portale.service.impl;

import it.valueson.portale.dto.PresenzaDTO;
import it.valueson.portale.entity.Presenza;
import it.valueson.portale.entity.Progetto;
import it.valueson.portale.repository.PresenzaRepository;
import it.valueson.portale.repository.ProgettoRepository;
import it.valueson.portale.repository.UtentiRepository;
import it.valueson.portale.service.PresenzaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;


@Service
public class PresenzaServiceImpl implements PresenzaService {
    @Autowired
    private PresenzaRepository presenzaRepository;
    @Autowired
    private UtentiRepository utentiRepository;

    @Autowired
    private ProgettoRepository progettoRepository;

    @Override
    public List<Presenza> getPresenzaByUserId(Long userId) {
        List<Presenza> presenzaList = presenzaRepository.findByIdUtenteOrderByData(userId);
        return presenzaList;
    }

    @Override
    public PresenzaDTO findByidUtenteAndData(long idUtente, LocalDate date) {
        Presenza presenza = presenzaRepository.findByIdUtenteAndData(idUtente, date);
//        System.out.println(idUtente);
//        System.out.println(date);
//        System.out.println(presenza);
        if(presenza != null){
            return mapToDTO(presenzaRepository.findByIdUtenteAndData(idUtente, date));
        }else{
            return new PresenzaDTO();
        }
    }

    @Override
    public Presenza creaPresenza(PresenzaDTO presenza) {
        presenza.setData(presenza.getData().plusDays(1));
        System.out.println("DTO " + presenza);
        Presenza presenzaTrovata = presenzaRepository.findByIdUtenteAndData(presenza.getIdUtente(), presenza.getData());
        System.out.println("trovata " + presenzaTrovata);
        Progetto progetto = progettoRepository.findById(presenza.getIdProgetto()).get();
        if(presenzaTrovata != null) {
            presenzaTrovata.setIngresso(presenza.getIngresso());
            presenzaTrovata.setUscita(presenza.getUscita());
            presenzaTrovata.setFerie(presenza.getFerie());
            presenzaTrovata.setPermesso(presenza.getPermesso());
            presenzaTrovata.setProgetto(progetto);
            return presenzaRepository.save(presenzaTrovata);
        }else{
            Presenza presenzaEntity = mapToEntity(presenza);
            presenzaEntity.setProgetto(progetto);
            return presenzaRepository.save(presenzaEntity);
        }


    }


    private Presenza mapToEntity(PresenzaDTO presenzaDTO){
        return Presenza.builder()
                .data(presenzaDTO.getData())
                .ferie(presenzaDTO.getFerie())
                .uscita(presenzaDTO.getUscita())
                .ingresso(presenzaDTO.getIngresso())
                .permesso(presenzaDTO.getPermesso())
                .idUtente(presenzaDTO.getIdUtente())
                .build();

    }

    private PresenzaDTO mapToDTO(Presenza presenza){
        return PresenzaDTO.builder()
                .data(presenza.getData())
                .ferie(presenza.getFerie())
                .uscita(presenza.getUscita())
                .ingresso(presenza.getIngresso())
                .permesso(presenza.getPermesso())
                .idUtente(presenza.getIdUtente())
                .build();
    }
}

