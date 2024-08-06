package it.valueson.portale.controller;


import it.valueson.portale.dto.CedolinoDTO;
import it.valueson.portale.dto.PresenzaDTO;
import it.valueson.portale.entity.Presenza;
import it.valueson.portale.entity.Progetto;
import it.valueson.portale.service.PresenzaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/presenze")
public class PresenzaController {
    @Autowired
    private PresenzaService presenzaService;

    @GetMapping("/elenco/{id}")
    public ResponseEntity<List<Presenza>> getPresenzaById(@PathVariable Long id) {
        List<Presenza> presenzaList = presenzaService.getPresenzaByUserId(id);
        System.out.println(presenzaList);
        return ResponseEntity.ok(presenzaList);
    }


    @PostMapping("/crea")
    public ResponseEntity<Presenza> creaPresenza(@RequestBody PresenzaDTO presenza){
        Presenza p = presenzaService.creaPresenza(presenza);
        return ResponseEntity.ok(p);
    }

    @GetMapping("/cerca")
    public ResponseEntity<PresenzaDTO> cercaPresenza(@RequestParam long idUtente, @RequestParam LocalDate date){
        return ResponseEntity.ok(presenzaService.findByidUtenteAndData(idUtente, date));
    }
}

