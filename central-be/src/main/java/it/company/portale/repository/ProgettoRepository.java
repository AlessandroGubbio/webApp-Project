package it.valueson.portale.repository;

import it.valueson.portale.entity.Progetto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProgettoRepository extends JpaRepository<Progetto,Long> {
    
}
