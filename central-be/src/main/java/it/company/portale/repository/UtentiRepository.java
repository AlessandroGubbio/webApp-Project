package it.valueson.portale.repository;

import it.valueson.portale.dto.UserDTO;
import it.valueson.portale.entity.TblUtenti;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UtentiRepository extends JpaRepository<TblUtenti, Long> {

    TblUtenti findByMailAndPassword(String mail, String password);

    TblUtenti findByIdUser(Long idUtente);
    @Modifying
    @Transactional
    @Query("UPDATE TblUtenti u SET u.nome = :nome , u.cognome = :cognome , u.mail = :email WHERE u.idUser= :idUser")
    void updateUtente(@Param("idUser") Long isUser, @Param("nome") String nome, @Param("cognome") String cognome,
                      @Param("email") String email);

    void deleteById(Long idUtente);

    List<TblUtenti> findAllByOrderByIdUser();

    TblUtenti findByMail(String mail);
}
