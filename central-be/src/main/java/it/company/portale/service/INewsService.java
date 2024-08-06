package it.valueson.portale.service;

import it.valueson.portale.dto.NewsDTO;

import java.util.List;
import java.util.Optional;

public interface INewsService {
    List<NewsDTO> findAll();
    Optional<NewsDTO> findById(Long id);
    NewsDTO save(NewsDTO newsDto);
    void deleteById(Long id);

    NewsDTO update(Long id, NewsDTO newsDTO);

    List<NewsDTO> findByTitle(String title);
}