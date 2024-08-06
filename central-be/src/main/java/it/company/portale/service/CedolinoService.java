
package it.valueson.portale.service;

import it.valueson.portale.dto.CedolinoDTO;
import it.valueson.portale.entity.TblUtenti;

import java.time.LocalDate;
import java.util.List;


public interface CedolinoService {
    List<CedolinoDTO> getCedoliniByUserId(Long userId);

    CedolinoDTO getCedolinoById(Long id);

    CedolinoDTO createCedolino(CedolinoDTO cedolinoDTO);

    CedolinoDTO updateCedolino(Long id, CedolinoDTO cedolinoDTO);
    void deleteCedolino(Long id);

    void deleteAllForUser(Long userId);

    List<CedolinoDTO> getAllCedolini();

    CedolinoDTO createCedolinoDirectly(TblUtenti utente, LocalDate date, String pdfBase64);

    void save(CedolinoDTO dto);

    CedolinoDTO findById(Long id);
}
