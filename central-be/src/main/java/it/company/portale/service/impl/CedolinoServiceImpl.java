package it.valueson.portale.service.impl;

import it.valueson.portale.dto.CedolinoDTO;
import it.valueson.portale.entity.Cedolino;
import it.valueson.portale.entity.TblUtenti;
import it.valueson.portale.repository.CedolinoRepository;
import it.valueson.portale.repository.UtentiRepository;
import it.valueson.portale.service.CedolinoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CedolinoServiceImpl implements CedolinoService {

    @Autowired
    private CedolinoRepository cedolinoRepository;

    @Autowired
    private UtentiRepository utentiRepository;

    @Override
    public List<CedolinoDTO> getCedoliniByUserId(Long userId) {
        List<Cedolino> cedolinoList = cedolinoRepository.findByUser_IdUserOrderByDate(userId);
        List<CedolinoDTO> cedolinoDTOList = new ArrayList<>();
        for (Cedolino cedolino : cedolinoList) {
            cedolinoDTOList.add(mapToDto(cedolino));
        }
        return cedolinoDTOList;
    }

    @Override
    public CedolinoDTO getCedolinoById(Long id) {
        Optional<Cedolino> cedolino = cedolinoRepository.findById(id);
        return cedolino.map(this::mapToDto).orElse(null);
    }

    @Override
    public CedolinoDTO createCedolino(CedolinoDTO cedolinoDTO) {
        Cedolino cedolino = new Cedolino();
        TblUtenti user = utentiRepository.findById(cedolinoDTO.getUserId().getIdUser()).orElse(null);
        if (user != null) {
            cedolino.setUser(user);
            cedolino.setDate(cedolinoDTO.getDate());
            cedolino.setPdfBase64(cedolinoDTO.getPdfBase64());

            Cedolino savedCedolino = cedolinoRepository.save(cedolino);
            return mapToDto(savedCedolino);
        }
        return null;
    }

    @Override
    public CedolinoDTO updateCedolino(Long id, CedolinoDTO cedolinoDTO) {
        Optional<Cedolino> existingCedolino = cedolinoRepository.findById(id);
        if (existingCedolino.isPresent()) {
            Cedolino cedolino = existingCedolino.get();
            cedolino.setDate(cedolinoDTO.getDate());
            cedolino.setPdfBase64(cedolinoDTO.getPdfBase64());
            TblUtenti user = utentiRepository.findById(cedolinoDTO.getUserId().getIdUser()).orElse(null);
            if (user != null) {
                cedolino.setUser(user);
                Cedolino updatedCedolino = cedolinoRepository.save(cedolino);
                return mapToDto(updatedCedolino);
            }
        }
        return null;
    }

    @Override
    public void deleteCedolino(Long id) {
        cedolinoRepository.deleteById(id);
    }

    @Override
    public void deleteAllForUser(Long userId) {
        cedolinoRepository.deleteAllByUser(utentiRepository.findById(userId).get());
    }

    @Override
    public List<CedolinoDTO> getAllCedolini() {
        List<Cedolino> cedolinoList = cedolinoRepository.findAll();
        List<CedolinoDTO> cedolinoDTOList = new ArrayList<>();
        for (Cedolino cedolino : cedolinoList) {
            cedolinoDTOList.add(mapToDto(cedolino));
        }
        return cedolinoDTOList;
    }

    private CedolinoDTO mapToDto(Cedolino cedolino) {
        return CedolinoDTO.builder()
                .id(cedolino.getId())
                .date(cedolino.getDate())
                .userId(cedolino.getUser())
                .pdfBase64(cedolino.getPdfBase64())
                .build();
    }

    private Cedolino mapToEntity(CedolinoDTO cedolinoDTO) {
        Cedolino cedolino = new Cedolino();
        cedolino.setId(cedolinoDTO.getId());
        cedolino.setDate(cedolinoDTO.getDate());
        cedolino.setPdfBase64(cedolinoDTO.getPdfBase64());
        cedolino.setUser(cedolinoDTO.getUserId());
        return cedolino;
    }

    @Override
    public CedolinoDTO createCedolinoDirectly(TblUtenti utente, LocalDate date, String pdfBase64) {
        Cedolino cedolino = new Cedolino();
        cedolino.setUser(utente);
        cedolino.setDate(date);
        cedolino.setPdfBase64(pdfBase64.getBytes());

        Cedolino savedCedolino = cedolinoRepository.save(cedolino);
        return mapToDto(savedCedolino);
    }

    @Override
    public void save(CedolinoDTO dto) {
        cedolinoRepository.save(mapToEntity(dto));
    }

    @Override
    public CedolinoDTO findById(Long id) {
        return mapToDto(cedolinoRepository.findById(id).get());
    }
}
