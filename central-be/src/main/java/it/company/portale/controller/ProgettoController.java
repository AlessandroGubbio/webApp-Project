package it.valueson.portale.controller;


import it.valueson.portale.dto.ProgettoDTO;
import it.valueson.portale.entity.Progetto;
import it.valueson.portale.service.ProgettoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/progetti")
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class ProgettoController {

    @Autowired
    private ProgettoService progettoService;

    @GetMapping("/all")
    public ResponseEntity<List<Progetto>> getAll() {
        List<Progetto> progetti = progettoService.getAllProgetti();
        return ResponseEntity.ok(progetti);
    }

    @PostMapping("/crea")
    public ResponseEntity<ProgettoDTO> creaProgetto(@RequestBody ProgettoDTO progettoDTO) {
        ProgettoDTO nuovoProgetto = progettoService.creaProgetto(progettoDTO);
        return ResponseEntity.ok(nuovoProgetto);
    }

    @PutMapping("/modifica/{id}")
    public ResponseEntity<ProgettoDTO> modificaProgetto(@PathVariable Long id, @RequestBody ProgettoDTO progettoDTO) {
        ProgettoDTO progettoAggiornato = progettoService.modificaProgetto(id, progettoDTO);
        return ResponseEntity.ok(progettoAggiornato);
    }
}