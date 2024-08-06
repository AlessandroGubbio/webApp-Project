package it.valueson.portale.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import it.valueson.portale.dto.CedolinoDTO;
import it.valueson.portale.dto.DocDTO;
import it.valueson.portale.dto.NewsDTO;
import it.valueson.portale.entity.TblUtenti;
import it.valueson.portale.service.CedolinoService;
import it.valueson.portale.service.ILoginService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;

import static org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE;

@RestController
@RequestMapping("/cedolini")
public class CedolinoController {

    private final CedolinoService cedolinoService;
    private final ILoginService loginService;


    @Autowired
    public CedolinoController(CedolinoService cedolinoService, ILoginService loginService) {
        this.cedolinoService = cedolinoService;
        this.loginService = loginService;
    }


    // Endpoint per ottenere i cedolini di un utente specifico tramite ID
    @GetMapping("/elenco/{id}")
    public ResponseEntity<List<CedolinoDTO>> getCedoliniById(@PathVariable Long id) {
        List<CedolinoDTO> cedolinoDTO = cedolinoService.getCedoliniByUserId(id);
        return ResponseEntity.ok(cedolinoDTO);
    }


    @PostMapping(value = "/upload", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<CedolinoDTO> upload(@RequestBody DocDTO cedolinoDTO){
        CedolinoDTO dto = CedolinoDTO.builder()
                .pdfBase64(cedolinoDTO.getPdfBase64())
                .userId(loginService.findById(cedolinoDTO.getUserId()))
                // considerato il fuso orario
                .date(cedolinoDTO.getDate().plusDays(1))
                .build();
        cedolinoService.save(dto);

        return ResponseEntity.ok(new CedolinoDTO());
    }



    @PutMapping(value = "/update", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<CedolinoDTO> updateById(@RequestBody CedolinoDTO request){
        CedolinoDTO dto = cedolinoService.findById(request.getId());
        dto.setDate(request.getDate());
        dto.setPdfBase64(request.getPdfBase64());
        cedolinoService.save(dto);
        return ResponseEntity.ok(dto);
    }

    // Endpoint per eliminare un cedolino
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<CedolinoDTO> deleteCedolino(@PathVariable Long id) {
        CedolinoDTO doc = cedolinoService.findById(id);
        cedolinoService.deleteCedolino(id);
        return ResponseEntity.ok(doc);
    }
}







