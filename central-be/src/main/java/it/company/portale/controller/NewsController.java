package it.valueson.portale.controller;

import it.valueson.portale.dto.NewsDTO;
import it.valueson.portale.repository.NewsRepository;
import it.valueson.portale.service.INewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@RestController
public class NewsController {

    @Autowired
    private INewsService newsService;

    @Autowired
    private NewsRepository newsRepository;

    // Endpoint per ottenere tutte le notizie
    @GetMapping("/homenews")
    public ResponseEntity<List<NewsDTO>> home() {
        List<NewsDTO> newsList = newsService.findAll();
        return ResponseEntity.ok(newsList);
    }


    @GetMapping("/search/{id}")
    public ResponseEntity<NewsDTO> searchById(@PathVariable long id){
        return ResponseEntity.ok(newsService.findById(id).get());
    }

    // Endpoint per eliminare una notizia per ID
    @DeleteMapping("/news/delete/{id}")
    public ResponseEntity<NewsDTO> deleteNews(@PathVariable("id") Long id) {
        // Trova la notizia esistente per ID
        NewsDTO newsDto = newsService.findById(id)
                .orElseThrow(() -> new RuntimeException("News not found with id " + id));

        // Elimina la notizia
        newsService.deleteById(id);
        return ResponseEntity.ok(newsDto);
    }

    @PostMapping(value = "/news/upload", consumes = MediaType.APPLICATION_JSON_VALUE,
    produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<NewsDTO> upload(@RequestBody NewsDTO newsDTO){
        newsDTO.setDate(LocalDate.now());
        newsService.save(newsDTO);
        return ResponseEntity.ok(newsDTO);
    }


    @PutMapping(value = "/news/update/{id}", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<NewsDTO> updateById(@RequestBody NewsDTO request){
        NewsDTO dto = newsService.findById(request.getIdNews()).get();
        System.out.println(request);
        System.out.println(dto);
        dto.setTitle(request.getTitle());
        dto.setDescription(request.getDescription());
        dto.setImage(request.getImage());
        newsService.save(dto);
        return ResponseEntity.ok(dto);
    }


}