package it.valueson.portale.repository;

import it.valueson.portale.entity.Cedolino;
import it.valueson.portale.entity.TblUtenti;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CedolinoRepository extends JpaRepository<Cedolino, Long> {
    List<Cedolino> findByUser_IdUser(Long userId);

    //void deleteByUserId(Long userId);

    void deleteAllByUser(TblUtenti user);

    List<Cedolino> findAllByOrderByDate();

    List<Cedolino> findByUser_IdUserOrderByDate(Long userId);
}
