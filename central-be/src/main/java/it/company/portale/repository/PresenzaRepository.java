package it.valueson.portale.repository;

import it.valueson.portale.dto.PresenzaDTO;
import it.valueson.portale.entity.Presenza;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface PresenzaRepository extends JpaRepository<Presenza, Long> {
    List<Presenza> findByIdUtenteOrderByData(Long idUtente);

    Presenza findByIdUtenteAndData(long idUtente, LocalDate date);
}
