package it.valueson.portale.service;

import it.valueson.portale.dto.CedolinoDTO;
import it.valueson.portale.dto.UserDTO;
import it.valueson.portale.entity.TblUtenti;

import java.util.List;

public interface ILoginService {

    UserDTO executeLogin(UserDTO user) throws Exception;


    void insertUser(UserDTO userDTO);

    TblUtenti findById(Long id);
    List<TblUtenti> getAllUser();
    void deleteUser(Long idUtente);

    UserDTO findByIdUtente(Long idUtente);

    void deleteById(Long idUtente);

    UserDTO updateUtente(UserDTO userDTO);
}
