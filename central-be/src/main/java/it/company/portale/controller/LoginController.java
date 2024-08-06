package it.valueson.portale.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import it.valueson.portale.dto.UserDTO;
import it.valueson.portale.entity.News;
import it.valueson.portale.entity.TblUtenti;
import it.valueson.portale.repository.UtentiRepository;
import it.valueson.portale.service.CedolinoService;
import it.valueson.portale.service.ILoginService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Login", description = "Login API")
@RestController
@Slf4j
public class LoginController {

    @Autowired
    private ILoginService loginService;

    @Autowired
    private CedolinoService cedolinoService;

    @Autowired
    private UtentiRepository utentiRepository;

    @PostMapping(value = "/doLogin",
            consumes = {MediaType.APPLICATION_JSON_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<UserDTO> executeLogin(@RequestBody UserDTO user) {

        log.info("Requested login for user : " + user);

        try {
            return ResponseEntity.ok(loginService.executeLogin(user));
        } catch (Exception e) {
            log.error("Error during login", e);
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping(value = "/doRegister",
            consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> executeRegister(@RequestBody UserDTO user) {

        log.info("Registration request for user: {}", user);
        try {
            loginService.insertUser(user);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            log.error("Error during registration", e);
            return ResponseEntity.badRequest().body("Registration failed");
        }
    }


    @GetMapping("/impiegati")
    public ResponseEntity<List<TblUtenti>> getAllUsers() {
        List<TblUtenti> users = loginService.getAllUser();
        return ResponseEntity.ok(users);
    }
    @DeleteMapping(value = "/delete/{idUtente}")
    public ResponseEntity<UserDTO> deleteUser(@PathVariable Long idUtente) {
        log.info("Elimination request for the user : {}", idUtente);
        try {
            UserDTO user = loginService.findByIdUtente(idUtente);
            loginService.deleteById(idUtente);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            log.error("Error when deleting the user", e);
            return ResponseEntity.badRequest().build();
        }
    }
    @PutMapping(value = "/updateUtente",
            consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<UserDTO> updateUtente(@RequestBody UserDTO userDTO) {
        try {
            UserDTO user = loginService.updateUtente(userDTO);
            System.err.println(user);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            log.error("Utente non trovato", e);
            return ResponseEntity.badRequest().build();
        }
    }
}
