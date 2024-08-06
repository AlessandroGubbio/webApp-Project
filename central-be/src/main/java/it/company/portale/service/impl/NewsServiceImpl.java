package it.valueson.portale.service.impl;

import it.valueson.portale.dto.NewsDTO;
import it.valueson.portale.entity.News;
import it.valueson.portale.repository.NewsRepository;
import it.valueson.portale.service.INewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class NewsServiceImpl implements INewsService {

    @Autowired
    private NewsRepository newsRepository;

    @Override
    public List<NewsDTO> findAll() {
        // Trova tutte le news e converte in DTO

        return newsRepository.findAllByOrderByDateDesc().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<NewsDTO> findById(Long id) {
        // Trova la news per ID e converte in DTO
        return newsRepository.findById(id)
                .map(this::convertToDTO);
    }

    @Override
    public NewsDTO update(Long id, NewsDTO newsDTO) {
        // Trova la news per ID e lancia un'eccezione se non trovata
        News news = newsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("News not found with id " + id));

        // Aggiorna i campi della news
        news.setTitle(newsDTO.getTitle());
        news.setDescription(newsDTO.getDescription());
        news.setImage(newsDTO.getImage());
        news.setDate(newsDTO.getDate());

        // Salva la news aggiornata e converte in DTO
        News updatedNews = newsRepository.save(news);
        return convertToDTO(updatedNews);
    }

    @Override
    public NewsDTO save(NewsDTO newsDTO) {
        // Converte il DTO in entity, salva e converte di nuovo in DTO
        News news = convertToEntity(newsDTO);
        News savedNews = newsRepository.save(news);
        return convertToDTO(savedNews);
    }

    @Override
    public List<NewsDTO> findByTitle(String title) {
        // Trova le news per titolo e converte in DTO
        return newsRepository.findByTitle(title).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteById(Long id) {
        // Trova e cancella la news per ID
        newsRepository.findById(id)
                .ifPresent(newsRepository::delete);
    }

    // Converte un entity News in DTO
    private NewsDTO convertToDTO(News news) {
        return NewsDTO.builder()
                .idNews(news.getIdNews())
                .title(news.getTitle())
                .description(news.getDescription())
                .image(news.getImage())
                .date(news.getDate())
                .build();
    }

    // Converte un DTO News in entity
    private News convertToEntity(NewsDTO newsDTO) {
        News news = new News();
        news.setIdNews(newsDTO.getIdNews());
        news.setTitle(newsDTO.getTitle());
        news.setDescription(newsDTO.getDescription());
        news.setImage(newsDTO.getImage());  // Assicurati di memorizzare l'immagine Base64
        news.setDate(newsDTO.getDate());
        return news;
    }
}
